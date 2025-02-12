import React from 'react';
import { getHeight, GRAPH_ELEMENT_CLASS_NAME } from './BarGraph';
import { getBubbleSortSwaps, SortResult } from '../utils/Sorters';

const CLASS_DEFAULT = "graph-element";
const CLASS_BEING_SWAPPED = "graph-element-being-swapped";
const CLASS_BEING_COMPARED = "graph-element-being-compared"

export interface ButtonContainerProps {
    addElement: () => void;
    removeElement: () => void;
};

function ButtonContainer(props: ButtonContainerProps) {
  return (
    <div>
      <div></div>
      <button onClick={randomizeElements}>Randomize</button>
      <button onClick={props.addElement}>Add Element</button>
      <button onClick={props.removeElement}>Remove Element</button>
      <button onClick={animateSort}>Bubble Sort</button>
      <button>Start</button>
      <button>Pause</button>

    </div>
  );
}

function randomizeElements(){
    let elArr = document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME);
    let numElements = elArr.length;

    // Gives us a randomized array of numbers from 1 to n
    let randomizedEls = Array.from(Array(numElements).keys())
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    randomizedEls.forEach((height, idx) => {
        elArr[idx].setAttribute("style", "flex-basis: " + getHeight(height+1, elArr.length))

    })
}

async function animateSort(){
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let sortResults = getBubbleSortSwaps();
    console.log(sortResults);

    for(const res of sortResults){
        switch(res.action){
            case "compare":
                await handleCompare(res, elArr);
                break;
            case "swap": 
                await handleSwap(res, elArr);
                break;
            default: 
                throw new Error("Not implemented sorting type");
        }
    }
}

async function handleCompare(sortResult: SortResult, elArr: Element[]){
    if(sortResult.action !== "compare") throw new Error("Invalid Sort Result");

    let [lIdx,rIdx] = [sortResult.v1, sortResult.v2];
    let elements = [elArr[lIdx],elArr[rIdx]];

    elements.forEach(el => {
        replaceClass(el, CLASS_BEING_COMPARED, CLASS_DEFAULT);
    });

    await WaitForSetTime();

    elements.forEach(el => {
        replaceClass(el, CLASS_DEFAULT, CLASS_BEING_COMPARED)
    });
}

async function handleSwap(sortResult: SortResult, elArr: Element[]){
    if(sortResult.action !== "swap") throw new Error("Invalid Sort Result");

    let elements = [elArr[sortResult.v1],elArr[sortResult.v2]];
    let [leftHeight, rightHeight] = [elements[0].getAttribute("style"), elements[1].getAttribute("style")];

    elements.forEach(el => {
        replaceClass(el, CLASS_BEING_SWAPPED, CLASS_DEFAULT);
    });
    await WaitForSetTime();

    elements[0].setAttribute("style", rightHeight ?? "");
    elements[1].setAttribute("style", leftHeight ?? "")
    await WaitForSetTime();

    elements.forEach(el => {
        replaceClass(el, CLASS_DEFAULT, CLASS_BEING_SWAPPED);
    });

    await WaitForSetTime();
}

function replaceClass(el: Element, classToAdd: string, classToRemove: string){
    el.classList.remove(classToRemove);
    el.classList.add(classToAdd);
}

async function WaitForSetTime(){
    await new Promise(resolve => setTimeout(resolve, 400));
}


export default ButtonContainer;
