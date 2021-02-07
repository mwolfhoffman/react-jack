import { useEffect, useState } from "react";
import { connect } from "react-redux";
import constants from "../../models/constants";
import actions from "../../actions";
import { Container, Row, Col } from "react-bootstrap";

const mapStateToProps = (state, props) => {
  return {
    player: state.players.find((player) => player.id === props.playerId),
  };
};

const mapDispatchToProps = {
  updateCardValue: (payload) => {
    return {
      type: actions.UPDATE_CARD,
      payload,
    };
  },
  playerBust: (payload) => {
    return {
      type: actions.PLAYER_BUST,
      payload,
    };
  },
  dealNextRound: () => {
    return { type: actions.DEAL_NEXT_ROUND, payload: null };
  },
  userHasTwentyOne: (payload) => {
    return {
      type: actions.PLAYER_HOLD,
      payload,
    };
  },
};

function TotalComponent(props) {
  let [total, setTotal] = useState(0);

  const userHasAce = (cards) => {
    return !!cards.find((card) => card.name === constants.cardNames.ACE);
  };

  const calculateTotal = (cards) => {
    let total = cards.reduce((total, card) => {
      return (total += card.value);
    }, 0);

    if (userHasAce(cards)) {
      let ace = cards.find((card) => card.name === constants.cardNames.ACE);
      if (total > 21) {
        props.updateCardValue({
          playerId: props.player.id,
          card: { ...ace, value: 1 },
        });
      }
    }
    return total;
  };

  useEffect(() => {
    setTotal(
      (currentTotal) => (currentTotal = calculateTotal(props.player.cards))
    );
  }, [props.player.cards]);

  useEffect(() => {
    if (total === 21) {
      props.userHasTwentyOne({ playerId: props.player.id });
      props.dealNextRound();
      setTotal((current) => (current = 0));
    }
    if (total > 21) {
      props.playerBust({ playerId: props.player.id });
      props.dealNextRound();
      setTotal((current) => (current = 0));
    }
  }, [total]);

  return (
    <Container>
      <Row>
        <div>Total: {total}</div>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalComponent);
