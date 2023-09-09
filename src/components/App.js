import { useReducer, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
// import fakeQuestions from "./questions";

const SECS_PER_QUESTION = 20;

function toMinutesAndSeconds(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = Number(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Number(totalMinutes % 60)
    .toString()
    .padStart(2, "0");

  return { minutes, seconds };
}

const initalState = {
  status: {
    isStart: true,
    isQuiz: false,
    isResult: false,
    isQuestion: true,
    isLoading: false,
    isError: null,
  },
  questionNumber: 0,
  answer: 0,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
  questions: [],
  maxPoints: 100,
};

function reducer(state, action) {
  switch (action.type) {
    case "startQuiz":
      //  console.log("startQuiz");
      return {
        ...state,
        status: {
          isStart: false,
          isQuiz: true,
          isResult: false,
          isLoading: false,
          isError: null,
          isQuestion: true,
        },
        secondsRemaining: SECS_PER_QUESTION * state.questions.length,
      };

    case "nextClick":
      if (state.questionNumber !== state.questions.length - 1) {
        return {
          ...state,
          questionNumber: state.questionNumber + 1,
          status: { ...state.status, isQuestion: true },
        };
      } else {
        console.log("resultClick");
        return {
          ...state,
          status: { ...state.status, isQuiz: false, isResult: true },
        };
      }

    case "answerClick":
      const newPoints =
        state.questions[state.questionNumber].correctOption === action.payload
          ? state.points + state.questions[state.questionNumber].points
          : state.points;
      const newHighscore =
        newPoints > state.highscore ? newPoints : state.highscore;
      return {
        ...state,
        status: { ...state.status, isQuestion: false },
        answer: action.payload,
        points: newPoints,
        highscore: newHighscore,
      };
    case "tick":
      if (!state.status.isQuiz) {
        return state;
      }
      if (state.secondsRemaining === 0) {
        return {
          ...state,
          status: { isStart: false, isQuiz: false, isResult: true },
        };
      }
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case "resetClick":
      const savedHighscore = state.highscore;
      const savedQuestions = state.questions;
      const savedMaxPoints = state.maxPoints;
      return {
        ...initalState,
        highscore: savedHighscore,
        questions: savedQuestions,
        maxPoints: savedMaxPoints,
      };

    case "setLoading":
      //console.log("setLoading: ", action.payload);
      return {
        ...state,
        status: { ...state.status, isLoading: action.payload },
      };

    case "setError":
      return { ...state, status: { ...state.status, isError: true } };

    case "loadQuestions":
      if (!action.payload) {
        return state;
      }
      // console.log(action.payload);
      const maxPoints = action.payload.reduce(
        (acc, question) => acc + question.points,
        0
      );
      return { ...state, questions: action.payload, maxPoints: maxPoints };

    default:
      throw Error("Invalid type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "setError", payload: null });
        dispatch({ type: "setLoading", payload: true });
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        setTimeout(() => {
          //console.log("setTimeOut");
          dispatch({ type: "loadQuestions", payload: data });
          dispatch({ type: "setLoading", payload: false });
        }, 2500);
      } catch (err) {
        dispatch({ type: "setError", payload: err.message });
      }
    }

    fetchData();
  }, []);
  //console.log(state);
  return (
    <div className="app">
      <Header />
      {state.status.isLoading ? (
        <Loader />
      ) : (
        <Main state={state} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
