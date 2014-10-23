/**
 * js/collections/bibleStudy.js
 */

var app = app||{};

app.BibleCollection = Backbone.Collection.extend({
	model:app.BibleStudySchedule,
	url:"https://api.parse.com/1/classes/BibleStudySchedule",
	parse:function(response){
		return response.results;
	}
});
app.AttendeeCollection = Backbone.Collection.extend({
	model: app.Attendee,
	url: "https://api.parse.com/1/classes/AttendeeList",
	parse:function(response){
		return response.results;
	},
	comparator:function(a,b){
		return a.get('date') < b.get('date');
	}
});
app.UserCollection = Backbone.Collection.extend({
	model: app.User,
	url:"https://api.parse.com/1/users",
	parse:function(response){
		return response.results;
	}
});
app.Prayers = Backbone.Collection.extend({
	model: app.Prayer,
	url:"https://api.parse.com/1/classes/Prayers",
	parse:function(response){
		return response.results;
	}
});
