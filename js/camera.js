
var app = {
	
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
     //   pictureSource=navigator.camera.PictureSourceType;
     //   destinationType=navigator.camera.DestinationType;
        if (!navigator.camera) {
            app.showAlert("Camera API not supported", "Error");
            return;
        }
        app.showAlert("Camera API loaded");
       
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    showAlert: function (message, title) {
	    if (navigator.notification) {
	        navigator.notification.alert(message, null, title, 'OK');
	    } else {
	        alert(title ? (title + ": " + message) : message);
	    }
	},
	capturePhoto: function () {
		
		 var options =   {   quality: 50,
	                destinationType: Camera.DestinationType.DATA_URL,
	                sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
	                encodingType: 0     // 0=JPG 1=PNG
	            };
	      // Take picture using device camera and retrieve image as base64-encoded string
	      navigator.camera.getPicture(onSuccess, onFail, options);
	 }
};
var onSuccess = function(imageData){
	// Uncomment to view the base64-encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
	
};
var onFail = function(message) {
    app.showAlert('Error taking picture because '+message, 'Error');
};