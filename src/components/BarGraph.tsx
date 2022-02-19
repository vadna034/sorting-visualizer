import React, { useState, useEffect } from 'react';
import BarGraphElement from './BarGraphElement';

export interface BarGraphProps {}

function BarGraph(props: BarGraphProps) {

  return (
    <div>
      <h1>TODO: Bar Graph</h1>
      <BarGraphElement height={1}></BarGraphElement>
      <BarGraphElement height={2}></BarGraphElement>
      <BarGraphElement height={3}></BarGraphElement>
    </div>
  );
}

export default BarGraph;
