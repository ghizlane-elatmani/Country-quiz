import React, { useContext } from "react";
import "../styles/Menu.css";
import { QuizContext } from "../context/QuizContext";
import undrawAdventure from "../img/undraw_adventure.svg";

const Menu = () => {
  const { setGameState } = useContext(QuizContext);
  const { isLoaded } = useContext(QuizContext);

  return (
    <div className="Menu">
      <div className="menu-intro">
        <img src={undrawAdventure} alt="" />
        <h2 className="heading-2">Welcome !</h2>
      </div>
      {isLoaded && (
        <button className="btn" onClick={() => setGameState("quiz")}>
          Start the quiz
        </button>
      )}
    </div>
  );
};

export default Menu;
