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
	urlRoot:"https://api.parse.com/1/classes/Prayers",
	savePrayer:function(from,subject,content){
		this.save({from:from, subject:subject, content:content}, {
		    	success:function(model, response, options){
		    		console.log('prayer saved');
		    		//$('.prayer-form-wrapper').fadeOut('fast');
		    		$('a.show-pray-form').show();
		    	},
		    	error:function(model,xhr, options){
		    		var errors = JSON.parse(xhr.responseText).errors;
		    		alert('Oops, something went wrong with saving the prayer: ' + errors);
		    	}
		 });
	}
});

