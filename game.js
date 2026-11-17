// --- 1. Mise en place -------------------------------------------------------
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d"); // "ctx" = le pinceau pour dessiner
const replayButton = document.getElementById("replay");

// --- Réglages : tout ce que tu peux modifier pour changer le jeu ------------
const PADDLE_W = 6;
const PADDLE_H = 90;
const PADDLE_SPEED = 9; // vitesse des raquettes
const BALL_SIZE = 12;
const BALL_SPEED_X = 9; // vitesse horizontale de la balle
const BALL_SPEED_Y = 5; // vitesse verticale de la balle
const WIN_SCORE = 5; // points nécessaires pour gagner
const SERVE_DELAY = 60; // images d'attente avant la mise en jeu (60 = environ 1 seconde)

// --- 2. Les objets du jeu ---------------------------------------------------

const leftPaddle = { x: 20, y: 0 };
const rightPaddle = { x: canvas.width - 20 - PADDLE_W, y: 0 };
const ball = { x: 0, y: 0, vx: 0, vy: 0 }; // vx / vy = vitesse horizontale / verticale

// L'ÉTAT DU JEU : la réponse à "dans quelle situation sommes-nous ?"
const score = { left: 0, right: 0 };
const game = {
  phase: "serving", // "serving" (attente) | "playing" (en jeu) | "gameOver" (fini)
  serveTimer: 0, // images restantes avant la mise en jeu
  winner: null, // null, puis "left" ou "right"
};

function centerPaddles() {
  leftPaddle.y = canvas.height / 2 - PADDLE_H / 2;
  rightPaddle.y = canvas.height / 2 - PADDLE_H / 2;
}

// loserSide : "left" ou "right" (le joueur qui vient de perdre le point), ou rien au début de partie.
function resetBall(loserSide) {
  ball.x = canvas.width / 2 - BALL_SIZE / 2;
  ball.y = canvas.height / 2 - BALL_SIZE / 2;
  if (loserSide === "right") {
    ball.vx = BALL_SPEED_X; // le perdant est à droite : la balle va vers la droite
  } else if (loserSide === "left") {
    ball.vx = -BALL_SPEED_X; // le perdant est à gauche : la balle va vers la gauche
  } else {
    ball.vx = Math.random() < 0.5 ? BALL_SPEED_X : -BALL_SPEED_X; // pas de perdant : au hasard
  }
  ball.vy = Math.random() < 0.5 ? BALL_SPEED_Y : -BALL_SPEED_Y; // haut ou bas au hasard
}

// Nouvelle mise en jeu : balle au centre, immobile, le temps du décompte.
function startServe(loserSide) {
  resetBall(loserSide);
  game.phase = "serving";
  game.serveTimer = SERVE_DELAY;
}

// Un joueur marque : on augmente son score, puis victoire ou nouvelle mise en jeu.
function scorePoint(side) {
  score[side]++;
  if (score[side] >= WIN_SCORE) {
    game.phase = "gameOver";
    game.winner = side;
    replayButton.hidden = false; // affiche le bouton Rejouer
  } else {
    const loserSide = side === "left" ? "right" : "left"; // le perdant est l'autre côté
    startServe(loserSide);
  }
}

// Remet tout à zéro pour une nouvelle partie.
function restartGame() {
  score.left = 0;
  score.right = 0;
  game.winner = null;
  replayButton.hidden = true;
  replayButton.blur(); // évite qu'Entrée ou Espace ne rappuie sur le bouton
  centerPaddles();
  startServe();
}

replayButton.addEventListener("click", restartGame);

// --- 3. Le clavier ----------------------------------------------------------
// On note quelles touches sont enfoncées en ce moment.
const keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // évite de faire défiler la page
});
window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

// --- 4. Mise à jour : on calcule le nouvel état du jeu ----------------------
function update() {
  // Partie finie : plus rien ne bouge.
  if (game.phase === "gameOver") return;

  // Raquettes : en canvas, y augmente vers le BAS, donc monter = retirer.
  if (keys["z"]) leftPaddle.y -= PADDLE_SPEED;
  if (keys["s"]) leftPaddle.y += PADDLE_SPEED;
  if (keys["arrowup"]) rightPaddle.y -= PADDLE_SPEED;
  if (keys["arrowdown"]) rightPaddle.y += PADDLE_SPEED;

  // Empêche les raquettes de sortir de l'écran.
  leftPaddle.y = Math.max(0, Math.min(canvas.height - PADDLE_H, leftPaddle.y));
  rightPaddle.y = Math.max(0, Math.min(canvas.height - PADDLE_H, rightPaddle.y));

  // Attente avant la mise en jeu : la balle ne bouge pas encore.
  if (game.phase === "serving") {
    game.serveTimer--;
    if (game.serveTimer <= 0) game.phase = "playing";
    return;
  }

  // Déplace la balle.
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Rebond sur le haut et le bas.
  if (ball.y <= 0 || ball.y + BALL_SIZE >= canvas.height) {
    ball.vy = -ball.vy;
  }

  // Rebond sur les raquettes.
  if (hits(leftPaddle) && ball.vx < 0) ball.vx = -ball.vx;
  if (hits(rightPaddle) && ball.vx > 0) ball.vx = -ball.vx;

  // La balle sort à droite : le joueur de gauche marque. Sortie à gauche : celui de droite.
  if (ball.x > canvas.width) scorePoint("left");
  else if (ball.x + BALL_SIZE < 0) scorePoint("right");
}

// Vrai si la balle touche la raquette (deux rectangles qui se chevauchent).
function hits(p) {
  return (
    ball.x < p.x + PADDLE_W &&
    ball.x + BALL_SIZE > p.x &&
    ball.y < p.y + PADDLE_H &&
    ball.y + BALL_SIZE > p.y
  );
}

// --- 5. Dessin : on affiche l'état du jeu -----------------------------------
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // efface l'image précédente
  ctx.fillStyle = "#fff";
  ctx.fillRect(leftPaddle.x, leftPaddle.y, PADDLE_W, PADDLE_H);
  ctx.fillRect(rightPaddle.x, rightPaddle.y, PADDLE_W, PADDLE_H);
  ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE);

  // Score visible en haut, un chiffre au quart et aux trois quarts de la largeur.
  ctx.font = "48px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(score.left, canvas.width / 4, 60);
  ctx.fillText(score.right, (canvas.width * 3) / 4, 60);

  // Écran de fin : voile sombre + message du vainqueur.
  if (game.phase === "gameOver") {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "40px sans-serif";
    const who = game.winner === "left" ? "gauche" : "droite";
    ctx.fillText(`Victoire du joueur ${who} !`, canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = "28px sans-serif";
    ctx.fillText(`${score.left} - ${score.right}`, canvas.width / 2, canvas.height / 2 + 35);
  }
}

// --- 6. La boucle de jeu ----------------------------------------------------
function loop() {
  update();
  draw();
  requestAnimationFrame(loop); // "rappelle-moi pour la prochaine image"
}

centerPaddles();
startServe();
loop();
