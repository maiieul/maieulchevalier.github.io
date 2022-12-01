let time = 0;
let cardCounter = 0;
let card1, card2, text1, text2;
let moves = document.getElementById("moves");
let movesCounter = 0;
let twoCardsFlipped = false;
let container = document.getElementById("container");
let cards = document.getElementsByClassName("card");
const button = document.querySelector("button");
const year = document.getElementById("year");

year.innerHTML = new Date().getFullYear();

// TIMER
const timer = () => {
  var interval = setInterval(function () {
    document.getElementById("timer").innerHTML = ++time;

    if (time >= 200) {
      document.getElementById("timer").innerHTML = "Time Out";
      clearInterval(interval);
      setTimeout(() => {
        resetDeck();
      }, 500);
    }
  }, 1000);
};
timer();

// COMPARE TWO CARDS

const shuffleDiv = (container) => {
  for (let i = container.children.length; i >= 0; i--) {
    container.appendChild(container.children[(Math.random() * i) | 0]); // this function sorts my divs randomly (found online)
  }
  return container.children;
};
shuffleDiv(container);

const compareTwoCards = () => {
  for (let i = 0, len = cards.length; i < len; i++) {
    const revealCard = () => {
      cards[i].classList.toggle("cardOnClick");
      setTimeout(() => {
        cards[i].children[0].classList.toggle("invisible");
      }, 250);
    };
    const comparator = () => {
      if (twoCardsFlipped) return; // cannot click on another card while two cards are already flipped
      movesCounter += 1;
      moves.innerHTML = movesCounter;
      if (cardCounter === 0) {
        cardCounter = cardCounter + 1;
        revealCard();
        text1 = cards[i].textContent;
        card1 = cards[i]; // gives card1 the value of the first card that is clicked
      } else if (cardCounter === 1 && card1 === cards[i]) {
        // this statement is true when you try to click again on the first card you revealed, and just re-returns it.
        cardCounter = 0;
        revealCard();
      } else if (cardCounter === 1) {
        cardCounter = cardCounter + 1;
        revealCard();
        text2 = cards[i].textContent;
        card2 = cards[i]; // gives card2 the value of the second card that is clicked
      }
      if (cardCounter >= 2 && text1 !== text2) {
        // since cards are objects, must use text1 and text2 to compare them. two objects that seem identical will return false when compared.
        twoCardsFlipped = true;
        setTimeout(() => {
          // debugger;
          card1.classList.toggle("cardOnClick");
          setTimeout(() => {
            card1.children[0].classList.toggle("invisible");
          }, 250);
          card2.classList.toggle("cardOnClick");
          setTimeout(() => {
            card2.children[0].classList.toggle("invisible");
            twoCardsFlipped = false;
          }, 250);
          cardCounter = 0;
        }, 500);
      } else if (cardCounter >= 2 && text1 === text2) {
        cardCounter = 0;
        setTimeout(() => {
          card1.classList.add("invisible");
          card2.classList.add("invisible");
        }, 100);
      }
    };
    cards[i].addEventListener("click", comparator);
  }
};
compareTwoCards();

// RESET BUTTON

const resetDeck = () => {
  for (let i = 0, len = cards.length; i < len; i++) {
    if (cards[i].className === "zone card blue cardOnClick invisible") {
      cards[i] = cards[i].classList.remove("cardOnClick");
      cards[i] = cards[i].classList.toggle("invisible");
      cards[i].children[0].classList.toggle("invisible");
    }
  }
  setTimeout(() => {
    location.reload();
  }, 500);
};

button.addEventListener("click", resetDeck);
