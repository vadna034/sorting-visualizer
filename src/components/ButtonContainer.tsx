import React from 'react';
import { getHeight, GRAPH_ELEMENT_CLASS_NAME } from './BarGraph';
import { getBubbleSortSwaps, getSelectionSortSwaps, SortResult } from '../utils/Sorters';

const CLASS_DEFAULT = "graph-element";
const CLASS_BEING_SWAPPED = "graph-element-being-swapped";
const CLASS_BEING_COMPARED = "graph-element-being-compared"

let shouldPause = false;
let randomizationKey = 0;

export interface ButtonContainerProps {
    addElement: () => void;
    removeElement: () => void;
};

interface SortAnimation {
    action: "AddSwappingCSSClass" | "SwapHeights" | "RemoveSwappingCSSClass" | "AddComparingCSSClass";
    v1: number;
    v2: number;
};


function ButtonContainer(props: ButtonContainerProps) {
  return (
    <div>
      <div></div>
      <button onClick={randomizeElements}>Randomize</button>
      <button onClick={props.addElement}>Add Element</button>
      <button onClick={props.removeElement}>Remove Element</button>
      <button onClick={animateSort}>Bubble Sort</button>
      <button onClick={() => shouldPause = false}>Start</button>
      <button onClick={() => shouldPause = true}>Pause</button>

    </div>
  );
}

function randomizeElements(): void{
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

    randomizationKey++;
}

async function animateSort(): Promise<void>{
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let animationArr = getSelectionSortSwaps().map(res => getActionsFromSortResult(res)).reduce((a,b) => a.concat(b));
    
    for(const animation of animationArr){
        await handleSortAnimationAndWait(animation, elArr);
    }
}

async function handleSortAnimationAndWait(animation: SortAnimation, elArr: Element[]){
    let elements = [elArr[animation.v1],elArr[animation.v2]];
    let [leftHeight, rightHeight] = [elements[0].getAttribute("style"), elements[1].getAttribute("style")];

    switch(animation.action){
        case "AddComparingCSSClass":
            elements.forEach(el => {replaceClass(el, CLASS_BEING_COMPARED, CLASS_DEFAULT);});
            break;
        case "AddSwappingCSSClass": 
            elements.forEach(el => {replaceClass(el, CLASS_BEING_SWAPPED, CLASS_DEFAULT);});
            break;
        case "SwapHeights": 
            elements[0].setAttribute("style", rightHeight ?? "");
            elements[1].setAttribute("style", leftHeight ?? "")
            break;
        case "RemoveSwappingCSSClass":
            elements.forEach(el => {replaceClass(el, CLASS_DEFAULT, CLASS_BEING_SWAPPED);});
            break;
    }

    await WaitForSetTime().then(() => {
        if(animation.action === "AddComparingCSSClass"){
            elements.forEach(el => {replaceClass(el, CLASS_DEFAULT, CLASS_BEING_COMPARED)});
        }
    });
}

function getActionsFromSortResult(sortResult: SortResult): SortAnimation[]{
    let [action, v1, v2] = [sortResult.action, sortResult.v1, sortResult.v2];

    switch(action){
        case "compare":
            return [{action: "AddComparingCSSClass", v1: v1, v2: v2}];
        case "swap": 
            return [{action: "AddSwappingCSSClass", v1: v1, v2: v2},
                {action: "SwapHeights", v1: v1, v2: v2},
                {action: "RemoveSwappingCSSClass", v1: v1, v2: v2}]
        default: 
            throw new Error("Not implemented sorting type");
    }
}

function replaceClass(el: Element, classToAdd: string, classToRemove: string){
    el.classList.remove(classToRemove);
    el.classList.add(classToAdd);
}

async function WaitForSetTime(){
    do {
        await new Promise(resolve => setTimeout(resolve, 25));
    } while(shouldPause)
}


export default ButtonContainer;
