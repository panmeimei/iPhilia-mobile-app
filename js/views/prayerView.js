var app = app||{};

app.PrayerForm = Backbone.View.extend({
  template:_.template($("#prayFormTemplate").html()),
  events:{
	  'click a': 'save',
	   submit:'save',
	   'click .ui-radio':'toggleRadioBtn' 
  },
  initialize:function(){
	  this.render();
  },
  render:function(){
	  this.$el.html(this.template(this.model.attributes));
	  return this;
  },
  toggleRadioBtn:function(e){
	  $('.ui-radio > label').removeClass('ui-btn-active');
	  $(e.currentTarget).find('label').addClass('ui-btn-active');
  },
  save:function(e){  
	  e.preventDefault();
	  var subject = this.$('input[name="subject"]').val();
	  var content = this.$('textarea[name="content"]').val();
	  var from = this.$('input[name="from"]:checked').val();
	  this.model.savePrayer(from, subject, content);
  },
  removeView:function(){
	  this.model.stopListening();
	  this.remove();
  }
  	
});