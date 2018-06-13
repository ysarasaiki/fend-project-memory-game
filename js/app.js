// Create a list that holds all of your cards
const icons = ["flaticon-002-salt-and-pepper", "flaticon-001-bacon", "flaticon-005-sausage", "flaticon-015-beer-can", "flaticon-027-pinwheel", "flaticon-018-taco", "flaticon-034-flower", "flaticon-032-ladybug"]

const cards = new Array();
for (const icon of icons) {
	cards.push(icon);
	cards.push(icon);
}

/* Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page */

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

const deck = document.querySelector('.deck')

function loadDeck() {
	shuffle(cards);

	const fragment = document.createDocumentFragment();

	for (const i in cards) {
		const newCard = document.createElement('li');
		newCard.className = 'card';

		const newIcon = document.createElement('i');
		newIcon.className = cards[i];
		newIcon.id = i;

		newCard.appendChild(newIcon);
		fragment.appendChild(newCard);
	}

	deck.appendChild(fragment);
}

loadDeck();

/* set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)*/
function closeCard(card) {
	card.classList.toggle('open');
	showCard(card);
}

deck.addEventListener('click', function(evt) {
	let targetCard = null;
	if (evt.target.nodeName == 'LI') {
		targetCard = evt.target;
	} else if (evt.target.nodeName == "I") {
		targetCard = evt.target.parentElement;	
	}

	// If card isn't already matched, open card
	if (!targetCard.classList.contains('match')) {
		openCard(targetCard);
		if (openCards.length % 2 == 0) {
			incrementMoves();
			checkMatch(targetCard);
		}
	}
});

// Create list of open cards (open or matched)
let openCards = new Array();

/* - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
function openCard(card) {
	card.classList.toggle('open');

	let cardIcon = card.firstElementChild.className;
	openCards.push(cardIcon);
}

function checkMatch(card) {
	const lastCard = openCards[openCards.length-1];
	const secondCard = openCards[openCards.length-2];
	
	const pairCards = document.querySelectorAll('.open');

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

 // if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
function matchCard(pairCards) {
	for (const pairCard of pairCards) {
		setTimeout(function() {
			pairCard.classList.add('match');
			pairCard.classList.remove('open');
		}, 750);
	}
} 

function noMatch(pairCards) {
	for (const pairCard of pairCards) {
		setTimeout(function() {
			pairCard.classList.add('noMatch');
			pairCard.classList.remove('open');
			setTimeout(function() {
				pairCard.classList.remove('noMatch');
			}, 775);
		}, 750);
	}
}

 /*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one) */
let currentMoveCount = 0;

function incrementMoves(currentMoves) {
	currentMoveCount += 1;
	document.querySelector('.moves').innerHTML = currentMoveCount;
}

 /*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function checkDone(openCards) {
	if (openCards.length == 16) {
		document.querySelector('.overlay').classList.add('open');
		document.querySelector('.finalMoves').innerHTML = document.querySelector('.moves').innerHTML;
	}
}

document.querySelector('.play-again').addEventListener('click',function() {
	document.querySelector('.overlay').classList.remove('open');
	reset();	
})

document.querySelector('.fa-repeat').addEventListener('click',function() {
	reset();	
})

function reset() {
	deck.innerHTML = '';
	document.querySelector('.moves').innerHTML = 0;
	loadDeck();
}