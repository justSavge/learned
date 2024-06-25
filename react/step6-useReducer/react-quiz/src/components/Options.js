function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((op, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={op}
          onClick={() => dispatch({ type: "checkAnswer", payload: index })}
          disabled={hasAnswer}
        >
          {op}
        </button>
      ))}
    </div>
  );
}

export default Options;
