import React from 'react';
import BarGraph from './components/BarGraph';
import ButtonContainer from './components/ButtonContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BarGraph numElements={10}></BarGraph>
        <ButtonContainer></ButtonContainer>
      </header>
    </div>
  );
}

export default App;
