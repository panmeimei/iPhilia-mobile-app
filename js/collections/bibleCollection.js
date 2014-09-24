/**
 * js/collections/bibleStudy.js
 */

var app = app||{};

app.BibleCollection = Backbone.Collection.extend({
	model:app.BibleStudySchedule,
	url:"https://api.parse.com/1/classes/BibleStudySchedule",
	//parse is called by Backbone whenever a collection's models are 
	//returned by the server, in fetch. The function is passed the
	//raw response object, and should return the array of model attributes
	parse:function(response){
		return response.results;
	}
});
AttendeeCollection = Backbone.Collection.extend({
	model: app.Attendee,
	url: "https://api.parse.com/1/classes/AttendeeList",
	parse:function(response){
		return response.results;
	}
});
app.UserCollection = Backbone.Collection.extend({
	model: app.User,
	url:"https://api.parse.com/1/users"
});

app.Attendees = new AttendeeCollection();