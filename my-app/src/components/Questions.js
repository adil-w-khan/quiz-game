import React from "react";

export default function Questions() {
  console.log("question rendered")
  const [question, setQuestion] = React.useState({
    quest: "what is pakistan",
    answers: ["A", "B", "C", "D"]
  })
  const [allQuestions, setAllQuestions] = React.useState([])
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Set loading state before fetching

      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5");

        // Check for API rate limit or response errors
        if (response.status === 429) {
          setError("Rate limit exceeded. Please try again later.");
          return;
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Set the questions data to state
        setAllQuestions(data.results);
      } catch (error) {
        setError("Failed to fetch questions. Please try again.");
      } finally {
        setLoading(false); // Reset loading state after fetching
      }
    };

    fetchQuestions();
  }, []);

  console.log(allQuestions[0])
  return(
    <div>
      <ul>
        {allQuestions.map((item, index) => (
          <li key={index}>
            
            <p><strong>Question:</strong> {item.question}</p>
            
            <p><strong>Correct Answer:</strong> {item.correct_answer}</p>
            <ul>
              {item.incorrect_answers.concat(item.correct_answer).map((answer, i) => (
                <li key={i}>{answer}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

    </div>
  )
}