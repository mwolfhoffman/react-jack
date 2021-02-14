import "./App.css";
import { Container, Row, Col, Alert, Jumbotron } from "react-bootstrap";
import Header from "./components/header";
import Login from "./components/login";
import { connect } from "react-redux";
import PlayerContainer from "./components/player-container";
import React from 'react';

const mapStateToProps = (state) => ({
  players: state.players,
  gameOver: state.gameOver,
});
const mapDispatchToProps = {};

function App(props) {
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
