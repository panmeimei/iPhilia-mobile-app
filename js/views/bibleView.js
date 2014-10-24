/**
 *js/views/bibleView.js 
 *
 *display bible study information
 */
var app = app||{};
var renderRsvpView = null;

/*Render all contents in the bible study section.
 * 3 parts in the section: time, location and RSVP.
 * workflow: 
 * [fetchResponse]check if user has responded to the event
 * [render] set 'renderRsvp' variable and calls renderEach
 * [renderEach] In this case, there will be only one model in the fetched collection
 * so it will be called once to initiate 3 views: DateView, LocaionView and RsvpView  */
app.BibleSectionView = Backbone.View.extend({
	el:'#bible-slider',
	initialize: function(){			
		_.bindAll(this, 'render');		
		this.bibleEvent = new app.BibleEvent({parse:true});		
		var self = this;
		this.bibleEvent.fetch({
			reset:true,
			data: {
					"where":{'date':{"$gte":{"__type":"Date", "iso": new Date().toISOString()}}},
					"limit":"1",
					"order":"date",//in decending order
			       }, 		
			success:function(model, response, options){
				var attendees = new app.Attendees({parse:true});
				var hasFound = attendees.findUser(self, {userId: user.getUserId(), eventId: model.id});
			},
			error:function(err){console.log('error/backone  '+err);},
		});	
		$('#bible-slider').html('');	
		
	},
	render: function(hasFound){
		var dateView = new app.DateView({model:this.bibleEvent});
		var locationView = new app.LocationView({model:this.bibleEvent});
		var rsvpView = new app.RsvpView({model:this.bibleEvent, hasFound: hasFound});
		this.$el.append(dateView.render().el);		
		this.$el.append(locationView.render().el);		
		this.$el.append(rsvpView.render().el);
		
/*Build the slider after appending all the contents: 
 * Slider(prev_btn, next_btn, ul_element)
 * It can be reused for any other <ul><li>*/
		this.slider = new app.Slider($('a#bible-prev'), $('a#bible-next'), $(this.el));
	}	
});
/*Render bible study time*/
app.DateView = Backbone.View.extend({	
	tagName:"li",
	template: _.template($('#bibleStudyTemplate').html()),	
	render: function(){
		//need to parse date and street before rendering
		var date = parseDate(this.model.get('date').iso);		
		this.$el.html(this.template({				
			date: date[0]
			//host: this.model.get('host'),					
		}));
		return this;
	}
});
/*Render bible study location information*/
app.LocationView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#bibleStudyTemplate2').html()),
	render: function(){
		var city = this.model.get('city');
		var state = this.model.get('state');
		var street=this.model.get('street');
		var zipcode = this.model.get('zipCode');
		var googleAddress = parseAddress(street, city, state, zipcode);
		this.$el.html(this.template({
			street:street,
			city: city,
			state: state,
			zipCode: zipcode,
			googleAddr:googleAddress
		}));
		return this;
	}
});

app.RsvpView = Backbone.View.extend({
	tagName: 'li',
	id:'rsvp-view',
	template: _.template($('#bibleStudyTemplate3').html()),
	events:{
		'click .rsvp-btn':'addAttendee'
	},
	initialize:function(options){
	 /*Render rsvp view according to 'this.hasFound'*/
	  this.hasFound = options.hasFound;
	},
	/*add the user to AttendeeList*/
	addAttendee: function(event){
		//trigger EventsView's 'add' event
		app.userEvents.create({
			eventId:this.model.id,
			eventTitle: 'Bible Study',
			eventTime: this.model.get('date'),
			userId: user.getUserId(),
			firstName:user.firstName,
			lastName:user.lastName,
			//rsvp determines whether we add this event to the event list or not
			rsvp:$(event.target).data('rsvp') 
		});
		$('#rsvp-view').hide().html("<h1 class='bible-slider-3'>Thank you! We hope to see you soon.</h1>").fadeIn('slow');
	},
	render:function(){		
		if(this.hasFound){			
			this.$el.html("<h1 class='bible-slider-3'>Thank you! We hope to see you soon.</h1>");
		}else{
			var replyBy = parseDate(this.model.get('replyBy').iso);	
			this.$el.html(this.template({
				replyBy: replyBy[0],
				phone: this.model.get('phone')
			}));
		}		
		return this;
	}
});

/*Tool functions for parse address and time
 * parseAddress(), parseDate(), and parseTime()
 * */
//parse it for google map
function parseAddress(street, city, state, zip){	
	var addr = street.split(' ').join('+');
	return addr+',+'+city+'+'+state+'+'+zip;
}
//original format retrieved from DB: 2014-08-23T18:00:00.000Z
function parseDate(str){
	var date, time;
	//date_str = [day, time]
	var date_str = str.split('T');
	//date_arr=[year,month,date]
	var date_arr = date_str[0].split('-');
	
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	date = month[date_arr[1]-1]+' '+date_arr[2];	
	time=date_str[1].substring(0,5);
	return [date,parseTime(time)];
}
function parseTime(str){
	var time = str.split(':');
	var hr = parseInt(time[0]);
	if (hr>12){
		hr-=12;
		return hr+':'+time[1]+'PM';
	}
	return str+'AM';
}
