document.addEventListener("DOMContentLoaded", function () {
	// check if row2 exists
	if (document.querySelector(".row2 .choice-video, .row7")) {
		var modal = document.getElementById("videoPopup");
		var iframe = document.getElementById("videoFrame");
		var span = document.getElementsByClassName("close")[0];

		// Close the modal when the close button (span) is clicked
		span.onclick = function () {
			modal.style.display = "none";
			iframe.src = ""; // This clears the iframe source
			document.body.style.overflow = "auto";
		};

		// Close the modal when clicking outside of it
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
				iframe.src = ""; // Clear the iframe source
				document.body.style.overflow = "auto";
			}
		};
	}
});

function openPopup(videoUrl) {
	var modal = document.getElementById("videoPopup");
	var iframe = document.getElementById("videoFrame");
	iframe.src = videoUrl; // Set the iframe source to the video URL
	modal.style.display = "block"; // Display the modal
	document.body.style.overflow = "hidden";
}
