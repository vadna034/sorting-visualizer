import React from 'react';
import "styles/BarGraph.css"
import "styles/BarGraphElement.css"

export interface BarGraphProps {
  numElements: number;
}

function BarGraph(props: BarGraphProps) {
  let elementsArray: JSX.Element[] = [];

  for (let i = 1; i <= props.numElements; i++) {
    elementsArray.push(<>
        <div className="graph-element-container">
            <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
              <div style={{ display: "flex", flexGrow: 1 }}></div>
                <div className="graph-element" style={{height: "100%", display: "flex", flexBasis: getHeight(i, props.numElements)}}>
                  <p>{i}</p>
            </div>
          </div>
        </div>
      </>);
  }

  return (
    <div className="graph">
      <div className="graph-flexbox-container">
          {elementsArray}
        </div>
      </div>
  );
}

export const GRAPH_ELEMENT_CLASS_NAME = "graph-element";

export function getHeight(i: number, numEls: number): string{
  return (10+i/numEls*90) + '%'
}

export default BarGraph;
