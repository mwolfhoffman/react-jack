import "./App.css";
import { Container, Row, Col, Alert, Jumbotron } from "react-bootstrap";
import Header from "./components/header";
import Login from "./components/login";
import { connect } from "react-redux";
import PlayerContainer from "./components/player-container";
import React, { useEffect } from "react";
import actions from "./actions";
import constants from "./models/constants";

const mapStateToProps = (state) => ({
  players: state.players,
  gameOver: state.gameOver,
});
const mapDispatchToProps = {
  updateScore: () => {
    return { type: actions.UPDATE_SCORE, payload: null };
  },
  dealNextRound: () => {
    return { type: actions.DEAL_NEXT_ROUND, payload: null };
  },
  hit: (payload) => {
    return {
      type: actions.PLAYER_HIT,
      payload,
    };
  },
  dealerHold: () => {
    return {
      type: actions.DEALER_HOLD,
    };
  },
};

function App(props) {
  useEffect(() => {
    let dealer = null;
    if (props.players && props.players.length > 1) {
      dealer = props.players.find(
        (player) => player.username === constants.DEALER
      );
    } else {
      dealer = null;
    }
    if (!dealer) {
      return;
    }
    let dealerShouldHitAgain =
      dealer &&
      !dealer.roundOver &&
      props.players.find((player) => player.username !== constants.DEALER)
        .roundOver;

    let dealerTotal = dealer
      ? dealer.cards.reduce((total, card) => {
          return (total += card.value);
        }, 0)
      : 0;
    let roundIsOver =
      props.players &&
      props.players.length > 1 &&
      props.players.filter((player) => player.roundOver).length ===
        props.players.length;
    if (roundIsOver) {
      props.updateScore();
      props.dealNextRound();
    } else if (dealerShouldHitAgain && dealerTotal < 16) {
      setTimeout(() => {
        props.hit({
          playerId: props.players.find(
            (player) => player.username === constants.DEALER
          ).id,
        });
      }, 1000);
    } else if (dealerTotal > 15 && !dealer.roundOver) {
      props.dealerHold();
    }
  }, [props.players]);

  return (
    <Container>
      {props.gameOver ? (
        <Alert key="game-over-alert" variant="primary">
          GAME OVER!
        </Alert>
      ) : null}
      <Jumbotron>
        <Row>
          <Col>
            {props.players && !props.players.length ? <Header /> : null}
          </Col>
        </Row>
        {props.players && !props.players.length ? (
          <Row>
            <Login />
          </Row>
        ) : (
          <Row className="player-flex-container">
            {props.players.map((player) => {
              return (
                <Col key={player.id}>
                  <PlayerContainer playerId={player.id} />
                </Col>
              );
            })}
          </Row>
        )}
      </Jumbotron>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
