import React from 'react';
import Front from "./components/Front"
import Questions from './components/Questions';

function App() {
  const [frontPage, setFrontPage] = React.useState(true);

  return (
    <div>
      {frontPage ? <Front onHide={() => setFrontPage(false)}/> : <Questions />}
    </div>
    
  )
}

export default App;
