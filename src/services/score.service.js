export default class ScoreService {

  static findWinningPlayerIds(players) {
    let winningPlayerIds = [];
    let topTotal = 0;
    players.forEach((player) => {
      let playerTotal = player.cards.reduce((total, card) => total + card.value, 0);
      if (playerTotal > topTotal) {
        topTotal = playerTotal;
        winningPlayerIds = [player.id];
      } else if (playerTotal === topTotal) {
        winningPlayerIds.push(player.id);
      }
    });

    return winningPlayerIds;
  }
}
