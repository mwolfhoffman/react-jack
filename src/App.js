import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/header";
import Login from "./components/login";
import { connect } from "react-redux";
import PlayerContainer from "./components/player-container";

const mapStateToProps = (state) => ({
  players: state.players,
});
const mapDispatchToProps = {};

function App(props) {
  return (
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      {props.players && !props.players.length ? (
        <Row>
          <Login />
        </Row>
      ) : (
        <Row>
          {props.players.map((player) => {
            return (
              <Col key={player.id}>
                <PlayerContainer playerId={player.id} />
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
