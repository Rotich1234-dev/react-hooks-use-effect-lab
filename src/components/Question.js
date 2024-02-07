import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup function to clear the timeout when the component is unmounted or when time is up
      return () => clearTimeout(timerId);
    } else {
      // Time is up, trigger onAnswered with false
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    // Reset the timer when an answer is chosen
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
