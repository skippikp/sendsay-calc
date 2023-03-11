import React from 'react';
import CalcPalete from './containers/CalcPalete/CalcPalete';
import DropDesk from './containers/DropDesk/DropDesk';
import ModeSwitch from './containers/ModeSwitch/ModeSwitch';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app__content-container">
        <CalcPalete />
        <div className="drop-side-container">
          <ModeSwitch />
          <DropDesk />
        </div>
      </div>
    </div>
  );
}

export default App;
