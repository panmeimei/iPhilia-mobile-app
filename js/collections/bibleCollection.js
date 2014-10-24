/**
 * js/collections/bibleStudy.js
 */

var app = app||{};

app.BibleEvents = Backbone.Collection.extend({
	model:app.BibleEvent,
	url:"https://api.parse.com/1/classes/BibleStudySchedule",
	parse:function(response){
		return response.results;
	}
});
app.Attendees = Backbone.Collection.extend({
	model: app.Attendee,
	url: "https://api.parse.com/1/classes/AttendeeList",
	parse:function(response){
		return response.results;
	},
	comparator:function(a,b){
		return a.get('date') < b.get('date');
	},
	/*Query 'Attendees' to check if user has replied to the next bible study.*/
	findUser: function(view, options){
		var hasFound=false;
		this.fetch({ 
			reset:true,
			data: {
			  "where":{'userId':options.userId, 'eventId': options.eventId}				
			}, 	
			success:function(collection){	
			  if(collection.length)
				hasFound=true;
			  view.render(hasFound);
			},
			error: function(model, xhr, options){
				var errors = JSON.parse(xhr.responseText).errors;
				alert(errors);
			}
		});
	}
});
app.Prayers = Backbone.Collection.extend({
	model: app.Prayer,
	url:"https://api.parse.com/1/classes/Prayers",
	parse:function(response){
		return response.results;
	}
});
