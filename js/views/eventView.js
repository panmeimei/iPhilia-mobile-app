/**
 * js/views/eventView.js
 */
var app = app||{};

app.EventsView = Backbone.View.extend({
	el: '#event-list',	
	initialize:function(){
		_.bindAll(this, 'render', 'renderEach');			
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
			eventTitle: this.model.get('eventTitle'),
			eventTime: parseDate(this.model.get('eventTime').iso)[0]
		}));
		return this;
	}

});