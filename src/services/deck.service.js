import Card from "../models/cards";
import constants from "../models/constants";

export default class DeckService {
  static createCardForEachSuit(cardNumber, cardName = null, deck) {
    let suits = Object.values(constants.cardSuit);
    suits.forEach((suit) => {
      deck.push(new Card(cardNumber, suit, cardName));
    });
  }

  static shuffleDeck(deck) {
    let i = deck.length;
    while (i--) {
      const ri = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[ri]] = [deck[ri], deck[i]];
    }
    return deck;
  }

  static createStandardDeck() {
    let deck = [];

    //  Generate numbered card in standard deck.
    let number = 2;
    while (number <= 10) {
      this.createCardForEachSuit(number, null, deck);
      number++;
    }

    //  Gerenate face cards for standard deck.
    Object.values(constants.cardNames).forEach((faceCardName) => {
      this.createCardForEachSuit(10, faceCardName, deck);
    });
    console.log("deck was created and shuffled");
    let shuffledDeck = this.shuffleDeck(deck);
    return shuffledDeck;
  }
}
