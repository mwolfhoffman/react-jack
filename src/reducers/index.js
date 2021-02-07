import actions from "../actions";
import ScoreService from "../services/score.service";

const initialState = {
  players: [],
  decks: [],
  gameOver: false,
};

export default function appReducer(state = initialState, action) {
  console.log(`ACTION: [${action.type}]`);
  switch (action.type) {
    case actions.ADD_PLAYER:
      return { ...state, players: [...state.players, action.payload] };
    case actions.START_DECK:
      return {
        ...state,
        players: [
          ...state.players.map((player) => {
            player.cards = action.payload.splice(0, 2);
            player.cards[0].isUp = true;
            return player;
          }),
        ],
        decks: [[...action.payload]],
      };
    case actions.CREATE_STANDARD_DECK:
      return {
        ...state,
        players: [
          ...state.players.map((player) => {
            player.cards = action.payload.splice(0, 2);
            player.cards.forEach((card) => (card.isUp = true)); // Each players cards start face up
            return player;
          }),
        ],
        decks: [[...action.payload]],
      };

    case actions.UPDATE_CARD:
      return {
        ...state,
        players: [
          ...state.players.map((player) => {
            if (player.id === action.payload.playerId) {
              let cardToUpdateIndex = player.cards.findIndex(
                (card) => card.id === action.payload.card.id
              );
              player.cards[cardToUpdateIndex] = action.payload.card;
              return player;
            } else {
              return player;
            }
          }),
        ],
      };

    case actions.PLAYER_HOLD:
      let winningPlayerIds = ScoreService.findWinningPlayerIds(state.players);
      return {
        ...state,
        players: [
          ...state.players.map((player) => {
            return winningPlayerIds.includes(player.id)
              ? {
                  ...player,
                  score: player.score + 1,
                }
              : { ...player };
          }),
        ],
      };
    case actions.DEAL_NEXT_ROUND:
      return {
        ...state,
        players: [
          ...state.players.map((player) => {
            player.cards = [...state.decks][0].splice(0, 2);
            player.cards[0].isUp = true;
            return player;
          }),
        ],
      };
    case actions.PLAYER_BUST:
      return {
        ...state,
        players: [
          ...state.players.map((player) => {
            if (player.id !== action.payload.playerId) {
              return { ...player, score: player.score + 1 };
            } else {
              return player;
            }
          }),
        ],
      };

    case actions.PLAYER_HIT:
      return {
        ...state,
        players: [
          ...state.players.map((player) => {
            if (player.id === action.payload.playerId) {
              let nextCard = [...state.decks[0]][0];
              nextCard.isUp = true;
              return {
                ...player,
                cards: [...player.cards, nextCard],
              };
            } else {
              return { ...player };
            }
          }),
        ],
        decks: [[...state.decks][0].slice(1)],
      };
    case actions.SET_GAME_OVER:
      return { ...state, gameOver: true };
    case actions.START_DEALER_TURN:
    //  TODO: Need to check if dealer will hit or hold.
    //  Need to be able to communicate if next round should start.
    default:
      return { ...state };
  }
}
