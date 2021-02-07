import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import ScoreComponent from "./score.component";
import DeckService from "../../services/deck.service";
import TotalComponent from "./total.component";

const mapStateToProps = (state, props) => ({
  players: state.players,
  player: state.players.find((player) => player.id === props.playerId),
  decks: state.decks,
  gameOver: state.gameOver,
});
const mapDispatchToProps = {
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
  const triggerHit = () => {
    props.hit({ playerId: props.player.id });
  };

  const triggerHold = () => {
    props.hold({
      playerId: props.player.id,
    });
    props.dealNextRound();
  };

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
      <Row>
        <TotalComponent playerId={props.player.id} />
      </Row>
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
      {!props.player.isDealer && !props.gameOver ? (
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
