document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const cardArray = [
        { name: 'card1', img: 'images/ima1.png' },
        { name: 'card1', img: 'images/ima1.png' },
        { name: 'card2', img: 'images/ima2.png' },
        { name: 'card2', img: 'images/ima2.png'},
        { name: 'card3', img: 'images/ima3.png' },
        { name: 'card3', img: 'images/ima3.png' },
        { name: 'card4', img: 'images/ima4.png' },
        { name: 'card4', img: 'images/ima4.png' },
        { name: 'card5', img: 'images/ima5.png' },
        { name: 'card5', img: 'images/ima5.png' },
        { name: 'card6', img: 'images/ima6.png' },
        { name: 'card6', img: 'images/ima6.png' },
        { name: 'card7', img: 'images/ima7.png' },
        { name: 'card7', img: 'images/ima7.png' },
        { name: 'card8', img: 'images/ima8.png' },
        { name: 'card8', img: 'images/ima8.png' },
        { name: 'card9', img: 'images/ima9.png' },
        { name: 'card9', img: 'images/ima9.png' },
        { name: 'card10', img:'images/ima10.png'},
        { name: 'card10', img:'images/ima10.png' },
        // ...add more pairs as needed
    
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});


    // Add the audio element
    const audio = new Audio('C:\Users\YAMEOGO\Desktop\Music\Rihanna - Diamonds.mp3');

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);

            // Play the music when a match is found
            audio.play();
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];
    
        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
            attempts--;
            attemptsElement.textContent = `Attempts left: ${attempts}`;
            checkGameOver(); // Check for game over after each failed attempt
        }
    
        cardsChosen = [];
        cardsChosenId = [];
    
        if (cardsWon.length === cardArray.length / 2) {
            gameOver(true);
        }
    }
    
    // ... (rest of your code)


