require("dotenv").config();
var keys = require("./keys")
var fs = require("fs");
var request = require("request");
// console.log(keys)
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// var omdbApi = require("omdb-client");

// * `my-tweets`


// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`



var programToRun = process.argv[2]
var nodeArg = process.argv[3]
// console.log(programToRun)
if (programToRun == "my-tweets"){
     myTweets()
}

else if (programToRun == "spotify-this-song") {
    spotifyThisSong (nodeArg)
}

else if (programToRun == "movie-this"){
    movieThis()

}

else if (programToRun == "do-what-it-says" ){
    doWhatItSays()

}

else {
    console.log("please specify a program")
}

function myTweets (){
    client.get("statuses/user_timeline", "jeffwattier", function(err, tweet, response) {
		if (err) {
			return console.log(err);
		} else {
			for (var i = 0; i < tweet.length; i++) {
				console.log(tweet[i].created_at);
				console.log(tweet[i].text);
                logCommands("\n" + tweet[i].created_at + "\n" + tweet[i].text)
				
			}
		}
	})
}



function spotifyThisSong (nodeArg) {
    if (nodeArg) {
        var query = nodeArg
    }
    else {
        var query = "All my life" 
    }

    spotify.search({ type: 'track', query: query, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    console.log(data.tracks.items[0].artists[0].name); 
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].external_urls.spotify);
    console.log(data.tracks.items[0].album.name);
    logCommands(data.tracks.items[0].artists[0].name); 
    logCommands(data.tracks.items[0].name);
    logCommands(data.tracks.items[0].external_urls.spotify);
    logCommands(data.tracks.items[0].album.name);
    logCommands("hello")
      });
        

}


function movieThis () {
    // console.log("running movie program")
            // Runs a request to the OMDB API with the movie specified.
    var queryUrl = "http://www.omdbapi.com/?t=" + nodeArg + "&y=&plot=short&apikey=trilogy"
    
        request(queryUrl, function(error, response, body) {
          // If the request is successful...
          if (!error && response.statusCode === 200) {
            
           console.log(JSON.parse(body).Title);
           console.log(JSON.parse(body).Year);
           console.log(JSON.parse(body).Ratings[0].Value);
           console.log(JSON.parse(body).Ratings[1].Value);
           console.log(JSON.parse(body).Country);
           console.log(JSON.parse(body).Language);
           console.log(JSON.parse(body).Actors);
           console.log(JSON.parse(body).Language);
           console.log(JSON.parse(body).Plot);

           logCommands(JSON.parse(body).Title + "\n");
           logCommands(JSON.parse(body).Year + "\n");
           logCommands(JSON.parse(body).Ratings[0].Value + "\n");
           logCommands(JSON.parse(body).Ratings[1].Value + "\n");
           logCommands(JSON.parse(body).Country + "\n");
           logCommands(JSON.parse(body).Language + "\n");
           logCommands(JSON.parse(body).Actors+ "\n");
           logCommands(JSON.parse(body).Language+ "\n");
           logCommands(JSON.parse(body).Plot+ "\n");
                  }    
    });
    }
    



function doWhatItSays () {
    // console.log("running program do it what is says")
    fs.readFile("randon.txt", "utf-8", function(err, data) {
        // console.log(data)
        var array = data.split(",")
        // console.log(array)
        console.log(array[0])
        if (array[0] == "spotify-this-song" ) {
            spotifyThisSong(array[1])
        }
         })

}


function logCommands(data) {
    fs.appendFile("log.txt", data, function(err) {
        if (err) {
            console.log(err);
        }
    })
}


