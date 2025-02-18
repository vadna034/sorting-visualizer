import React, {useState} from 'react';
import BarGraph from './components/BarGraph';
import ButtonContainer from './components/ButtonContainer';
import { SlidersContainer } from './components/SlidersContainer';
import { PlayPauseContainer } from 'components/PlayPauseContainer';
import { SortButtonsContainer } from 'components/SortButtonsContainer';

export const DEFAULT_ANIMATION_SPEED = 5;

function App() {
  const [numElements, updateElements] = useState(10);
  const [animationSpeed, updateanimationSpeed] = useState(DEFAULT_ANIMATION_SPEED);

  return (
    <div className="App" style={{width: "80%", margin: "2em auto", maxWidth: "1100px"}}>
      <header className="App-header">
        <div style={{display: "flex", flexDirection: "column"}}>
          <SlidersContainer 
          changeNumberOfElements={(event: React.SyntheticEvent | Event, value: number | number[]) => {
              if(typeof(value) === "number") updateElements(value)
            }}
            changeAnmiationSpeed={(event: React.SyntheticEvent | Event, value: number | number[]) => {
              if(typeof(value) === "number") updateanimationSpeed(value)
            }} />
          <BarGraph numElements={numElements}></BarGraph>
          <PlayPauseContainer/>
          <div>
            <SortButtonsContainer />
          </div>
          <ButtonContainer></ButtonContainer>
        </div>
      </header>
    </div>
  );
}

export default App;
