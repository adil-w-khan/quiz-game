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

  const getButtonClass = (answer) => {
    if (!props.isChecked){
      return props.selectedAnswer === answer ? "selected" : "";
    }else{
      if (answer ===props.correctAnswer){
        return "correct"
      } else if (props.selectedAnswer === answer && props.selectedAnswer !== props.correctAnswer){
        return "incorrect"
      }else{
        return ""
      }
    }
  }
  
  return(
    <div className="questions-list">
      <p className="question">{he.decode(props.question)}</p>
      <ul className="answer-list">{allAnswers.map((answer, index) => (
          <button key={index} className={`answer-button ${getButtonClass(answer)}`} onClick={() => props.onAnswerSelect(answer)} disabled={props.isChecked}>{he.decode(answer)}</button>
        ))}</ul>
        <hr />
    </div>
  )
}