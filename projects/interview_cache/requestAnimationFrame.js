// cancelAnimationFrame & requestAnimationFrame

function animDraw(cycle, interval) {
  let startTime = performance.now();
  let count = 0;
  function draw(timestamp) {
    if (timestamp - startTime > interval) {
      startTime = timestamp;
      count++;
      console.log('count -> ', count);
    }
    if (count < cycle) {
      requestAnimationFrame(draw);
    }
  }
  requestAnimationFrame(draw);
}

animDraw(10, 1000);