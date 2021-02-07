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

const mapDispatchToProps = () => {
  return {};
};

function ScoreComponent({ score }) {
  return (
    <div>
      <span>
        <b>Score: </b> {score}
      </span>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreComponent);
