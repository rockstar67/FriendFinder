var friendList = require("../data/friends.js");

module.exports = function(app) {
    
    app.get("/api/friends", function(req, res) {
        res.json(friendList);
    });

    app.post("/api/friends", function(req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        // Here we take the result of the user's survey POST and parse it.
        var userData = req.body;
        var userScores = userData.scores;
        
        console.log(userScores);

        //This variable will calculate the difference between the user's scores and the scores of
        //each user in the database
        var totalDifference = 0;

        //Here we loop through all the friend possibilities in the database.
        for (var i = 0; i < friendList.length; i++) {
        
            console.log(friendList[i].name);
            totalDifference = 0;
        
        //We then loop through all the scores of each friend    
        for (var j = 0; j < friendList[i].scores[j]; j++) {

            //We calculate the difference between the scores and sum them into the totalDifference
            totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendList[i].scores[j]));
        
            //If the sum of differences is less than the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {
        
            //Reset the bestMatch to be the new friend
                    bestMatch.name = friendList[i].name;
                    bestMatch.photo = friendList[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        
        }
        
        //Finally save the user's data to the database and always return that database to the user
        //as the user's best friend.
        friendList.push(userData);
        
        //Return a JSON with the user's bestMatch. This will be used by th HTML in the next page
        res.json(bestMatch);
        
        });
        
        }
            