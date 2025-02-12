import React, {useState} from 'react';
import BarGraph from './components/BarGraph';
import ButtonContainer from './components/ButtonContainer';

function App() {
  const [numElements, updateElements] = useState(10);

  return (
    <div className="App">
      <header className="App-header">
        <BarGraph numElements={numElements}></BarGraph>
        <ButtonContainer addElement={() => updateElements(numElements+1)} removeElement={() => updateElements(Math.max(numElements-1,1))}></ButtonContainer>
      </header>
    </div>
  );
}

export default App;
