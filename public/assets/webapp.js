console.log("scripts loaded");

document.addEventListener('click', function (event) {

	if (!event.target.matches('.btn-save')) return;
	event.preventDefault();
	console.log(event.target);

}, false);