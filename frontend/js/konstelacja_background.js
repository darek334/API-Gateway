	function runBackground() {
		
		const canvas = document.getElementById("stars");
		const ctx = canvas.getContext("2d");

		let w, h;
		function resize() {
			w = canvas.width = window.innerWidth;
			h = canvas.height = window.innerHeight;
		}
		window.addEventListener("resize", resize);
		resize();

		const stars = [];
		const STAR_COUNT = 120;
		const MAX_DIST = 140;

		for (let i = 0; i < STAR_COUNT; i++) {
			stars.push({
				x: Math.random() * w,
				y: Math.random() * h,
				vx: (Math.random() - 0.5) * 0.15,
				vy: (Math.random() - 0.5) * 0.15
			});
		}

		function draw() {
			ctx.clearRect(0, 0, w, h);

			// gwiazdy
			for (let s of stars) {
				s.x += s.vx;
				s.y += s.vy;

				if (s.x < 0 || s.x > w) s.vx *= -1;
				if (s.y < 0 || s.y > h) s.vy *= -1;

				ctx.fillStyle = "#ff8866";
				ctx.beginPath();
				ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2);
				ctx.fill();
			}

			// linie konstelacji
			for (let i = 0; i < stars.length; i++) {
				for (let j = i + 1; j < stars.length; j++) {
					const dx = stars[i].x - stars[j].x;
					const dy = stars[i].y - stars[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < MAX_DIST) {
						ctx.strokeStyle = `rgba(255,120,90,${1 - dist / MAX_DIST})`;
						ctx.lineWidth = 0.6;
						ctx.beginPath();
						ctx.moveTo(stars[i].x, stars[i].y);
						ctx.lineTo(stars[j].x, stars[j].y);
						ctx.stroke();
					}
				}
			}

			requestAnimationFrame(draw);
		}

		draw();
	}
