import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <form>
        <input type="text" name="M"/>
        <input type="text" name="N"/>
        <button type="submit">Create matrix</button>
      </form>
    </div>
  );
}

export default App;
