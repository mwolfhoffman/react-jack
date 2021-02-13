import reducer from "../reducers";
import actions from "../actions";
import Card from "../models/cards";
import Player from "../models/player";

let initialState = {
  players: [],
  decks: [],
  gameOver: false,
};

describe("Reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_PLAYER", () => {
    const act = reducer(initialState, {
      type: actions.ADD_PLAYER,
      payload: "Test Player",
    });
    expect(act.players.length).toEqual(1);
  });

  it("create standard deck places 2 face up cards", () => {
    let fakeDeck = [
      new Card(10, "Hearts"),
      new Card(4, "Spades"),
      new Card(2, "Diamonds"),
    ];

    let fakeState = { ...initialState, players: [new Player("Tester")] };

    const act = reducer(fakeState, {
      type: actions.CREATE_STANDARD_DECK,
      payload: fakeDeck,
    });
    expect(act.players.length).toEqual(1);
    expect(act.players[0].cards.length).toEqual(2);

    act.players[0].cards.forEach((card) => {
      expect(card.isUp).toBe(true);
    });
  });
});
