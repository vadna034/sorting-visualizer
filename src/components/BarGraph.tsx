import React, { useState, useEffect } from 'react';
import BarGraphElement, { BarGraphElementProps } from 'components/BarGraphElement';
import "styles/BarGraph.css"

export interface BarGraphProps {}

function BarGraph(props: BarGraphProps) {
  const elementsArray: Array<BarGraphElementProps> = [];
  for (var i = 1; i <= 10; i++) {
    elementsArray.push({ height: i });
  }

  return (
    <div className="graph">
      <div className="graph-flexbox-container">
        {elementsArray.map((props) => {
          return <BarGraphElement height={props.height}></BarGraphElement>;
        })}
      </div>
    </div>
  );
}

export default BarGraph;
