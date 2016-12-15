//get all elements with class and get the biggest box
function get_biggest(elements){
	var biggest_height = 0;
	for ( var i = 0; i < elements.length ; i++ ){
		var element_height = $(elements[i]).height();
		//compare the height, if bigger, assign to variable
		if(element_height > biggest_height ) biggest_height = element_height;
	}
	return biggest_height;
}

function resize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// STICKY FOOTER
	var headerHeight = $('header').outerHeight();
	var footerHeight = $('footer').outerHeight();
	var footerTop = (footerHeight) * -1
	$('footer').css({marginTop: footerTop});
	$('#main-wrapper').css({paddingBottom: footerHeight});

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	//$('.coverimage, .home-main-slide .flexslider').css({'height': headerHeight - $('.subscribe-wrap').outerHeight(false)});

	// for equalizer
	$('.classname').css({minHeight: 0});
  var ClassName = get_biggest($('.classname'));
  $('.classname').css({minHeight: ClassName});
}

$(window).resize(function() {
	resize();
	doCoverImage();
});

$(document).ready(function() {
	if (Modernizr.touch) {
		$('html').addClass('bp-touch');
	}

	$('.owl-carousel').owlCarousel({
	    loop:true,
	    margin:10,
	    nav:true,
	    responsiveClass:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:3
	        }
	    }
	});

	$('.animated').appear(function() {
        var element = $(this);
        var animation = element.data('animation');
        var animationDelay = element.data('delay');
        if(animationDelay) {
          setTimeout(function(){
              element.addClass( animation + " visible" );
              element.removeClass('hiding');
          }, animationDelay);
        } else {
          element.addClass( animation + " visible" );
          element.removeClass('hiding');
        }               
    }, {accY: -90});
	
	resize();
});

$(window).load(function() {
	resize();
});

// preloader once done
Pace.on('done', function() {
	// totally hide the preloader especially for IE
	setTimeout(function() {
		$('.pace-inactive').hide();

		$('.home-main-slide #slider').flexslider({
			animation: "fade",
			directionNav: false,
			controlNav: true,
			slideshow: false,
			slideshowSpeed: 8000, 
			animationSpeed: 400, 
			prevText: "&nbsp;",
			nextText: "&nbsp;",
			sync: "#carousel",
			start: function(slider){
				doCoverImage();

				$('.hm-slide-main').addClass('is-anim');
				$('header').addClass('is-anim');
				$('.flex-direction-nav .flex-prev').css({'right' : $('.flex-control-nav.flex-control-paging').width() + 140});
				setTimeout(function(){
					$(slider).find("img[data-src]").each(function () {
			          var src = $(this).attr("data-src");
			          $(this).attr("src", src).removeAttr("data-src");
			       });
				}, 300);

			}
		});

		$('.home-main-slide #carousel').flexslider({
		    animation: "slide",
		    controlNav: false,
		    directionNav: false,
		    animationLoop: false,
		    slideshow: false,
		    itemWidth: 240,
		    itemMargin: 5,
		    asNavFor: '#slider'
		  });
		 
		  
	}, 500);

	$('.subscribe-arrow').click(function(e){
		e.preventDefault();
		$("html, body").animate({ scrollTop: $('#h-about').offset().top }, 600);
	});
	
});

function doCoverImage() {
	$('.coverimage img').each(function() {
		coverImage( $(this) );
	});
}


function coverImage( image ) {

	var imgObj = image;
	var iW = imgObj.attr('width');//width(); //width of image ratio
	var iH = imgObj.attr('height');//.height(); //height of image ratio

	imgObj.width(0).height(0);
	
	var imgContainer = image.parent();
	var cW = imgContainer.width(); //width of container or browser
	var cH = imgContainer.height(); //height of container or browser

	//console.log(iW,iH,cW,cH);

	if ( cH > 1 ) {
		var cP = cW/cH; //ratio of container or browser
		var iP = iW/iH; //ratio of image

		if ( iP > cP ) { //if image ratio is more than container ratio (if image width is more than container width)
			iH = cH; //set image height from container height
			iW = cH * iP; //set image width using container height and image ratio
			imgObj.css({
				'margin-top': 0,
				'margin-left': Math.ceil((cW-iW)/2),
				'width': Math.ceil(iW),
				'height': Math.ceil(iH)
			}); //center the image and set dimensions
		} else { //if image ratio is less than container ratio (if image height is more than container height)
			iW = cW; //set image width from container width
			iH = cW / iP; //set image height from container width and ratio
			imgObj.css({
				'margin-top': Math.ceil((cH-iH)/2),
				'margin-left': 0,
				'width': Math.ceil(iW),
				'height': Math.ceil(iH)
			}); //center the image and set dimensions
		}
	} else {
		imgObj.css({
			'margin-top': 0,
			'margin-left': 0,
			'width': 'auto',
			'height': 'auto'
		});
	}
}
