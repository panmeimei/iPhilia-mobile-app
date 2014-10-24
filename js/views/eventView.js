/**
 * js/views/eventView.js
 */
var app = app||{};

app.EventsView = Backbone.View.extend({
	el: '#event-list',	
	events:{
		'click .event-btn': 'displayEventDetail'
	},
	initialize:function(){
		_.bindAll(this, 'render', 'renderEach' );			
		app.userEvents = new app.Attendees({parse:true});
		app.userEvents.fetch({
			reset:true,
			data: {
					"where":{
						'eventTime':{"$gte":{"__type":"Date", "iso": new Date().toISOString()}},
						'userId':user.getUserId(),
						'rsvp':'yes'
					}
			       }, 	
			success:this.render,
			error:function(err){console.log('error/backone  '+err);}
		});
		//render an event when new event is replied
		//app.userEvents.on( 'add', this.addEvent, this);
		this.listenTo(app.userEvents, 'add', this.addEvent);
		
	},	
	displayEventDetail: function(event){		
		var eventId=$(event.currentTarget).data('id'); //currentTarget is the event button. 
		//alert(eventBox.data('id'));
		var eventDetailView = new app.EventDetailView({id:eventId});
	},
	removeEvent:function(model){
		app.userEvents.remove(model);
		this.render();
	},
	addEvent:function(model){
		if(model.get('rsvp')==='yes'){
			this.renderEach(model);
		}
	},
	render: function(){
		if(app.userEvents.length === 0)
		  this.$el.html('You didn\'t sign up for any events.');
		else{
		  this.$el.html('')
		  _.each(app.userEvents.models, function(model){
			this.renderEach(model);
		  },this);
		}
	},
	renderEach:function(item){		
		var eventView = new app.EventView({model:item});
		this.$el.append(eventView.render().el);
	}
});
app.EventView = Backbone.View.extend({
	tagName:'div',
	template: _.template($('#eventTemplate').html()),	
	initialize:function(){
		this.listenTo(this.model, 'change:rsvp', this.removeView);
	},
	render: function(){
		this.$el.html(this.template({
			//eventId will be stored in button's data attribute for retrieving corresponding data
			eventId : this.model.get('eventId'),
			eventTitle: this.model.get('eventTitle'),
			eventTime: parseDate(this.model.get('eventTime').iso)[0]
		}));
		return this;
	},
	removeView:function(model){
		model.stopListening();
		this.remove();
	}
});
app.EventDetailView = Backbone.View.extend({
	el: $('#event-detail-page .ui-content'),
	template: _.template($('#eventDetailTemplate').html()),
	events:{
		'click .cancel-btn':'cancel'
	},
	initialize: function(data){
		_.bindAll(this, 'render');
		this.model = new app.BibleEvent();
		this.model.fetch({
			reset:true,
			data: {"where":{'objectId': this.id}}, 			
			success:this.render,
			error:function(err){console.log('error from event detail  '+err);}
		})
	},
	render: function(model){
		var model = this.model;
		var city = model.get('city');
		var state = model.get('state');
		var street=model.get('street');
		var zipcode = model.get('zipCode');
		this.$el.html(this.template({
			eventTitle : model.get('eventTitle'),
			eventTime : parseDate(model.get('date').iso).join(' '),
			street:street,
			city: city,
			state: state,
			zipCode: zipcode,
			googleAddr: parseAddress(street, city, state, zipcode),
			eventHost : model.get('host')			
		}))
			setTimeout(function(){
			$('.event-pic').find('.event-title').animate({"left":"0px"},'slow');
		},1000);
	},
	cancel:function(){
		this.model.cancel();
	
		$.mobile.navigate("#main-page");
	}
});