import ScoreService from "../services/score.service";
import { act } from "react-dom/test-utils";
import Card from "../models/cards";

describe("score.service.js", () => {
  it("Returns correct result when one winnter", () => {
    let players = [
      {
        id: "1",
        cards: [new Card(1)],
      },
      {
        id: "2",
        cards: [new Card(2)],
      },
    ];
    act(function () {
      let winnerIds = ScoreService.findWinningPlayerIds(players);
      expect(winnerIds.length).toBe(1);
      expect(winnerIds[0]).toBe("2");
    });
  });

  it("Returns both player IDs if tie", () => {
    let players = [
      {
        id: "1",
        cards: [new Card(10)],
      },
      {
        id: "2",
        cards: [new Card(10)],
      },
    ];
    act(function () {
      let winnerIds = ScoreService.findWinningPlayerIds(players);
      expect(winnerIds.length).toBe(2);
    });
  });
});
