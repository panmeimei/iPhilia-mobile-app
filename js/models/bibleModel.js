/**
 *js/models/bibleStudy.js 
 *bible study event model
 */
var app = app||{};
app.BibleStudySchedule = Backbone.Model.extend({
	idAttribute:"objectId"
});

app.Attendee = Backbone.Model.extend({
	idAttribute:"objectId",
});

app.User = Backbone.Model.extend({
	idAttribute:"objectId"
});