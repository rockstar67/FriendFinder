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

var userData = req.body;
var userScores = userData.scores;

var totalDifference = 0;

for (var i = 0; i < friendList.length; i++) {

    console.log(friendList[i].name);
    totalDifference = 0;

    for (var j = 0; j < friendList[i].scores[i]; j++) {

        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendList[i].scores[i]));


        if (totalDifference <= bestMatch.friendDifference) {


            bestMatch.name = friendList[i].name;
            bestMatch.photo = friendList[i].photo;
            bestMatch.friendDifference = totalDifference;
        }
    }

}

friendList.push(userData);

res.json(bestMatch);

});

}
    