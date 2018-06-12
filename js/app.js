/*
 * Create a list that holds all of your cards
 */
const icons = ["flaticon-002-salt-and-pepper", "flaticon-001-bacon", "flaticon-005-sausage", "flaticon-015-beer-can", "flaticon-027-pinwheel", "flaticon-018-taco", "flaticon-034-flower", "flaticon-032-ladybug"]

const cards = new Array();
for (const icon of icons) {
	cards.push(icon);
	cards.push(icon);
}

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
shuffle(cards);

const fragment = document.createDocumentFragment();
for (const card of cards) {
	const newCard = document.createElement('li');
	newCard.className = 'card'

	const newIcon = document.createElement('i');
	newIcon.className = card;

	newCard.appendChild(newIcon);
	fragment.appendChild(newCard);
}

document.querySelector('.deck').appendChild(fragment);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
*/
/* - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
/*
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
