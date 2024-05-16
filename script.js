// const variables
const cenary = document.getElementById('cenary');
const cap = document.getElementById('cap');
const capImg = document.getElementById('capImg');
const capHitBox = document.getElementById('capHitBox');
const gameOverDialog = document.getElementById('gameOverDialog');

// let variables
let collIntervalId;
let score = 0;
let totalScore;
let updateScoreIntervalId;
let gameOver = false;

// update score
function updateScore() {
    scoreDisplay = document.getElementById('score');
    score += 1;
    totalScore = score;
    scoreDisplay.innerHTML = score;
}
updateScoreIntervalId = setInterval(updateScore, 100);

// collision detect
function collisionDetect() {
    const capRect = capHitBox.getBoundingClientRect();
    const hitBoxes = document.querySelectorAll('.tumbleweedHitBox');

    hitBoxes.forEach(hitBox => {
        const obsRect = hitBox.getBoundingClientRect();

        if (capRect.x < obsRect.x + obsRect.width &&
            capRect.x + capRect.width > obsRect.x &&
            capRect.y < obsRect.y + obsRect.height &&
            capRect.y + capRect.height > obsRect.y) {
            gameOver = true;

            gameOverDialog.showModal();
            const totalScoreDisplay = document.getElementById('totalScore');
            totalScoreDisplay.innerText = totalScore;

            clearInterval(collIntervalId);
            clearInterval(updateScoreIntervalId);
        }
    });
}

// cap jump
let canJump = true;

const jump = () => {
    if (canJump) {
        canJump = false;
        setTimeout(() => {
            canJump = true;
        }, 1310);

        cap.classList.add('jump');

        capImg.src = 'img/Capybara jumping.gif';

        var capSound = document.getElementById("capJump");
        capSound.play();

        setTimeout(() => {
            cap.classList.remove('jump');
            capImg.src = 'img/Capybara running.gif';
            capSound.pause();
        }, 1300);
    }
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !gameOver) {
        jump();
    }
});

document.addEventListener('touchstart', function () {
    if (!gameOver) {
        jump();
    }
});

function createDiv() {
    const container = document.createElement('div');
    const img = document.createElement('img');
    const hitBox = document.createElement('div');
    container.classList.add('tumbleweed');
    hitBox.classList.add('tumbleweedHitBox');
    img.src = 'img/tumbleweed.gif';
    divSize = Math.floor(Math.random() * (16 - 10) + 10);
    container.style.width = divSize + 'vh';
    container.style.height = divSize + 'vh';

    cenary.appendChild(container);
    container.appendChild(img);
    container.appendChild(hitBox);

    container.style.animation = 'obsMove 5s linear';

    setTimeout(() => {
        container.remove();
    }, 5000);

    const randomInterval = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
    setTimeout(createDiv, randomInterval);
}
createDiv();

collIntervalId = setInterval(collisionDetect, 10);

function restart() {
    location.reload();
}

// musica de fundo
var audio = document.getElementById("myAudio");

// funçao para mutar ou desmutar
var soundImage = document.getElementById("soundImage");

function muteUnmute() {
    if (audio.muted) {
        audio.muted = false;
        soundImage.src = "img/volume_up.png";
        soundImage.alt = "Som Ativado";
    } else {
        audio.muted = true;
        soundImage.src = "img/volume_off.png";
        soundImage.alt = "Som Desativado";
    }
}

