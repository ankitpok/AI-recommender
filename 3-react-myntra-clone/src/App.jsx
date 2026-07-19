import React from 'react';
import FetchItems from './components/FetchItems';
import FetchUserInfo from './components/FetchUserInfo'; 

function App() {
  return (
    <div className="App">
      <h1>Myntra Clone</h1>
      <FetchItems />
      <FetchUserInfo/>
    </div>
  );
}

export default App;
