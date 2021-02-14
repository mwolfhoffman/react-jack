
import React from 'react';
import { connect } from "react-redux";
import actions from "../../actions";
import { useEffect } from "react";

const mapStateToProps = (state, props) => {
  let player = state.players.find((player) => player.id === props.playerId);
  return {
    score: player.score,
    playerId: props.playerId,
  };
};

const mapDispatchToProps={
    gameOver: () => {
      return {
        type: actions.SET_GAME_OVER,
      };
  }
};

function ScoreComponent(props) {

  useEffect(() => {
    if (props.score >= 20) {
      props.gameOver();
    }
  }, [props.score]);

  return (
    <div>
      <span>
        <b>Score: </b> {props.score}
      </span>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreComponent);
