import React from 'react';
import Front from "./components/Front"
import Questions from './components/Questions';
import {nanoid} from "nanoid"

function App() {
  const [frontPage, setFrontPage] = React.useState(true);
  const [allQuestions, setAllQuestions] = React.useState([])
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedAnswer, setSelectedAnswer] = React.useState({});
  const [score, setScore] = React.useState(null)
  const [checked, setChecked] = React.useState(null)

  React.useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const lastFetch = localStorage.getItem("lastFetch");
    const now = Date.now();

    if (lastFetch && now - lastFetch < 5000) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5");

      if (response.status === 429) {
        setError("Rate limit exceeded. Please try again later.");
        return;
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      const modifiedQuestions = data.results.map((item, index) => ({
        id: nanoid(),  
        question: item.question,
        correctAnswer: item.correct_answer,
        incorrectAnswers: item.incorrect_answers,
        selectedAnswer: null,  
      }));
      
      setAllQuestions(modifiedQuestions);

      
      localStorage.setItem("lastFetch", now);
    } catch (error) {
      setError("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswer(prevSelectedAnswers => ({
      ...prevSelectedAnswers,
      [questionId]: answer
    }));
  };

  const checkAnswers = () => {
    let score = 0;
    if(!checked){
      allQuestions.forEach((question) => {
        if (selectedAnswer[question.id] === question.correctAnswer){
          score++;
        }
      })
      setScore(score)
      setChecked(true)
    }else if (checked){
      setScore(null)
      setChecked(false)
      fetchQuestions()
    }
  }
  
  const questionElements = allQuestions.map((item, index) => (
    <Questions 
      key={item.id}
      question={item.question}
      correctAnswer={item.correctAnswer}
      incorrectAnswer={item.incorrectAnswers}
      selectedAnswer={selectedAnswer[item.id]}
      onAnswerSelect={(answer)=> handleAnswerSelect(item.id, answer)}
      isChecked = {checked}
    />
  ));
  
  return (
    <div>
      {frontPage ? 
        <Front onHide={() => setFrontPage(false)}/> 
        : (
        <div className='app-question-page'>
          {questionElements}
          <div className='bottom-page-elements'>
            {score !== null && <p className='score'>Your score: {score} / {allQuestions.length}</p>}
            <button className='checkButton' onClick={checkAnswers}>{score == null ? "Check Answer" : "Play Again"}</button>
          </div>
        
        </div>)
        
      }
    </div>
    
  )
}

export default App;
