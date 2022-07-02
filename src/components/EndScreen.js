import React, { useContext } from "react";
import "../styles/EndScreen.css";
import { QuizContext } from "../context/QuizContext";
import undrawWinners from "../img/undraw_winners.svg";

const EndScreen = () => {
  const { setGameState, score, setScore } = useContext(QuizContext);

  const restartGame = () => {
    setGameState("menu");
    setScore(0);
  };

  return (
    <div className="EndScreen">
      <img src={undrawWinners} alt="" />
      <div className="results-wrapper">
        <h2 className="results">Results</h2>
        <p className="score">
          You got <span>{score}</span> correct answers
        </p>
      </div>
      <button className="btn-outline-blue" onClick={restartGame}>
        Try again
      </button>
    </div>
  );
};

export default EndScreen;
