import React from 'react';
import Front from "./components/Front"
import Questions from './components/Questions';

function App() {
  const [frontPage, setFrontPage] = React.useState(true);
  const [allQuestions, setAllQuestions] = React.useState([])
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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
        setAllQuestions(data.results);

        // Store the time of the successful fetch
        localStorage.setItem("lastFetch", now);
      } catch (error) {
        setError("Failed to fetch questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);
  
  const questionElements = allQuestions.map((item, index) => (
    <Questions 
      key={index}
      question={item.question}
      correctAnswer={item.correct_answer}
      incorrectAnswer={item.incorrect_answers}
    />
  ));

  return (
    <div>
      {frontPage ? 
        <Front 
        onHide={() => setFrontPage(false)}
        /> :
        (<div className='app-question-page'>
          {questionElements}
          <button className='checkButton'>Check Answers</button>
        </div>)
      }
    </div>
    
  )
}

export default App;
