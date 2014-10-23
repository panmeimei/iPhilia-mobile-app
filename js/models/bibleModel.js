/**
 *js/models/bibleStudy.js 
 *bible study event model
 */
var app = app||{};
app.BibleStudySchedule = Backbone.Model.extend({
	idAttribute:"objectId",
	urlRoot:"https://api.parse.com/1/classes/BibleStudySchedule",
	parse:function(response){
		return response.results[0];
	}
});

app.Attendee = Backbone.Model.extend({
	idAttribute:"objectId"
});
app.Prayer = Backbone.Model.extend({
	idAttribute:"objectId",
	urlRoot:"https://api.parse.com/1/classes/Prayers"
});

