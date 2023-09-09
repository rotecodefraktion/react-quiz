const ProgressBar = ({ state }) => {
  return (
    <div className="progress">
      <progress value={state.questionNumber} max={state.questions.length} />
      <p>
        <span>Question</span>
        <span style={{ fontWeight: "700" }}> {state.questionNumber + 1}</span>
        <span> / {state.questions.length}</span>
      </p>
      <p>
        <span style={{ fontWeight: "700" }}> {state.points}</span>
        <span> / {state.maxPoints} Points</span>
      </p>
    </div>
  );
};

export default ProgressBar;
