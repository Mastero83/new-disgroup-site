jQuery(document).ready(function ($) {
	// matchheight .row.flex-content.row5 .full-row .blocks-container .blocks-group.extra .block.item .inner-block.image - .row.flex-content.row5 .full-row .blocks-container .blocks-group.extra .block.item .inner-block.icon

	document.querySelectorAll(".row.flex-content.row1 .repeater-nav .nav-button").forEach((button) => {
		button.addEventListener("click", () => {
			const targetId = button.getAttribute("data-target");

			// Remove active classes
			document.querySelectorAll(".block.slide").forEach((slide) => slide.classList.remove("active"));
			document.querySelectorAll(".nav-button").forEach((btn) => btn.classList.remove("active"));

			// Activate the target
			document.querySelector(`.block.slide[data-id="${targetId}"]`).classList.add("active");
			button.classList.add("active");
		});
	});
});
