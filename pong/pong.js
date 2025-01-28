const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 8;

let ballSpeed = 4;

const playerPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const computerPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 4
};

const ball = {
    x: canvas.width / 2 - 5,
    y: canvas.height / 2 - 5,
    width: 10,
    height: 10,
    dx: ballSpeed,
    dy: ballSpeed
};

let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';

    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    ctx.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

    document.getElementById('score').textContent = `Score: ${score}`;
}

function update() {
    playerPaddle.y += playerPaddle.dy;
    if (playerPaddle.y < 0) {
        playerPaddle.y = 0;
    } else if (playerPaddle.y + playerPaddle.height > canvas.height) {
        playerPaddle.y = canvas.height - playerPaddle.height;
    }

    if (computerPaddle.y + computerPaddle.height / 2 < ball.y) {
        computerPaddle.dy = ballSpeed;
    } else {
        computerPaddle.dy = -ballSpeed;
    }
    computerPaddle.y += computerPaddle.dy;
    if (computerPaddle.y < 0) {
        computerPaddle.y = 0;
    } else if (computerPaddle.y + computerPaddle.height > canvas.height) {
        computerPaddle.y = canvas.height - computerPaddle.height;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y < 0 || ball.y + ball.height > canvas.height) {
        ball.dy *= -1;
    }

    if (ball.x < playerPaddle.x + playerPaddle.width && ball.y + ball.height > playerPaddle.y && ball.y < playerPaddle.y + playerPaddle.height) {
        ball.dx *= -1;
        score++;
        ballSpeed += 0.5;
    }
    if (ball.x + ball.width > computerPaddle.x && ball.y + ball.height > computerPaddle.y && ball.y < computerPaddle.y + computerPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x < 0 || ball.x + ball.width > canvas.width) {
        ball.x = canvas.width / 2 - ball.width / 2;
        ball.y = canvas.height / 2 - ball.height / 2;
        ball.dx = ballSpeed * (ball.dx > 0 ? 1 : -1);
        ball.dy = ballSpeed * (ball.dy > 0 ? 1 : -1);
        score = 0;
        ballSpeed = 4;
    }
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        playerPaddle.dy = -paddleSpeed;
    } else if (event.key === 'ArrowDown') {
        playerPaddle.dy = paddleSpeed;
    }
});

document.addEventListener('keyup', () => {
    playerPaddle.dy = 0;
});

gameLoop();
