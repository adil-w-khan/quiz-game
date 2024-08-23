import React from 'react';
import Front from "./components/Front"
import Questions from './components/Questions';

function App() {
  const [frontPage, setFrontPage] = React.useState(true);
  console.log("rendered")
  return (
    <div>
      {frontPage ? <Front onHide={() => setFrontPage(false)}/> : <Questions />}
    </div>
    
  )
}

export default App;
