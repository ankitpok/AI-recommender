import React from 'react';
import FetchItemsDjango from './components/FetchItemsDjango';
import FetchUserInfo from './components/FetchUserInfo'; 

function App() {
  return (
    <div className="App">
      <h1>Myntra Clone - Django Backend Demo</h1>
      <FetchItemsDjango />
      <FetchUserInfo/>
    </div>
  );
}

export default App;
