const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

let playerX = gameArea.offsetWidth / 2;
let score = 0;
let lives = 3;

const moveSpeed = 25;

// Move player
document.addEventListener("keydown", (e) => {
  const gameWidth = gameArea.offsetWidth;

  if (e.key === "ArrowLeft") {
    playerX -= moveSpeed;
  }

  if (e.key === "ArrowRight") {
    playerX += moveSpeed;
  }

  // Boundaries
  if (playerX < 20) playerX = 20;
  if (playerX > gameWidth - 60) playerX = gameWidth - 60;

  player.style.left = playerX + "px";
});

// Create falling stars
function createStar() {
  const star = document.createElement("div");
  star.classList.add("falling-star");
  star.innerHTML = "⭐";

  star.style.position = "absolute";
  star.style.fontSize = "35px";
  star.style.left = Math.random() * (gameArea.offsetWidth - 40) + "px";
  star.style.top = "-40px";

  gameArea.appendChild(star);

  let starTop = -40;

  const fall = setInterval(() => {
    starTop += 5;
    star.style.top = starTop + "px";

    const starLeft = parseInt(star.style.left);

    // Collision detection
    if (
      starTop > 390 &&
      starLeft > playerX - 40 &&
      starLeft < playerX + 40
    ) {
      score++;
      scoreDisplay.textContent = score;

      star.remove();
      clearInterval(fall);
    }

    // Missed star
    if (starTop > gameArea.offsetHeight) {
      lives--;
      livesDisplay.textContent = lives;

      star.remove();
      clearInterval(fall);

      if (lives <= 0) {
        alert("🎉 Game Over! Hamdan collected " + score + " stars!");
        location.reload();
      }
    }
  }, 30);
}

// Spawn stars
setInterval(createStar, 1200);