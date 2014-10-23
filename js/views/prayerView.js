var app = app||{};

app.PrayerForm = Backbone.View.extend({
  el:'.prayer-form-wrapper',
  template:_.template($("#prayFormTemplate").html()),
  events:{'click a': 'save',
	   'click .togglePrayer':'toggleForm'
  },
  initialize:function(){
	  this.render();
  },
  render:function(){
	  this.$el.html(this.template(this.model.attributes));
	  return this;
  },
  toggleForm: function(){
	$('.prayer-form').slideToggle('slow');  
  },
  save:function(e){
    e.preventDefault();
    var subject = this.$('input[name="subject"]').val();
    var content = this.$('textarea[name="content"]').val();
    var from = this.$('input[name="from"]:checked').val();
    this.model.save({from:from, subject:subject, content:content}, {
    	success:function(model, response, options){
    		console.log('prayer saved');
    		$('.prayer-form').slideUp();
    	},
    	error:function(model,xhr, options){
    		var errors = JSON.parse(xhr.responseText).errors;
    		alert('Oops, something went wrong with saving the prayer: ' + errors);
    	}
    });
  }
  	
});