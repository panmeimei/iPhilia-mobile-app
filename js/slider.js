/**
 * js/slider.js
 * to transfer contents into a slider
 */

var app = app||{};

app.Slider = function(preBtn, nextBtn, ulElement){
	this.list = ulElement; //#bible-slider
	this.prevBtn=preBtn;
	this.nextBtn=nextBtn;
	this.initialize();
}
app.Slider.prototype = {
		initialize:function(){
			this.config();
			this.initEvents();			
		},
		config:function(){		
		//	this.speed=500;
		//	this.easing='ease';
	//this.list=$('#slider'); //ul
			this.items = this.list.children('li'); //li. to use jquery function later, need to pass a jquery object
			this.itemsCount = this.items.length;
			this.list.css('width',100*this.itemsCount+'%');//ul width. style.* is a native javascript attribute
			this.items.css( 'width',100/this.itemsCount+'%')//li width. css() is a jquery function
			this.current=0;
			this.old=0;
			
			this.prevBtn.addClass('ui-state-disabled');
		
	        // transition end event name and transform name
	       //define it in css
	     //       this.list.css( 'transition','-webkit-transform '  +  this.speed + 'ms ' + this.easing );

		},
		initEvents:function(){
			this.prevBtn.on('click', $.proxy(this.navigator, this, 'previous'));
			this.nextBtn.on('click', $.proxy(this.navigator, this, 'next'));
			this.list.on('swipeleft', $.proxy(this.navigator, this, 'next'));
			this.list.on('swiperight', $.proxy(this.navigator, this, 'previous'));
		},
		navigator:function(direction){
			this.old=this.current;
			if(direction ==='previous'&&this.old>0){
				--this.current;
			}
			if(direction==='next'&&this.old<this.itemsCount-1){
				++this.current;			
			}
			this.slide();
		},
		slide:function(){
			this.naviController();
			var translateVal = -1 * this.current * 100 /this.itemsCount;
			this.list.css('transform', 'translate('+translateVal+'%)');
		},
		naviController:function(){
			switch(this.current){
			case 0: this.prevBtn.addClass('ui-state-disabled'); this.nextBtn.removeClass('ui-state-disabled');break;
			case this.itemsCount-1:this.prevBtn.removeClass('ui-state-disabled'); this.nextBtn.addClass('ui-state-disabled');break;
			default: this.prevBtn.removeClass('ui-state-disabled'); this.nextBtn.removeClass('ui-state-disabled');break;
			}
		}
}