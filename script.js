function initCanvasSize(canvas) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function game() {
	const canvas = document.querySelector("#canvas");
	initCanvasSize(canvas);
	window.onresize = () => initCanvasSize(canvas);
	const context = canvas.getContext("2d");

	const circleRadius = 20;
	const speed = 100;
	let x = circleRadius;
	let y = circleRadius;
	let dirX = 1;
	let dirY = 1;
	let t = Date.now();

	function draw() {
		const timePassed = (Date.now() - t) / 1000;
		t = Date.now();

		context.clearRect(0, 0, canvas.width, canvas.height);

		context.beginPath();
		context.arc(x, y, circleRadius, 0, 2 * Math.PI);
		context.fillStyle = "red";
		context.fill();

		x += dirX * speed * timePassed;
		y += dirY * speed * timePassed;

		if (x >= canvas.width - circleRadius || x <= circleRadius) dirX *= -1;
		if (y >= canvas.height - circleRadius || y <= circleRadius) dirY *= -1;

		window.requestAnimationFrame(draw);
	}

	draw();
}

// onload to wait css files to be loaded (clientWidth, etc.)
window.onload = game;
