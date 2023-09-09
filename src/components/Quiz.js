import ProgressBar from "./ProgressBar";
import Button from "./Button";

function classNameForButton(index, state) {
  const classNameArray = ["btn"];
  if (!state.status.isQuestion) {
    classNameArray.push("btn-option");
    if (state.answer === index) {
      classNameArray.push("answer");
    }
    if (state.questions[state.questionNumber].correctOption === index) {
      classNameArray.push("correct");
    } else {
      classNameArray.push("wrong");
    }
  }

  const className = classNameArray.join(" ");
  console.log(className);
  return className;
}

const Quiz = ({ state, dispatch }) => {
  const remainMinutes = Math.floor(state.secondsRemaining / 60)
    .toString()
    .padStart(2, "0");
  const remainSeconds = Number(state.secondsRemaining % 60)
    .toString()
    .padStart(2, "0");

  const handleAnswerClick = (index) => {
    dispatch({ type: "answerClick", payload: index });
  };
  const handleNextClick = () => {
    dispatch({ type: "nextClick" });
  };

  return (
    <div>
      <ProgressBar state={state} />
      <div className="question">
        <h4 key={state.questionsNumber}>
          {state.questions[state.questionNumber].question}
        </h4>
        <div className="options">
          {state.questions[state.questionNumber].options.map(
            (option, index) => {
              return (
                <Button
                  index={index}
                  clickAction={handleAnswerClick}
                  className={classNameForButton(index, state)}
                  key={index}
                  disabled={!state.status.isQuestion}
                >
                  {option}
                </Button>
              );
            }
          )}

          <div>
            <div className="timer">
              {remainMinutes}:{remainSeconds}
            </div>

            {!state.status.isQuestion && (
              <Button className="btn btn-ui" clickAction={handleNextClick}>
                {state.questionNumber < state.questions.length - 1
                  ? "Next"
                  : "Result"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
