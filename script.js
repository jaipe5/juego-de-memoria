// Array con los símbolos para las cartas (dos de cada uno)
const symbols = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', '🍓', '🍓', '🍍', '🍍', '🍋', '🍋', '🍒', '🍒'];
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

// Seleccionar el contenedor del juego
const gameGrid = document.getElementById('gameGrid');

// Función para crear las cartas
function createBoard() {
    // Mezclar las cartas
    const shuffledSymbols = symbols.sort(() => 0.5 - Math.random());

    // Crear las cartas y añadirlas al grid
    shuffledSymbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-symbol', symbol);

        card.addEventListener('click', flipCard);

        const cardFace = document.createElement('span');
        cardFace.textContent = symbol;
        cardFace.classList.add('hidden');

        card.appendChild(cardFace);
        gameGrid.appendChild(card);
    });
}

// Función para voltear una carta
function flipCard() {
    if (lockBoard) return; // Evitar que se puedan voltear más cartas mientras se revisan
    if (this === firstCard) return; // Evitar que se seleccione la misma carta dos veces

    this.querySelector('span').classList.remove('hidden');
    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // Primera carta
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Segunda carta
    secondCard = this;
    checkForMatch();
}

// Función para comprobar si hay un par
function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Función para desactivar cartas coincidentes
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

// Función para voltear las cartas si no coinciden
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.querySelector('span').classList.add('hidden');
        secondCard.querySelector('span').classList.add('hidden');

        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

// Función para reiniciar el tablero
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Crear el tablero al cargar la página
createBoard();
