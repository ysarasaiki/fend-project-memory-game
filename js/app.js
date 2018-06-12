/*
 * Create a list that holds all of your cards
 */
const icons = ["flaticon-002-salt-and-pepper","flaticon-002-salt-and-papper","flaticon-002-salt-and-pepper","flaticon-002-salt-and-pepper","flaticon-002-salt-and-pepper","flaticon-002-salt-and-pepper","flaticon-002-salt-and-pepper","flaticon-002-salt-and-pepper"]

const icons2 = ["flaticon-002-salt-and-pepper", "flaticon-001-bacon", "flaticon-005-sausage", "flaticon-015-beer-can", "flaticon-027-pinwheel", "flaticon-018-taco", "flaticon-034-flower", "flaticon-032-ladybug"]

// const cards = new Array();
// for (const icon of icons) {
// 	cards.push(icon);
// 	cards.push(icon);
// }

/* Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
// shuffle(cards);
const cards = [1,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

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

document.querySelector('.deck').appendChild(fragment);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
*/
function closeCard(card) {
	card.classList.toggle('open');
	showCard(card);
}
document.querySelector('.deck').addEventListener('click', function(evt) {
	let targetCard = null;
	if (evt.target.nodeName == 'LI') {
		targetCard = evt.target;
	} else if (evt.target.nodeName == "I") {
		targetCard = evt.target.parentElement;	
	}

	// If card isn't already matched
	if (!targetCard.classList.contains('match')) {
		openCard(targetCard);
		if (openCards.length % 2 == 0) {
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
	}
}

// if the list already has another card, check to see if the two cards match
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
			pairCard.classList.remove('open');
		}, 750);
	}
}

/*
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
