import React, { useState, useEffect } from 'react';
import 'styles/BarGraphElement.css';

export interface BarGraphElementProps {
  height: number;
}

function BarGraphElement(props: BarGraphElementProps) {
  const height: number = props.height;
  return (
    <div className="graph-element-container">
      <div style={{ height: 100 - 10 * height + '%' }}></div>
      <div className="graph-element" style={{ height: 10 * height + '%' }}>
        <p>{height}</p>
      </div>
    </div>
  );
}

export default BarGraphElement;
