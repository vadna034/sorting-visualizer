import React from 'react';
import { getHeight, GRAPH_ELEMENT_CLASS_NAME } from './BarGraph';

function randomizeElements(){
    let elArr = document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME);
    let numElements = elArr.length;

    console.log(elArr[0].childNodes)

    // Gives us a randomized array of numbers from 1 to n
    let randomizedEls = Array.from(Array(numElements).keys())
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    randomizedEls.forEach((height, idx) => {
        elArr[idx].setAttribute("style", "flex-basis: " + getHeight(height+1, elArr.length))

    })
    console.log(elArr);
}

function ButtonContainer() {
  return (
    <div>
      <div></div>
      <button onClick={randomizeElements}>Randomize</button>
      <button>Bubble Sort</button>
      <button>Start</button>
      <button>Pause</button>

    </div>
  );
}

export default ButtonContainer;
