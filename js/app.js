/**
 * js/app.js
 */

app = app||{};
var sync = Backbone.sync;
/*Backbone.sync is call whenever model transaction occurs. Therefore, override
 * beforeSend here is better than override it in each Ajax functions*/
Backbone.sync = function(method,model,options){
	options.beforeSend = function(xhr){
		xhr.setRequestHeader("X-Parse-Application-Id","F6Scp43NZm8qJ8VSEDzEIysry1IgELJPz5u6xzxx");
		xhr.setRequestHeader("X-Parse-REST-API-Key","bpTWYs0PgiR5TC16zV1gBHOzAHOgaS9bD1N3QauY");
	};
	//alert(method+' '+ JSON.stringify(model));
	sync(method,model,options);
};
var app = {
		user:null,
		initialize:function(user){
			//clear page			
			this.user = user;			
			new app.BibleSectionView();			
			new app.EventsView();
			var prayer = new app.Prayer({from:user.firstName, subject:'', content:''});
			var prayform = new app.PrayerForm({model:prayer});			
		},
		bindEvents: function(){
			document.addEventListener('deviceready', this.onDeviceReady, false);		
		},
		onDeviceReady: function(){
			document.addEventListener('backbutton', this.onBackKeyDown, false);		
		},
		onBackKeyDown: function(){
			if($.mobile.activePage[0].id === 'login-page'){
				navigator.app.exitApp();
			}
		},
		
};
