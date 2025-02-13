import React from 'react';
import { getHeight, GRAPH_ELEMENT_CLASS_NAME } from './BarGraph';
import { getBubbleSortSwaps, getSelectionSortSwaps, SortResult } from '../utils/Sorters';

const CLASS_DEFAULT = "graph-element-default-color";
const CLASS_BEING_SWAPPED = "graph-element-being-swapped";
const CLASS_BEING_COMPARED = "graph-element-being-compared";
const GRAPH_ELEMENT_COLORS = [CLASS_DEFAULT, CLASS_BEING_COMPARED, CLASS_BEING_SWAPPED];

let shouldPause = false;

export type SortKey = number;
let sortKey: SortKey = 0;

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
    function changeElementsWrapper(fun: (() => void) | (() => Promise<void>)){
        sortKey++;
        let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
        elArr.forEach(el => replaceClass(el, CLASS_DEFAULT));
        fun();
    }
  
    return (
    <div>
      <div></div>
      <button onClick={() => changeElementsWrapper(randomizeElements)}>Randomize</button>
      <button onClick={() => changeElementsWrapper(props.addElement)}>Add Element</button>
      <button onClick={() => changeElementsWrapper(props.removeElement)}>Remove Element</button>
      <button onClick={() => changeElementsWrapper(animateSort)}>Bubble Sort</button>
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

    sortKey++;
}

async function animateSort(): Promise<void>{
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let animationArr = getSelectionSortSwaps().map(res => getActionsFromSortResult(res)).reduce((a,b) => a.concat(b));
    let id = sortKey
    
    for(const animation of animationArr){
        if(id !== sortKey) break;

        await handleSortAnimationAndWait(animation, elArr, id);
    }
}

async function handleSortAnimationAndWait(animation: SortAnimation, elArr: Element[], id: SortKey){
    let elements = [elArr[animation.v1],elArr[animation.v2]];
    let [leftHeight, rightHeight] = [elements[0].getAttribute("style"), elements[1].getAttribute("style")];

    switch(animation.action){
        case "AddComparingCSSClass":
            elements.forEach(el => {replaceClass(el, CLASS_BEING_COMPARED);});
            break;
        case "AddSwappingCSSClass": 
            elements.forEach(el => {replaceClass(el, CLASS_BEING_SWAPPED);});
            break;
        case "SwapHeights": 
            elements[0].setAttribute("style", rightHeight ?? "");
            elements[1].setAttribute("style", leftHeight ?? "")
            break;
        case "RemoveSwappingCSSClass":
            elements.forEach(el => {replaceClass(el, CLASS_DEFAULT);});
            break;
    }

    await WaitForSetTime(id).then(() => {
        if(animation.action === "AddComparingCSSClass" && id === sortKey){
            elements.forEach(el => {replaceClass(el, CLASS_DEFAULT)});
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

function replaceClass(el: Element, classToAdd: string){
    GRAPH_ELEMENT_COLORS.forEach(color => el.classList.remove(color));
    el.classList.add(classToAdd);
}

async function WaitForSetTime(id: SortKey){
    do {
        await new Promise(resolve => setTimeout(resolve, 50));
    } while(shouldPause && id === sortKey)
}


export default ButtonContainer;
