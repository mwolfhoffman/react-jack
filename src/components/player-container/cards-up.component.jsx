import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

const mapStateToProps = (state, props) => {
  return {
    cards: props.cards,
  };
};

function CardsUpComponent({ cards }) {
  let [cardsUpTotal, setCardsUpTotal] = useState(0);

  useEffect(() => {
    let cardsUp = cards.filter((card) => card.isUp);
    let cardsUpSum = cardsUp.reduce((total, card) => (total += card.value), 0);
    setCardsUpTotal((current) => (current = cardsUpSum));
  }, [cards]);

  return (
    <Container>
      <Row>Showing: {cardsUpTotal}</Row>
    </Container>
  );
}

export default connect(mapStateToProps, null)(CardsUpComponent);
