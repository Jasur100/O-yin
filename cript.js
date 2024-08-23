const platform = document.getElementById('platform');
const block = document.getElementById('block');
const gameContainer = document.querySelector('.game-container');

const platformWidth = 100;
const blockSize = 30;
const moveSpeed = 10; // Скорость перемещения платформы
const fallSpeed = 5;  // Скорость падения блока

let blockPosition = { top: 0, left: Math.random() * (gameContainer.clientWidth - blockSize) };
let platformPosition = { left: gameContainer.clientWidth / 2 - platformWidth / 2 };

// Функция для обновления позиции блока
function updateBlockPosition() {
    block.style.top = blockPosition.top + 'px';
    block.style.left = blockPosition.left + 'px';
}

// Функция для перемещения платформы
function movePlatform(e) {
    if (e.key === 'ArrowLeft') {
        platformPosition.left = Math.max(platformPosition.left - moveSpeed, 0);
    } else if (e.key === 'ArrowRight') {
        platformPosition.left = Math.min(platformPosition.left + moveSpeed, gameContainer.clientWidth - platformWidth);
    }
    platform.style.left = platformPosition.left + 'px';
}

// Функция для проверки столкновения
function checkCollision() {
    const blockRect = block.getBoundingClientRect();
    const platformRect = platform.getBoundingClientRect();

    if (
        blockRect.bottom >= platformRect.top &&
        blockRect.left < platformRect.right &&
        blockRect.right > platformRect.left
    ) {
        blockPosition.top = 0;
        blockPosition.left = Math.random() * (gameContainer.clientWidth - blockSize);
        block.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Изменение цвета блока
    }
}

// Основной игровой цикл
function gameLoop() {
    blockPosition.top += fallSpeed;
    if (blockPosition.top > gameContainer.clientHeight) {
        blockPosition.top = 0;
        blockPosition.left = Math.random() * (gameContainer.clientWidth - blockSize);
    }
    updateBlockPosition();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', movePlatform);
gameLoop();