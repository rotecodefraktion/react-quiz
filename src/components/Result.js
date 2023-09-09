import Button from "./Button";

const Result = ({ state, dispatch }) => {
  const handleResetClick = () => {
    dispatch({ type: "resetClick" });
  };

  return (
    <>
      <div>
        <p className="result">
          You scored {state.points} out of {state.maxPoints} points
        </p>
      </div>
      <div>
        <p className="highscore">(Highscore: {state.highscore} points)</p>
        <Button className="btn btn-ui" clickAction={handleResetClick}>
          Reset Quiz
        </Button>
      </div>
    </>
  );
};

export default Result;
