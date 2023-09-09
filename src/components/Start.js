const Start = ({ questionsCount, onStartClick }) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questionsCount} questions to test your React mastery</h3>
      <button className="btn" onClick={onStartClick}>
        Let's start!
      </button>
    </div>
  );
};

export default Start;
