import React from "react"

export default function Front(props){
  return(
    <div className="front-page">
      <h1>Quiz Game</h1>
      <h2>You will be given 5 trivia questions. Try to get them all correct!</h2>
      <button className="front-page-button" onClick={props.onHide}>Start Quiz</button>
    </div>
  )
}