import React, { useState, useEffect } from 'react';

export interface BarGraphElementProps {
  height: Number;
}

function BarGraphElement(props: BarGraphElementProps) {
  const { height } = props;
  return (
    <div>
      <h1>{height}</h1>
    </div>
  );
}

export default BarGraphElement;
