import constants from "./constants";
import { v4 as uuidv4 } from "uuid";

export default class Card {
  constructor(value, suit, name = null, isUp = false) {
    this.id = uuidv4();
    this.suit = suit;
    this.name = name;
    this.value = name === constants.cardNames.ACE ? 11 : value; // For now, defaulting Ace to 11 instead of 1.
    this.isUp = isUp;
  }
}
