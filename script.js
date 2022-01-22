const VERTICAL_MODE = 0;
const HORIZONTAL_MODE = 1;

function initCanvasSize(canvas) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function game() {
	const mode =
		window.innerWidth >= window.innerHeight ? HORIZONTAL_MODE : VERTICAL_MODE;

	const canvas = document.querySelector("#canvas");
	initCanvasSize(canvas);
	const context = canvas.getContext("2d");

	const circleRadius = 20;
	const speed = 100;
	const ball = {
		x: circleRadius,
		y: circleRadius,
	};
	let dirX = 1;
	let dirY = 1;

	let bar;
	if (mode === HORIZONTAL_MODE) {
		bar = {
			width: 15,
			height: 100,
		};
		bar.x = canvas.width - bar.width * 2;
		bar.y = (canvas.height - bar.height) / 2;
	} else if (mode === VERTICAL_MODE) {
		bar = {
			width: 100,
			height: 15,
		};
		bar.x = (canvas.width - bar.width) / 2;
		bar.y = canvas.height - bar.height * 2;
	}

	function handleMove(x, y) {
		if (mode === HORIZONTAL_MODE) {
			y -= bar.height / 2;

			if (y <= 0) y = 0;
			else if (y >= canvas.height - bar.height) y = canvas.height - bar.height;

			bar.y = y;
		} else if (mode === VERTICAL_MODE) {
			x -= bar.width / 2;

			if (x <= 0) x = 0;
			else if (x >= canvas.width - bar.width) x = canvas.width - bar.width;

			bar.x = x;
		}
	}

	document.onmousemove = e => handleMove(e.clientX, e.clientY);
	document.ontouchmove = e =>
		handleMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);

	let t = Date.now();

	function draw() {
		const timePassed = (Date.now() - t) / 1000;
		t = Date.now();

		context.clearRect(0, 0, canvas.width, canvas.height);

		context.beginPath();
		context.arc(ball.x, ball.y, circleRadius, 0, 2 * Math.PI);
		context.fillStyle = "red";
		context.fill();

		context.beginPath();
		context.rect(bar.x, bar.y, bar.width, bar.height);
		context.fillStyle = "blue";
		context.fill();

		ball.x += dirX * speed * timePassed;
		ball.y += dirY * speed * timePassed;

		if (ball.x >= canvas.width - circleRadius || ball.x <= circleRadius)
			dirX *= -1;
		if (ball.y >= canvas.height - circleRadius || ball.y <= circleRadius)
			dirY *= -1;

		window.requestAnimationFrame(draw);
	}

	draw();
}

// onload to wait css files to be loaded (clientWidth, etc.)
window.onload = game;
window.onresize = game;
