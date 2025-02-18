import { Button } from '@mui/material';
import React from 'react';

export interface SortButtonsContainerProps {

}

export function SortButtonsContainer(props: SortButtonsContainerProps) {
    return <>
        <Button>Bubble Sort</Button>
        <Button>Selection Sort</Button>
        <Button>Insertion Sort</Button>
        <Button>Merge Sort</Button>
        <Button>Quick Sort</Button>
        <Button>Heap Sort</Button>
        <Button>Cycle Sort</Button>
        <Button>Tree Sort</Button>
        <Button>Shell Sort</Button>
        <Button>Radix Sort</Button>
    </>
}