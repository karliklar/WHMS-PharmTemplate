$(function() {
	
    "use strict";
	
	// REMOVE # FROM URL
	$( 'a[href="#"]' ).click( function(e) {
		e.preventDefault();
	});
	
	// CAMERA SLIDER
	$("#camera_wrap_1").camera({
		alignment: 'center',
		autoAdvance: true,
		mobileAutoAdvance: true,
		barDirection: 'leftToRight',
		barPosition: 'bottom',
		loader: 'none',
		opacityOnGrid: false, 
		cols: 12,
		height: '50%',
		playPause: false,
		pagination: true,
		imagePath: 'plugins/camera/images/',
		time:1000
	});
	
	// NEWS CAROUSEL
	$("#news-carousel, #comments-carousel").carousel({
		interval: false
	});
	
	// ACCORDION
	var $active = $("#accordion .panel-collapse.in, #accordion-faqs .panel-collapse.in")
					.prev()
					.addClass("active");
					
	$active
		.find("a")
		.append("<span class=\"fa fa-minus pull-right\"></span>");
		
	$("#accordion .panel-heading, #accordion-faqs .panel-heading")
		.not($active)
		.find('a')
		.prepend("<span class=\"fa fa-plus pull-right\"></span>");
	
	$("#accordion, #accordion-faqs").on("show.bs.collapse", function (e) {	
		$("#accordion .panel-heading.active")
			.removeClass("active")
			.find(".fa")
			.toggleClass("fa-plus fa-minus");				
		$(e.target)
			.prev()
			.addClass("active")
			.find(".fa")
			.toggleClass("fa-plus fa-minus");		
	});
	
	$("#accordion, #accordion-faqs").on("hide.bs.collapse", function (e) {
		$(e.target)
			.prev()
			.removeClass("active")
			.find(".fa")
			.removeClass("fa-minus")
			.addClass("fa-plus");
	});
	
	// DOCTORS FILTERS
	var $grid = $('#doctors-grid');
	$grid.shuffle({
		itemSelector: '.doctors-grid', // the selector for the items in the grid
		speed: 500 // Transition/animation speed (milliseconds)
	});
	/* reshuffle when user clicks a filter item */
	$('#doctors-filter li a').click(function (e) {
		// set active class
		$('#doctors-filter li a').removeClass('active');
		$(this).addClass('active');
		// get group name from clicked item
		var groupName = $(this).attr('data-group');
		// reshuffle grid
		$grid.shuffle('shuffle', groupName );
	});
	
	//MAGNIFIC POPUP
	$('.gallery-grid').magnificPopup({
		delegate: 'a.zoom', 
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	
	//AJAX office supply CONTACT FORM
	$(".contact-form-md").submit(function() {
		var rd = this;
		var url = "../compounds/sendemail-md.php"; // the script where you handle the form input.
		$.ajax({
			type: "POST",
			url: url,
			data: $(".contact-form-md").serialize(), // serializes the form's elements.
			success: function(data) {
				$(rd).prev().text(data.message).fadeIn().delay(3000).fadeOut();
				}
		});
		return false; // avoid to execute the actual submit of the form.
	});
	
		//AJAX CONTACT FORM
	$(".contact-form").submit(function() {
		var rd = this;
		var url = "sendemail.php"; // the script where you handle the form input.
		$.ajax({
			type: "POST",
			url: url,
			data: $(".contact-form").serialize(), // serializes the form's elements.
			success: function(data) {
				$(rd).prev().text(data.message).fadeIn().delay(3000).fadeOut();
			}
		});
		return false; // avoid to execute the actual submit of the form.
	});
	
	// GOOGLE MAP
	function initialize($) {
		var mapOptions = {	
			zoom: 8,
			center: new google.maps.LatLng(17.421306, 78.457553),
			disableDefaultUI: true
		};
		var map = new google.maps.Map(document.querySelector('.map'), mapOptions);
	}
	google.maps.event.addDomListener(window, 'load', initialize);
	
	
	
});