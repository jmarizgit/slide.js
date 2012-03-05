/*!
SlideJS
---------
author: 	Mariz Melo (MM) 2012
*/
(function($){
	
	$.fn.slidejs = function(){

		var $element = "#"+$(this).attr("id"); //cache id for the slide div wrapper
		var play;	//will hold the setinterval event
		
		//configuration variable
		var $config = {
			size : $($element+" .images").children("dd").length-1,
			width : $($element+" .viewport").width(),
			controls : 1,	//show or hide controls
			interval : "3",	//number of seconds before go to next slide
			speed : "400",	//speed of transitions
			slide : 1,	//start from this slide
			pauseoverimage : 1,	//pause when mouse is over slide images
			pauseovernavigation : 1	//pause when mouse is over navigation buttons (after click on them)
		};
		
		//show menu
		if($config.controls)
			$($element+" .navigation").css({"display":"block"});
		
		//increases size of image wrapper
		$($element+" .images").css({"width": (($config.size+1)*$config.width)+"px"});
		
		//GO TO SPECIFIC SLIDE
		var gotoSlide = function($goto){
			
			$config.slide = $goto;
			
			$($element+" .navigation dd").each(function(){
				$(this).removeClass("active");
			});
			
			$($element+" .navigation dd:nth-child("+($config.slide+1)+")").addClass("active");
			
			var move;
			if($config.slide <= $config.size)
				move = "-"+ $config.slide * $config.width + "px";
			else
				move = 0;
				
			$($element+" .images").animate({"margin-left": move }, $config.speed);
			
			
		};//gotoSlide()		
		
		
		//CREATES LOOP EVENT
		var playSlide = function(){
			 play = self.setInterval(function() {
			 	if($config.slide > $config.size){
					$config.slide = 0;}//go to start of slideshow
	    			gotoSlide($config.slide);
	    			$config.slide++;
			}, $config.interval*1000);
		};
		
		//INITIALIZE PLUGIN
		playSlide();
		
		//CONTROLS
		$($element+" .navigation dd").click(function(event){
			event.preventDefault();
			window.clearInterval(play);
			gotoSlide($(this).index());
		}).mouseleave(function(){
			window.clearInterval(play);
			playSlide();			
		});
		
		//PAUSE LOOP
		if($config.pauseoverimage){
			$(".images").mouseenter(function(event){
				window.clearInterval(play);
			}).mouseleave(function(){
				playSlide();
			});
		}//if

	}//fn.slidesjs
	
})(jQuery); 