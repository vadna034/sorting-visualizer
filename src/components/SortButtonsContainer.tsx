import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { getGnomeSortSwaps, getBubbleSortSwaps, getCocktailSortSwaps, getHeapSortSwaps, getInsertionSortSwaps, getMergeSortSwaps, getQuickSortSwaps, getSelectionSortSwaps, getShellSortSwaps, SortResult } from 'utils/Sorters';

export interface SortButtonsContainerProps {
    animateSort: (val: () => SortResult[]) => void;
}

export function SortButtonsContainer(props: SortButtonsContainerProps) {
    return <>
        <ButtonGroup>
            <Button onClick={() => props.animateSort(getBubbleSortSwaps)}>Bubble Sort</Button>
            <Button onClick={() => props.animateSort(getSelectionSortSwaps)}>Selection Sort</Button>
            <Button onClick={() => props.animateSort(getInsertionSortSwaps)}>Insertion Sort</Button>
            <Button onClick={() => props.animateSort(getMergeSortSwaps)}>Merge Sort</Button>
            <Button onClick={() => props.animateSort(getQuickSortSwaps)}>Quick Sort</Button>
            <Button onClick={() => props.animateSort(getHeapSortSwaps)}>Heap Sort</Button>
            <Button onClick={() => props.animateSort(getShellSortSwaps)}>Shell Sort</Button>
            <Button onClick={() => props.animateSort(getGnomeSortSwaps)}>Gnome Sort</Button>
            <Button onClick={() => props.animateSort(getCocktailSortSwaps)}>Cocktail Sort</Button>
        </ButtonGroup>
    </>
}