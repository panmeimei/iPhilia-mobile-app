/**
 * Account management 
 */
$(document).ready(function(){
	//auto login when user's information still exists
	if(localStorage.getItem("email")){
		LogIn();
	}
	$("#login-submit").click(LogIn);
	$("#signup-submit").click(SignUp);
	$("#logout-btn").click(function(){
		$('#login-pwd').val('');
		$('#login-email').val(localStorage.getItem('email'));
		localStorage.removeItem("email");
	});
	$('#join-btn').click(function(){
		$('#signup-pwd').val('');
		$('#signup-email').val('');
		$('#fname').val('');
		$('#lname').val('');
	});
	
});

var app = app||{};
var SignUp = function(){
	$.ajax({
		type: "POST",
		url:"https://api.parse.com/1/users",
		headers:{
			"X-Parse-Application-Id":"F6Scp43NZm8qJ8VSEDzEIysry1IgELJPz5u6xzxx",
			"X-Parse-REST-API-Key":"bpTWYs0PgiR5TC16zV1gBHOzAHOgaS9bD1N3QauY"
		},	
		data: JSON.stringify({
			   "firstname":$("#fname").val(),
			   "lastname":$("#lname").val(),
			   "username" :$("#signup-email").val(), 
			   "email" : $("#signup-email").val(), 
			   "password" :$("#signup-pwd").val()
				}),
		dataType: "json",
		contentType: "application/json",
		success: function(){$.mobile.navigate("#login-page", {info: "going to #login-page"});},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("something wrong..."+errorThrown);
			
		},
		complete: function(){console.log("request complete");}
	});
	
};

var LogIn = function(){
	$.ajax({
		type: "GET",
		url:"https://api.parse.com/1/login",
		data: {"username" :$("#login-email").val(), 
			   "password" :$("#login-pwd").val()},
		headers:{
			"X-Parse-Application-Id":"F6Scp43NZm8qJ8VSEDzEIysry1IgELJPz5u6xzxx",
			"X-Parse-REST-API-Key":"bpTWYs0PgiR5TC16zV1gBHOzAHOgaS9bD1N3QauY"
		},	
		dataType: "json",
		contentType: "application/json",
		success:prepProfile,
		error: function(){
			console.log("something wrong..."+$("#login-email").val());
			$("#login-error-msg").popup('open');},
		complete: function(){console.log("request complete");}
	});
	
	function prepProfile(json){
	    user = new User(json.firstname, json.lastname, json.objectId);	    
	    app.initialize(user);
	    localStorage.setItem("email", json.email);
		$.mobile.navigate("#main-page", {info: "going to #main-page"});
	};
};

//user constructor
function User(firstName,lastName,id){
	this.firstName=firstName;
	this.lastName=lastName;
	var userId = id;
	this.getUserId = function(){
		return userId ;
	};	
}

