import React, { useState, useEffect } from 'react';

export interface BarGraphElementProps {
  height: Number;
}

function BarGraphElement(props: BarGraphElementProps) {
  const { height } = props;
  return <h1>TODO: Bar Graph Element with size {height}</h1>;
}

export default BarGraphElement;
