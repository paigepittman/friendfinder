//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 2400;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static('public'));

var friendsArray = [
	{
		name: "Jim",
		pic: "http://az616578.vo.msecnd.net/files/2016/11/29/6361597972289366971220904497_tumblr_mkxjvjXft71s5drvyo3_1280.png",
		answers: [3,5,4,3,1,5,3,5,2,2]
	},{
		name: "Pam",
		pic: "https://i.ytimg.com/vi/fWE0lfdM2Ps/maxresdefault.jpg",
		answers: [1,1,3,3,1,5,5,5,2,1]
	},{
		name: "Michael",
		pic: "http://az616578.vo.msecnd.net/files/2015/08/24/6357600113572837231773916132_michael-scott-s-top-tantrums.png",
		answers: [1,2,4,3,4,7,3,5,1,5]
	},{
		name: "Dwight",
		pic: "https://pbs.twimg.com/profile_images/539102307867451392/Xn_fE20q.jpeg",
		answers: [2,3,1,1,1,1,2,2,2,2]
},{
		name: "Kelly",
		pic: "http://az616578.vo.msecnd.net/files/2017/01/08/6361949613990971781433622517_tinder%20kelly.jpg",
		answers: [5,5,5,2,2,5,4,4,4,1]
},{
		name: "Ryan",
		pic: "https://theofficescranton.files.wordpress.com/2012/09/kelly-ryan1.png",
		answers: [4,4,1,5,2,1,1,3,2,2]
}
];
app.get("/api/:friends?", function(req, res) {
  var friends = req.params.friends;
  if (friends) {
    console.log(friends);
    for (var i = 0; i < friendsArray.length; i++) {
        return res.json(friendsArray[i]);
      }
    return res.json(false);
  };
  return res.json(friendsArray);
});
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/home.html"));
});
app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});
app.get("/results", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/results.html"));
});

app.post("/api/new", function(req, res) {
  var newfriend = req.body;
	var newAnswers = req.body.answers;
  console.log(newfriend);
	var differences = 0;
	console.log(newfriend.answers[3]);
	var compatibility = [];
    var match = "";

   for (var i = 0; i < friendsArray.length; i++) {
        var compatibilityScore = 0;
        for (var z = 0; z < friendsArray[i].answers.length; z++) {
            compatibilityScore += Math.abs(parseInt(friendsArray[i].answers[z]) - parseInt(newfriend.answers[z]));
        }
        compatibility.push(compatibilityScore);
    }

   match = compatibility.indexOf(Math.min.apply(Math, compatibility));
    res.json(friendsArray[match]);

		console.log(match);

	});

	app.listen(PORT, function() {
	  console.log("App listening on PORT " + PORT);
	});





	// for (var i = 0; i < friendsArray.length; i++) {
	// 	for (var x = 0; x < friendsArray[i].answers.length; x++) {
	// 		dif = friendsArray[i].answers[x] - newAnswers[x];
	// 		console.log(friendsArray[i].name + dif);

			// user1 = parseInt(newAnswers[x]);
			// user2 = parseInt(friendsArray[i].answers[x]);
			// dif = user1-user2;
			// compat.push(dif);
			// 	// console.log(dif);
			// 	// console.log("user1: " + user1);
			// 	console.log(newfriend);
			// 	console.log(user1);




	//
	// 		var match = [];
	//
	// 	  currentq = friendsArray[i].answers[x];
	//
	// 		dif = difference(currentq, newAnswers[x]);
	//
	// 		differences = differences + dif;
	//
	// 		console.log("differences: " + differences);
	// 	}
	// }
	// console.log("differences: " + differences);
  // res.json(newfriend);
