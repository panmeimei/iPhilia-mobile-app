/**
 * js/app.js
 */

app = app||{};

var app = {
		user:null,
		initialize:function(user){
			//clear page			
			this.user = user;			
			new app.BibleSectionView();			
			new app.EventsView();	
			//this.initPushwoosh();
			//this.bindEvents();
		},
		bindEvents: function(){
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		onDeviceReady: function(){
					
		},
		initPushwoosh:function(){
	    	  var pushNotification = window.plugins.pushNotification;
	    	    //notify plugin that device is ready, this is VERY important as it will dispatch on start push notification
	    	    pushNotification.onDeviceReady();
	    	 
	    	    //register for push notifications
	    	    pushNotification.registerDevice({ projectid: "14680735544", appid : "D4810-43B04" },
	    	        function(status) {
	    	            //this is push token
	    	            var pushToken = status;
	    	            console.warn('push token: ' + pushToken);
	    	        },
	    	        function(status) {
	    	            console.warn(JSON.stringify(['failed to register ', status]));
	    	        }
	    	    );
	    	 
	    	    //this function gets called when push notifications has been received
	    	    document.addEventListener('push-notification', function(event) {
	    	        var title = event.notification.title;
	    	            var userData = event.notification.userdata;
	    	                                 
	    	            if(typeof(userData) != "undefined") {
	    	            console.warn('user data: ' + JSON.stringify(userData));
	    	        }
	    	                                     
	    	            navigator.notification.alert(title);
	    	    });
	    }
		
};
