import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { connect } from "react-redux";
import actions from "../actions";
import Player from "../models/player";
import { useState } from "react";
import DeckService from "../services/deck.service";
import constants from '../models/constants';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  addUser: (username) => {
    return {
      type: actions.ADD_PLAYER,
      payload: new Player(username),
    };
  },

  createStandardDeck: () => {
    let standardDeck = DeckService.createStandardDeck();
    return {
      type: actions.CREATE_STANDARD_DECK,
      payload: standardDeck,
    };
  },
};

const Login = (props) => {
  let [username, setUsername] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    props.addUser(username);
    props.addUser(constants.DEALER);
    props.createStandardDeck();
    setUsername((current) => (current = ""));
  };

  return (
    <Container>
      <Row>
        <Col xs={2}></Col>
        <Col className="center" xs={8}>
          <Form onSubmit={(event) => handleLogin(event)}>
            <Form.Group>
              <Form.Label>What Should We Call You?</Form.Label>
              <Form.Control
                type="text"
                max="100"
                placeholder="Username"
                onChange={(event) => {
                  setUsername((current) => (current = event.target.value));
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Start Playing!
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
