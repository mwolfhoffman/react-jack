import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import constants from "../../models/constants";
import { connect } from "react-redux";
import actions from "../../actions";
import ScoreComponent from "./score.component";
import DeckService from "../../services/deck.service";
import TotalComponent from "./total.component";

const mapStateToProps = (state, props) => ({
  players: state.players,
  player: state.players.find((player) => player.id === props.playerId),
  decks: state.decks,
});
const mapDispatchToProps = {
  updateCardValue: (payload) => {
    return {
      type: actions.UPDATE_CARD,
      payload,
    };
  },
  hit: (payload) => {
    return {
      type: actions.PLAYER_HIT,
      payload,
    };
  },
  hold: (payload) => {
    return {
      type: actions.PLAYER_HOLD,
      payload,
    };
  },
  dealNextRound: () => {
    return { type: actions.DEAL_NEXT_ROUND, payload: null };
  },
  twentyOneOnFirstRound(playerId) {
    return {
      type: actions.TWENTY_ONE_FIRST_ROUND,
      payload: playerId,
    };
  },
  createStandardDeck: () => {
    let newDeck = DeckService.createStandardDeck();
    return { type: actions.START_DECK, payload: newDeck };
  },
};

const PlayerContainer = (props) => {
  const [total, setTotal] = useState(0);

  const userHasAce = (cards) => {
    //  TODO: handle possibility of multiple aces.
    return !!cards.find((card) => card.name === constants.cardNames.ACE);
  };

  const triggerHit = () => {
    props.hit({ playerId: props.player.id });
  };

  const triggerHold = () => {
    props.hold({
      playerId: props.player.id,
    });
    props.dealNextRound();
  };

  const calculateTotal = (cards) => {
    let total = cards.reduce((total, card) => {
      return (total += card.value);
    }, 0);

    if (userHasAce(cards)) {
      let ace = cards.find((card) => card.name === constants.cardNames.ACE);
      if (total > 21) {
        //  By default, Ace's value is 11.
        //  If total is over 21, we will set the Ace's value to 1.
        props.updateCardValue({
          playerId: props.player.id,
          card: { ...ace, value: 1 },
        });
      }
    }
    return total;
  };

  const userHasTwentyOne = (cards) => {
    return calculateTotal(cards) === 21;
  };

  useEffect(() => {
    setTotal((currentTotal) => {
      if (!currentTotal) {
        currentTotal = 0;
      }
      const cards = props.player.cards;
      let newTotal = calculateTotal(cards);
      if (Number.isNaN(newTotal)) {
        throw new Error("New total is not a number.");
      }
      if (userHasTwentyOne(cards)) {
        currentTotal = 21;
        props.twentyOneOnFirstRound(props.player.id);
        return props.dealNextRound();
      }
      currentTotal = newTotal;
      console.log("Total: ", currentTotal);
    });
  }, [props.player.cards]);

  const notEnoughCardForNextRound = () => {
    if (!props || !props.players) {
      return false;
    }
    const cardsNeeded = props.players.length * 2;
    if (
      props &&
      props.decks &&
      props.decks[0] &&
      props.decks[0].length < cardsNeeded
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (notEnoughCardForNextRound()) {
      props.createStandardDeck();
    }
  }, [props.decks, notEnoughCardForNextRound]);

  return (
    <Container className="text-center center player-container">
      <Row className="text-center">
        <h3>{props.player.username}</h3>
      </Row>
      <Row>
        <ScoreComponent playerId={props.player.id} />
      </Row>
      {/* <Row>
        <TotalComponent total={total} />
      </Row> */}
      <Row>
        {props.player.cards.map((card) => {
          return (
            <div key={card.id}>
              <Col>
                <span className="card-container-key">Card:</span>
                <span className="card-container-value">
                  {card.name || card.value}
                </span>
                <span className="card-container-key">Suit: </span>
                <span className="card-container-value">{card.suit}</span>
              </Col>
            </div>
          );
        })}
      </Row>
      {!props.player.isDealer ? (
        <Row>
          <Col>
            <Button onClick={triggerHit}> Hit </Button>
          </Col>
          <Col>
            <Button onClick={triggerHold}> Hold </Button>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
