import DeckService from "../services/deck.service";
import { act } from "react-dom/test-utils";
import constants from "../models/constants";

describe("deck.service.js", () => {
  it("Create standard deck returns 52 cards.", () => {
    act(function () {
      let cards = DeckService.createStandardDeck();
      expect(cards.length).toBe(52);
    });
  });

  it("All suits have correct amount of cards", () => {
    act(function () {
      let cards = DeckService.createStandardDeck();
      expect(
        cards.filter((card) => card.suit === constants.cardSuit.CLUBS).length
      ).toBe(13);

      expect(
        cards.filter((card) => card.suit === constants.cardSuit.SPADES).length
      ).toBe(13);

      expect(
        cards.filter((card) => card.suit === constants.cardSuit.HEARTS).length
      ).toBe(13);

      expect(
        cards.filter((card) => card.suit === constants.cardSuit.DIAMONDS).length
      ).toBe(13);
    });
  });

  it("No card appears more than once", () => {
    act(function () {
      let cards = DeckService.createStandardDeck();
      let set = new Set(cards);
      expect(set.size).toBe(52);
    });
  });
});
