import React from "react";

export default function Questions() {
  const [question, setQuestion] = React.useState({
    quest: "what is pakistan",
    answers: ["A", "B", "C", "D"]
  })
  const [allQuestions, setAllQuestions] = React.useState([])
  
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setAllQuestions(data))
  }, [])

  console.log(allQuestions)
  return(
    <div>
      <p>Questipns</p>
    </div>
  )
}