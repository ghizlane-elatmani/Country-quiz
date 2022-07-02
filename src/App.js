import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import EndScreen from "./components/EndScreen";
import { QuizContext } from "./context/QuizContext";
import "./styles/App.css";
import { getCountries } from "./context/QuestionBank";
import Footer from "./components/Footer";

function App() {
  const [gameState, setGameState] = useState("menu");
  const [questionList, setQuestionList] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    getCountries()
      .then((it) => {
        setQuestionList(it);
        setIsLoaded(true);
      })
      .catch((err) => console.log("err: ", err));
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="heading-1">country quiz</h1>

        <QuizContext.Provider
          value={{
            gameState,
            setGameState,
            questionList,
            setQuestionList,
            score,
            setScore,
            isLoaded,
            currentQuestion,
            setCurrentQuestion,
          }}
        >
          {gameState === "menu" && <Menu />}
          {gameState === "quiz" && <Quiz />}
          {gameState === "endScreen" && <EndScreen />}
        </QuizContext.Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
