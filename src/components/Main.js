import Quiz from "./Quiz";
import Start from "./Start";
import Result from "./Result";
import { useEffect } from "react";

const Main = ({ state, dispatch }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("state.timer: ", state.timer);
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timer);
  }, [state.timer, dispatch]);

  const handleStartClicked = () => {
    dispatch({ type: "startQuiz" });
  };

  return (
    <div className="main">
      {state.status.isStart && (
        <Start
          questionsCount={state.questions.length}
          onStartClick={handleStartClicked}
        />
      )}
      {state.status.isQuiz && <Quiz state={state} dispatch={dispatch} />}
      {state.status.isResult && <Result state={state} dispatch={dispatch} />}
    </div>
  );
};

export default Main;
