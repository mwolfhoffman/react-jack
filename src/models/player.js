import { v4 as uuidv4 } from "uuid";
import constants from "./constants";

export default class Player {
  constructor(username) {
    this.id = uuidv4();
    this.username = username;
    this.score = 0;
    this.cards = [];
    this.isDealer = username === constants.DEALER;
    this.roundOver = false;
  }
}
