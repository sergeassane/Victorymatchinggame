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

    class AudioController {
        constructor() {
            this.bgMusic = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/creepy.mp3');
            this.flipSound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/flip.wav');
            this.matchSound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/match.wav');
            this.victorySound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/victory.wav');
            this.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
            this.bgMusic.volume = 0.5;
            this.bgMusic.loop = true;
        }
        startMusic() {
            this.bgMusic.play();
        }
        stopMusic() {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
        flip() {
            this.flipSound.play();
        }
        match() {
            this.matchSound.play();
        }
        victory() {
            this.stopMusic();
            this.victorySound.play();
        }
        gameOver() {
            this.stopMusic();
            this.gameOverSound.play();
        }
    }
    
    class MixOrMatch {
        constructor(totalTime, cards) {
            this.cardsArray = cards;
            this.totalTime = totalTime;
            this.timeRemaining = totalTime;
            this.timer = document.getElementById('time-remaining')
            this.ticker = document.getElementById('flips');
            this.audioController = new AudioController();
        }
    
        startGame() {
            this.totalClicks = 0;
            this.timeRemaining = this.totalTime;
            this.cardToCheck = null;
            this.matchedCards = [];
            this.busy = true;
            setTimeout(() => {
                this.audioController.startMusic();
                this.shuffleCards(this.cardsArray);
                this.countdown = this.startCountdown();
                this.busy = false;
            }, 500)
            this.hideCards();
            this.timer.innerText = this.timeRemaining;
            this.ticker.innerText = this.totalClicks;
        }
        startCountdown() {
            return setInterval(() => {
                this.timeRemaining--;
                this.timer.innerText = this.timeRemaining;
                if(this.timeRemaining === 0)
                    this.gameOver();
            }, 1000);
        }
        gameOver() {
            clearInterval(this.countdown);
            this.audioController.gameOver();
            document.getElementById('game-over-text').classList.add('visible');
        }
        victory() {
            clearInterval(this.countdown);
            this.audioController.victory();
            document.getElementById('victory-text').classList.add('visible');
        }
        hideCards() {
            this.cardsArray.forEach(card => {
                card.classList.remove('visible');
                card.classList.remove('matched');
            });
        }
        flipCard(card) {
            if(this.canFlipCard(card)) {
                this.audioController.flip();
                this.totalClicks++;
                this.ticker.innerText = this.totalClicks;
                card.classList.add('visible');
    
                if(this.cardToCheck) {
                    this.checkForCardMatch(card);
                } else {
                    this.cardToCheck = card;
                }
            }
        }
        checkForCardMatch(card) {
            if(this.getCardType(card) === this.getCardType(this.cardToCheck))
                this.cardMatch(card, this.cardToCheck);
            else 
                this.cardMismatch(card, this.cardToCheck);
    
            this.cardToCheck = null;
        }
        cardMatch(card1, card2) {
            this.matchedCards.push(card1);
            this.matchedCards.push(card2);
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.audioController.match();
            if(this.matchedCards.length === this.cardsArray.length)
                this.victory();
        }
        cardMismatch(card1, card2) {
            this.busy = true;
            setTimeout(() => {
                card1.classList.remove('visible');
                card2.classList.remove('visible');
                this.busy = false;
            }, 1000);
        }
        shuffleCards(cardsArray) {
            for (let i = cardsArray.length - 1; i > 0; i--) {
                const randIndex = Math.floor(Math.random() * (i + 1));
                [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
            }
            cardsArray = cardsArray.map((card, index) => {
                card.style.order = index;
            });
        }
        getCardType(card) {
            return card.getElementsByClassName('card-value')[0].src;
        }
        canFlipCard(card) {
            return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
        }
    }
    
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready()
    }
    
    function ready() {
        let overlays = Array.from(document.getElementsByClassName('overlay-text'));
        let cards = Array.from(document.getElementsByClassName('card'));
        let game = new MixOrMatch(100, cards);
    
        overlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.classList.remove('visible');
                game.startGame();
            });
        });
    
        cards.forEach(card => {
            card.addEventListener('click', () => {
                game.flipCard(card);
            });
        });
    }