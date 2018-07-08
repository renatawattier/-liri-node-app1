require("dotenv").config();
var keys = require("./keys")
// console.log(keys)
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// console.log(spotify)
// console.log(client)

// * `my-tweets`


// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`



var programToRun = process.argv[2]
// console.log(programToRun)
if (programToRun == "my-tweets"){
     myTweets()
}

else if (programToRun == "spotify-this-song") {
    spotifyThisSong ()
}

else if (programToRun == "movie-this"){
    movieThis ()

}

else if (programToRun == "do-what-it-says" ){
    doWhatItSays()

}

else {
    console.log("please specify a program")
}

function myTweets (){
    console.log("runningtwitterprogram")
}

function spotifyThisSong () {

    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items[0].artists[0].name); 
      });
        

}

function movieThis () {
    console.log("running movie program")
}

function doWhatItSays () {
    console.log("running program do it what is says")

}


