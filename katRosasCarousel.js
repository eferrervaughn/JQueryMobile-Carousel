/**  katRosasCarousel 
* a simple jquery carousel for the mobile site
*/


(function($) {
	$.fn.katRosasCarousel = function(opts) {

		var options = $.extend({
			auto: false,
			speed: 500,
			touch: false,
			circular: false,
			fluid: false,
			updateIndicator: null
		}, opts || {});

		return this.each(function(){
			var $carousel = $(this);
			var $carousel_ul = $("ul", $carousel);
			
			// adds new list items if user wants circular
			if(options.circular) {
				$carousel_ul.prepend($("li:last-child", $carousel_ul).clone());
				$carousel_ul.append($("li:nth-child(2)", $carousel_ul).clone());
			}
			
			var $carousel_li = $("li", $carousel_ul);
			var $targetPage = $carousel.parents('.ui-page');
			var cellWidth = $carousel_li.width();
			var totalCells = $carousel_li.size();
			var currentPage = 0; 
			
			if(options.circular){
				//to compensate for the prepended li items
				currentPage = 1;
			}
			
			setCarouselStyles();
			
			$(window).resize(function(){
				if($targetPage.is(':visible') && options.fluid) {
					updateCarousel();
				}
			});
			
			if(options.touch) {
				$carousel_li.bind('swipeleft',function(event){
					animateCarousel("left");
				})
				$carousel_li.bind('swiperight', function(event){
					animateCarousel("right");
				})
				$carousel_li.click(function(){
					animateCarousel("right");
				})
			}
			
			function animateCarousel(direction) {
				if(direction == "left" && $targetPage.is(':visible')) {
					currentPage += 1;
					moveCells();
				}
				
				if(direction == "right" && $targetPage.is(':visible')) {
					currentPage -= 1;
					moveCells();
				}
			}
			
			function currentPageInRange() {
				return currentPage >= 0 && currentPage < totalCells;
			}
			
			function loadCorrectPosition() {
				if(currentPage >= totalCells-1) {
					currentPage = 1;
					setCarouselUIToCurrentPage();
				}
				
				if(currentPage <= 0) {
					currentPage = totalCells-2;
					setCarouselUIToCurrentPage();
				}
			}
			
			function moveCells() {
				if(currentPageInRange()) {
					$carousel_ul.animate({
						'marginLeft': cellWidth*(-currentPage)
					}, options.speed, null, function(){
							if(options.updateIndicator){
								options.updateIndicator(currentPage);
							}
							if(options.circular){
								loadCorrectPosition();
							}
					});
				}
			}
			
			function setCarouselStyles() {
				$carousel.css({ 
					overflow: "hidden", 
					position: "relative"
				});
				
				$carousel_ul.css({
					height: "100%", 
					margin: "0", 
					padding: "0", 
					"list-style-type": "none", 
					position: "relative", 
					width: cellWidth*totalCells
				});
				
				$carousel_li.css({
					overflow: "hidden", 
					height: "100%", 
					display: "inline-block", 
				});
				
				if(options.fluid) {
					cellWidth = $(window).width();
					
					$carousel_li.css({
						width: cellWidth
					});
					
					$carousel_ul.css({
						width: cellWidth*totalCells
					});
				}
				
				if(options.circular){
					$carousel_ul.css({
						marginLeft: -(cellWidth)
					});
				}
			}
			
			function setCarouselUIToCurrentPage() {
				$carousel_ul.css({
					marginLeft: cellWidth*(-currentPage)
				});
				if(options.updateIndicator){
					options.updateIndicator(currentPage);
				}
			}
			
			function updateCarousel() {
				cellWidth = $(window).width();
				
				$carousel_li.css({
					width: cellWidth
				});
				
				$carousel_ul.css({
					width: cellWidth*totalCells
				});
				
				//GOOD Specific code
 				$('.second-element', $carousel).css("width", $(window).width()*.50);
 				$('.first-element', $carousel).css("width", $(window).width()*.50);
				
				//reset position
				$carousel_ul.css({
					marginLeft: -(cellWidth*currentPage)
				});
				if(options.updateIndicator){
					options.updateIndicator(currentPage);
				}
			}
		});
	};
})(jQuery);