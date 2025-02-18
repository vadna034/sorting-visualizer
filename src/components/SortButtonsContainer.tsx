import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { getBubbleSortSwaps, getInsertionSortSwaps, getSelectionSortSwaps, SortResult } from 'utils/Sorters';

export interface SortButtonsContainerProps {
    animateSort: (val: () => SortResult[]) => void;
}

export function SortButtonsContainer(props: SortButtonsContainerProps) {
    return <>
        <ButtonGroup>
            <Button onClick={() => props.animateSort(getBubbleSortSwaps)}>Bubble Sort</Button>
            <Button onClick={() => props.animateSort(getSelectionSortSwaps)}>Selection Sort</Button>
            <Button onClick={() => props.animateSort(getInsertionSortSwaps)}>Insertion Sort</Button>
            <Button>Merge Sort</Button>
            <Button>Quick Sort</Button>
            <Button>Heap Sort</Button>
            <Button>Cycle Sort</Button>
            <Button>Tree Sort</Button>
            <Button>Shell Sort</Button>
            <Button>Radix Sort</Button>
        </ButtonGroup>
    </>
}