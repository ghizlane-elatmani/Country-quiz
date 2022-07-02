import React, { useEffect, useState, useContext, useRef } from "react";
import { QuizContext } from "../context/QuizContext";
import { MdCheckCircleOutline, MdHighlightOff } from "react-icons/md";
import undrawAdventure from "../img/undraw_adventure.svg";
import "../styles/Quiz.css";

const Quiz = () => {
  // USE CONTEXT
  const {
    setGameState,
    questionList,
    score,
    setScore,
    currentQuestion,
    setCurrentQuestion,
  } = useContext(QuizContext);

  // USE STATE
  const [buttonClicked, setButtonClicked] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [isItGoodAnswer, setIsItGoodAnswer] = useState(false);

  const [answer, setAnswer] = useState(questionList[currentQuestion].answer);
  const [optionA, setOptionA] = useState(questionList[currentQuestion].optionA);
  const [optionB, setOptionB] = useState(questionList[currentQuestion].optionB);
  const [optionC, setOptionC] = useState(questionList[currentQuestion].optionC);
  const [optionD, setOptionD] = useState(questionList[currentQuestion].optionD);

  // USE REF
  const btnA = useRef();
  const btnB = useRef();
  const btnC = useRef();
  const btnD = useRef();

  // USE EFFECT
  useEffect(() => {
    // CHANGE THE ANSWER AND THE OPTIONS
    setAnswer(questionList[currentQuestion].answer);
    setOptionA(questionList[currentQuestion].optionA);
    setOptionB(questionList[currentQuestion].optionB);
    setOptionC(questionList[currentQuestion].optionC);
    setOptionD(questionList[currentQuestion].optionD);
  }, [questionList, currentQuestion]);

  const answerHandler = (option, btn) => {
    if (option === answer) {
      btn.current.classList.add("btn-green");

      setScore(score + 1);
      setIsItGoodAnswer(true);
    } else {
      btn.current.classList.add("btn-red");
      showTheRightAnswer();
      setIsItGoodAnswer(false);
    }
    setShowNext(true);
  };

  const showTheRightAnswer = () => {
    if (optionA === answer) {
      btnA.current.classList.add("btn-green");
    }
    if (optionB === answer) {
      btnB.current.classList.add("btn-green");
    }
    if (optionC === answer) {
      btnC.current.classList.add("btn-green");
    }
    if (optionD === answer) {
      btnD.current.classList.add("btn-green");
    }
  };

  const showNextQuestionOrEndScreen = () => {
    if (isItGoodAnswer) {
      // CHANGE THE CURRENT QUESTION
      setCurrentQuestion(currentQuestion + 1);
      setShowNext(false);
      setButtonClicked("");

      // REMOVE ALL THE CLASSES
      btnA.current.classList.remove("btn-green");
      btnA.current.classList.remove("btn-red");
      btnB.current.classList.remove("btn-green");
      btnB.current.classList.remove("btn-red");
      btnC.current.classList.remove("btn-green");
      btnC.current.classList.remove("btn-red");
      btnD.current.classList.remove("btn-green");
      btnD.current.classList.remove("btn-red");
    } else {
      setGameState("endScreen");
    }
  };

  return (
    <div className="Quiz">
      <img className="quiz-img" src={undrawAdventure} alt="" />
      {/* QUESTION */}
      {questionList[currentQuestion].flag !== "" ? (
        <p className="flag">{questionList[currentQuestion].flag}</p>
      ) : (
        ""
      )}
      <h3>{questionList[currentQuestion].question}</h3>

      {/* OPTIONS */}
      <div className="options">
        {/* BTN OPTION A */}
        <button
          ref={btnA}
          className="btn-light"
          onClick={() => {
            setButtonClicked("optionA");
            answerHandler(optionA, btnA);
          }}
        >
          <p className="btn-option">A</p>
          <p>{optionA}</p>

          <p>
            {buttonClicked === "optionA" ? (
              optionA !== answer ? (
                <MdHighlightOff />
              ) : null
            ) : null}
            {showNext && optionA === answer ? <MdCheckCircleOutline /> : null}
          </p>
        </button>

        {/* BTN OPTION B */}
        <button
          ref={btnB}
          className="btn-light"
          onClick={() => {
            setButtonClicked("optionB");
            answerHandler(optionB, btnB);
          }}
        >
          <p className="btn-option">B</p>
          <p>{optionB}</p>
          <p>
            {buttonClicked === "optionB" ? (
              optionB !== answer ? (
                <MdHighlightOff />
              ) : null
            ) : null}
            {showNext && optionB === answer ? <MdCheckCircleOutline /> : null}
          </p>
        </button>

        {/* BTN OPTION C */}
        <button
          ref={btnC}
          className="btn-light"
          onClick={() => {
            setButtonClicked("optionC");
            answerHandler(optionC, btnC);
          }}
        >
          <p className="btn-option">C</p>
          <p>{optionC}</p>
          <p>
            {buttonClicked === "optionC" ? (
              optionC !== answer ? (
                <MdHighlightOff />
              ) : null
            ) : null}
            {showNext && optionC === answer ? <MdCheckCircleOutline /> : null}
          </p>
        </button>

        {/* BTN OPTION D */}
        <button
          ref={btnD}
          className="btn-light"
          onClick={() => {
            setButtonClicked("optionD");
            answerHandler(optionD, btnD);
          }}
        >
          <p className="btn-option">D</p>
          <p>{optionD}</p>
          <p>
            {buttonClicked === "optionD" ? (
              optionD !== answer ? (
                <MdHighlightOff />
              ) : null
            ) : null}
            {showNext && optionD === answer ? <MdCheckCircleOutline /> : null}
          </p>
        </button>
      </div>

      {/* BTN SHOW NEXT QUESTION OR NAVIGATION TO THE END SCREEEN */}
      {showNext && (
        <div className="next">
          <button
            onClick={showNextQuestionOrEndScreen}
            className="btn-light btn-next"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
