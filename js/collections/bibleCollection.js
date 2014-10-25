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
	},
	addUserEvent:function(options){
		app.userEvents.create({
			eventId:options.eventId,
			eventTitle: 'Bible Study',
			eventTime: options.eventTime,
			userId: user.getUserId(),
			firstName:user.firstName,
			lastName:user.lastName,
			//rsvp determines whether we add this event to the event list or not
			rsvp:options.rsvp
		});  	
	},
	removeUserEvent:function(model){
		app.userEvents.remove(model);
	}
});
app.Prayers = Backbone.Collection.extend({
	model: app.Prayer,
	url:"https://api.parse.com/1/classes/Prayers",
	parse:function(response){
		return response.results;
	}
});
