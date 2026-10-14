jQuery(document).ready(function ($) {

	// Row8 ---->
	const $slider_row8 = jQuery(".row.flex-content.row8 .slider");

	function updateSlideOpacity() {
		if ($(window).width() <= 1024) {
			$slider_row8.find(".slick-slide").css("opacity", 1);
			return;
		}

		const sliderWidth = $slider.width();
		const fadeStart = sliderWidth * 0.05;
		const fadeEnd = sliderWidth * 0.95;
		const sliderCenter = sliderWidth / 2;

		$slider_row8.find(".slick-slide").each(function () {
			const $slide = jQuery(this);
			const slideOffset = $slide.offset().left + $slide.outerWidth() / 2;

			if (slideOffset <= fadeStart) {
				$slide.css("opacity", 0.1);
			} else if (slideOffset >= fadeEnd) {
				$slide.css("opacity", 0.1);
			} else {
				const distanceToCenter = Math.abs(slideOffset - sliderCenter);
				const fadeFactor = 1 - distanceToCenter / (sliderCenter - fadeStart);
				$slide.css("opacity", Math.max(0.1, fadeFactor));
			}
		});

		requestAnimationFrame(updateSlideOpacity);
	}

	$slider_row8.slick({
		slidesToShow: 8,
		slidesToScroll: 1,
		arrows: false,
		infinite: true,
		// centerMode: true,
		// centerPadding: "25%",
		autoplay: true,
		autoplaySpeed: 0,
		speed: 5000,
		cssEase: "linear",
		draggable: true,
		swipe: true,
		swipeToSlide: true,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1441,
				settings: {
					slidesToShow: 4,
					// centerPadding: "20%",
				},
			},
			{
				breakpoint: 1241,
				settings: {
					slidesToShow: 3,
					// centerPadding: "15%",
				},
			},
			// {
			// 	breakpoint: 1081,
			// 	settings: {
			// 		slidesToShow: 3,
			// 		// centerPadding: "5%",
			// 	},
			// },
			{
				breakpoint: 768,
				settings: {
					// centerPadding: "0%",
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					// centerPadding: "0%",
					slidesToShow: 2,
				},
			},
		],
	});

	let resumeTimer;

	$slider_row8.on("mouseenter", function () {
		// Cancel any pending resume timer immediately
		clearTimeout(resumeTimer);
		// Update autoplaySpeed to 5000 while hovered
		jQuery(this).slick("slickSetOption", "autoplaySpeed", 5000, true);
		jQuery(this).slick("slickSetOption", "speed", 500, true);
		// Immediately pause auto-scrolling so manual scrolling is instant
		jQuery(this).slick("slickPause");
	});

	$slider_row8.on("mouseleave", function () {
		// Wait 2 seconds after leaving before resuming auto-play
		resumeTimer = setTimeout(() => {
			jQuery(this).slick("slickPlay");
			jQuery(this).slick("slickSetOption", "autoplaySpeed", 0, true);
			jQuery(this).slick("slickSetOption", "speed", 5000, true);
		}, 2000);
	});

	$slider_row8.on("swipe", function (event, slick, direction) {
		clearTimeout(resumeTimer);
		jQuery(this).slick("slickPause");
	});

	requestAnimationFrame(updateSlideOpacity);
	// Row8 <----
});
