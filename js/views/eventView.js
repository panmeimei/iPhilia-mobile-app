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
		//this.collection = new app.AttendeeCollection();
		app.Attendees.fetch({
			reset:true,
			data: {
				/*constrain should be done on server, it's inefficient to load whole table of data*/
					"where":{
						'eventTime':{"$gte":{"__type":"Date", "iso": new Date().toISOString()}},
						'userId':user.getUserId(),
						'rsvp':'yes'
					},
					
					"order":"date",//in decending order
			       }, 	
			success:this.render,
			error:function(err){console.log('error/backone  '+err);}
		});
		//render an event when new event is replied
		this.listenTo(app.Attendees, 'add', this.addEvent);
		
	},	
	displayEventDetail: function(event){		
		var eventId=$(event.currentTarget).data('id'); //currentTarget is the event button. 
		//alert(eventBox.data('id'));
		var eventDetailView = new app.EventDetailView({id:eventId});
	},
	addEvent:function(model){
		if(model.get('rsvp')==='yes'){
			this.renderEach(model);
		}
	},
	render: function(){
		this.$el.html('');
		_.each(app.Attendees.models, function(model){
			this.renderEach(model);
		},this);
	/*	_.each(this.collection.models[0].attributes.results,function(model){
			this.renderEach(model);
		},this);*/
	
	},
	renderEach:function(item){
		var eventView = new app.EventView({model:item});
		this.$el.append(eventView.render().el);
	}
});
app.EventView = Backbone.View.extend({
	tagName:'div',
	template: _.template($('#eventTemplate').html()),	
	render: function(){
		this.$el.html(this.template({
			//eventId will be stored in button's data attribute for retrieving corresponding data
			eventId : this.model.get('eventId'),
			eventTitle: this.model.get('eventTitle'),
			eventTime: parseDate(this.model.get('eventTime').iso)[0]
		}));
		return this;
	}
});
app.EventDetailView = Backbone.View.extend({
	el: $('#event-detail-page .ui-content'),
	template: _.template($('#eventDetailTemplate').html()),
	initialize: function(data){
		_.bindAll(this, 'render');
		this.collection = new app.BibleCollection();
		this.collection.fetch({
			reset:true,
			data: {"where":{'objectId': this.id}}, 			
			success:this.render,
			error:function(err){console.log('error from event detail  '+err);}
		})
	},
	render: function(){
		var model = this.collection.models[0];
	//	console.log('event we retrived:  '+this.collection.length+ this.collection.models[0].get('host'));
		var city = model.get('city');
		var state = model.get('state');
		var street=model.get('street');
		var zipcode = model.get('zipCode');
		this.$el.html(this.template({
			eventTitle : model.get('eventTitle'),
			eventTime : parseDate(model.get('date').iso)[0],
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
	}
});