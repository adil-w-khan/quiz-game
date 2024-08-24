import React from "react";
import he from "he"

export default function Questions(props) {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  const allAnswers = shuffleArray([
    ...props.incorrectAnswer,
    props.correctAnswer
  ]);
  
  return(
    <div className="questions-list">
      <p className="question">{he.decode(props.question)}</p>
      <p>{props.correctAnswer}</p>
      <ul className="answer-list">{allAnswers.map((answer, index) => (
          <button key={index} className="answer-button">{answer}</button>
        ))}</ul>
        <hr />
    </div>
  )
}