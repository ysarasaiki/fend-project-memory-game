// Define Variables
const deck = document.querySelector('.deck')

// List of Icons
const icons = ['flaticon-002-salt-and-pepper', 'flaticon-001-bacon', 'flaticon-005-sausage', 'flaticon-015-beer-can', 'flaticon-027-pinwheel', 'flaticon-018-taco', 'flaticon-034-flower', 'flaticon-032-ladybug']
// List of Cards, with 2 cards per icon
const cards = [];
for (const icon of icons) {
	cards.push(icon);
	cards.push(icon);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Function to shuffle and load deck
function loadDeck() {
	// shuffle cards
	shuffle(cards);

	const fragment = document.createDocumentFragment();

	// loop through each card and create HTML, add to DocumentFragment
	for (const card of cards) {
		const newCard = document.createElement('li');
		newCard.className = 'card';

		const newIcon = document.createElement('i');
		newIcon.className = card;

		newCard.appendChild(newIcon);
		fragment.appendChild(newCard);
	}
	// Add new HTML to the page
	deck.appendChild(fragment);
}

// Load Deck when page initiall loads
loadDeck();

// SETTING UP EVENT LISTENER FOR CLICKING A CARD
// Variables
const allCards = document.querySelectorAll('.card')
let clickCount = 0; // keep track of # of clicks
let openCards = []; // Create list of open cards (open or matched)
let currentMoveCount = 0; // keep track of # of moves
const movesDisplayed = document.querySelector('.moves'); // Move counter displayed

deck.addEventListener('click', function(evt) {
	// make sure target element is the card (not the icon)
	let targetCard = null;

	if (evt.target.nodeName == 'LI') {
		targetCard = evt.target;
	} else if (evt.target.nodeName == 'I') {
		targetCard = evt.target.parentElement;	
	}

	// When first card is clicked, start time
	clickCount == 0 ? startTimer() : null;
	clickCount++

	// If card isn't already matched, open card
	if (!targetCard.classList.contains('match')) {
		openCard(targetCard);
		if (openCards.length % 2 == 0) {
			disableClick(allCards);
			// If there's an even # of cards in the openCards, that counts as a 'move', and check whether it matches the last opened card
			incrementMoves();
			checkMatch(targetCard);
		}
	}
});

function enableClick(cards) {
	for (let card of cards) {
		card.classList.remove('no-click');
	}
}
function disableClick(cards) {
	for (let card of cards) {
		card.classList.add('no-click');
	}
}

// Function that opens card, and adds to the 'Open Card' list
function openCard(card) {
	card.classList.toggle('open');

	let cardIcon = card.firstElementChild.className;
	openCards.push(cardIcon);
}

// Function that checks if the last opened card equals the second to last opened
function checkMatch(card) {
	const lastCard = openCards[openCards.length-1];
	const secondCard = openCards[openCards.length-2];
	
	const pairCards = document.querySelectorAll('.open');

	// TODO: Probably break this up into another function?
	if (lastCard == secondCard) {
		matchCard(pairCards);
	} else {
		noMatch(pairCards);
		openCards.pop();
		openCards.pop();
	}

	setTimeout(function() {
		checkDone(openCards);
	}, 1500);
}

 // if the cards do match, cards should have open characteristics
function matchCard(pairCards) {
	for (const pairCard of pairCards) {
		setTimeout(function() {
			pairCard.classList.add('match');
			pairCard.classList.remove('open');
			enableClick(allCards);
		}, 750);
	}
} 

 // if the cards do match, cards should return no normal (not open)
function noMatch(pairCards) {
	for (const pairCard of pairCards) {
		setTimeout(function() {
			pairCard.classList.add('noMatch');
			pairCard.classList.remove('open');
			setTimeout(function() {
				pairCard.classList.remove('noMatch');
				enableClick(allCards);
			}, 775);
		}, 750);
	}
}

// increment move count
function incrementMoves(currentMoves) {
	currentMoveCount += 1;
	movesDisplayed.innerHTML = currentMoveCount;
	checkStars();
}

// END OF GAME PLAY
// Define Variables
const overlay = document.querySelector('.overlay') // overlay screen
const playAgainButton = document.querySelector('.play-again') // 
const repeaButton = document.querySelector('.fa-sync')


// check if all cards are matched. 
function checkDone(openCards) {
	if (openCards.length == 2) {
		overlay.classList.add('open');
		document.querySelector('.finalMoves').innerHTML = movesDisplayed.innerHTML;
		stopTimer();
		document.querySelector('.finalTime').innerHTML = mins.innerHTML + ':' + secs.innerHTML;
		document.querySelector('.finalStars').innerHTML = starCount;
	}
}

// Reset game when play again is clicked
playAgainButton.addEventListener('click', function() {
	overlay.classList.remove('open');
	reset();	
})

// Reset game when repeat button is clicked
repeaButton.addEventListener('click', function() {
	reset();	
})

// When reset, 
function reset() {
	deck.innerHTML = '';
	currentMoveCount = 0;
	movesDisplayed.innerHTML = currentMoveCount;
	loadDeck();
	resetTimer();
	resetStar();
	openCards = [];
}

// TIMER FUNCTIONALITY
// Define Variables
let t;
let seconds = 0;
let minutes = 0;
let hours = 0;
let secs = document.querySelector('.secs');
let mins = document.querySelector('.mins');

function startTimer() {
	t = setInterval(updateTime, 1000)
}

function stopTimer() {
	clearInterval(t);
}

function resetTimer() {
	clickCount = 0;
	clearInterval(t);
	seconds = 0;
	minutes = 0;
	hours = 0;
	
	mins.innerHTML = '00';
	secs.innerHTML = '00';
}

function updateTime() {
	seconds++;
	
	if (seconds >= 60) {
		minutes++ ;
		seconds = 0;
	}
	mins.innerHTML = (minutes > 9 ? minutes : '0'+minutes);
	secs.innerHTML = (seconds > 9 ? seconds : '0'+seconds);

}

// STAR RATING FUNCTIONALITY
/*Complete in:
	< 13 moves: 3 stars!
	< 20 moves: 2 stars!
	< 27 moves: 1 stars!*/

// Define Variables
let starCount = 3;

function checkStars () {
	if (starCount == 3 && currentMoveCount >= 13) {
		starCount = 2;
		removeStar('star3');
	} else if (starCount == 2 && currentMoveCount >= 27) {
		starCount = 1;
		removeStar('star2');
	}
}

function removeStar(starNum) {
	let star = document.getElementById(starNum);
	star.className = 'far fa-star';
}

function resetStar() {
	allStars = document.querySelectorAll('.fa-star');
	for (const star of allStars) {
		star.className = 'fa fa-star';
	}
}