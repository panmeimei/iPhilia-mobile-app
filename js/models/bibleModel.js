/**
 *js/models/bibleStudy.js 
 *bible study event model
 */
var app = app||{};
app.BibleEvent = Backbone.Model.extend({
	idAttribute:"objectId",
	urlRoot:"https://api.parse.com/1/classes/BibleStudySchedule",
	parse:function(response){
		return response.results[0];
	},
	cancel:function(){
		var event = app.userEvents.where({eventId: this.id});
		event[0].set('rsvp','no');
		event[0].save();
	}
});

app.Attendee = Backbone.Model.extend({
	idAttribute:"objectId"
});
app.Prayer = Backbone.Model.extend({
	idAttribute:"objectId",
	urlRoot:"https://api.parse.com/1/classes/Prayers",
	initialize:function(){
	  this.on('invalid', function(model, error){
	    $('.error-msg').text(error).fadeIn('fast');
	    $('.error-msg').delay(2000).fadeOut();
	  });
	},
	createPrayer:function(){
		this.form = new app.PrayerForm({model:this}).render();	
		$('.prayer-form-wrapper').html(this.form.el);
		$('.prayer-form-wrapper').hide().fadeIn('slow');
		 $('a.show-pray-form').hide();
	},
	savePrayer:function(from,subject,content){
		var form = this.form;
		this.save({from:from, subject:subject, content:content}, {
		    	success:function(model, response, options){
		    		console.log('prayer saved');
		    		form.removeView();
		    		$('.success-msg').fadeIn('slow');	
		    		$('.success-msg').delay(600).fadeOut('slow', function(){
		    			$('a.show-pray-form').fadeIn();	
		    		});
		    	},
		    	error:function(model,xhr, options){
		    		var errors = JSON.parse(xhr.responseText).errors;
		    		alert('Oops, something went wrong with saving the prayer: ' + errors);
		    	}
		 });
	},
	validate:function(attrs, options){
	  if(attrs.content === ''||attrs.subject===''){
		  return 'Subject and content are required.';
	  }
	}
});

