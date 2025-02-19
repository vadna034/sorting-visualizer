import React, {useState} from 'react';
import BarGraph, { getHeight, GRAPH_ELEMENT_CLASS_NAME } from './components/BarGraph';
import { SlidersContainer } from './components/SlidersContainer';
import { PlayPauseContainer } from 'components/PlayPauseContainer';
import { SortButtonsContainer } from 'components/SortButtonsContainer';
import { SortResult } from 'utils/Sorters';

export const DEFAULT_ANIMATION_SPEED = 5;

const CLASS_DEFAULT = "graph-element-default-color";
const CLASS_BEING_SWAPPED = "graph-element-being-swapped";
const CLASS_BEING_COMPARED = "graph-element-being-compared";
const GRAPH_ELEMENT_COLORS = [CLASS_DEFAULT, CLASS_BEING_COMPARED, CLASS_BEING_SWAPPED];

let shouldPause = false;
let animationSpeed = DEFAULT_ANIMATION_SPEED;

export type SortKey = number;
let sortKey: SortKey = 0;

interface SortAnimation {
  action: "AddSwappingCSSClass" | "SwapHeights" | "RemoveSwappingCSSClass" | "AddComparingCSSClass" | "SetHeight";
  v1: number;
  v2: number;
  height?: number;
};

function App() {
  const [numElements, updateElements] = useState(10);

  function updateShouldPause(val: boolean){
    shouldPause = val;
  }

  return (
    <div className="App" style={{width: "80%", margin: "2em auto", maxWidth: "1100px"}}>
      <header className="App-header">
        <div style={{display: "flex", flexDirection: "column"}}>
          <SlidersContainer 
          changeNumberOfElements={(event: React.SyntheticEvent | Event, value: number | number[]) => {
              if(typeof(value) === "number") changeElementsWrapper(() => updateElements(value))
            }}
            changeAnmiationSpeed={(event: React.SyntheticEvent | Event, value: number | number[]) => {
              if(typeof(value) === "number") animationSpeed = value;
            }} />
          <BarGraph numElements={numElements}></BarGraph>
          <PlayPauseContainer
            setShouldPause={(updateShouldPause)}
          />
          <div>
            <SortButtonsContainer animateSort={animateSort}/>
          </div>
        </div>
      </header>
    </div>
  );
}

function changeElementsWrapper(fun: (() => void) | (() => Promise<void>)){
  sortKey++;
  let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
  elArr.forEach(el => replaceClass(el, CLASS_DEFAULT));
  fun();
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
        replaceClass(elArr[idx], CLASS_DEFAULT);
    })

    sortKey++;
}

async function animateSort(fun: () => SortResult[]): Promise<void>{
    changeElementsWrapper(randomizeElements);
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let animationArr = fun().map(res => getActionsFromSortResult(res)).reduce((a,b) => a.concat(b));
    let id = sortKey

    await WaitForSetTime(id);
    
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
        case "SetHeight": 
            elements[0].setAttribute("style", "flex-basis: " + (animation.height?.toString() ?? "") + "%")
    }

    await WaitForSetTime(id).then(() => {
        if(animation.action === "AddComparingCSSClass" && id === sortKey){
            elements.forEach(el => {replaceClass(el, CLASS_DEFAULT)});
        }
    });
}

function getActionsFromSortResult(sortResult: SortResult): SortAnimation[]{
    let [action, v1, v2, height] = [sortResult.action, sortResult.v1, sortResult.v2, sortResult.height];

    switch(action){
        case "compare":
            return [{action: "AddComparingCSSClass", v1: v1, v2: v2}];
        case "swap": 
            return [{action: "AddSwappingCSSClass", v1: v1, v2: v2},
                {action: "SwapHeights", v1: v1, v2: v2},
                {action: "RemoveSwappingCSSClass", v1: v1, v2: v2}]
        case "setHeight": 
            return [{action: "AddSwappingCSSClass", v1: v1, v2: v1},
              {action: "SetHeight", v1: v1, v2: v1, height: height},
              {action: "RemoveSwappingCSSClass", v1: v1, v2: v1}]
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
        await new Promise(resolve => setTimeout(resolve, 500-5*animationSpeed));
    } while(shouldPause && id === sortKey)
}

export default App;
