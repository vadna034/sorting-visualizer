import { GRAPH_ELEMENT_CLASS_NAME } from "../components/BarGraph";

export interface SortResult {
    v1: number;
    v2: number;
    action: "compare" | "swap";
}

export function getBubbleSortSwaps(): SortResult[]{
    let res: SortResult[] = []
    
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let heightArr = elArr.map(el => el.clientHeight);
    let numSwaps = 1;

    for(let i=0; i<heightArr.length && numSwaps !== 0; i++){
        numSwaps = 0;
        for(let j=0; j<heightArr.length-i-1; j++){
            res.push({v1: j, v2: j+1, action: "compare"});

            if(heightArr[j] > heightArr[j+1]){
                [heightArr[j], heightArr[j+1]] = [heightArr[j+1], heightArr[j]];
                res.push({v1: j, v2: j+1, action: "swap"});
                numSwaps++;
            }
        }
    }

    console.log(res)
    
    return res;
}

export function getSelectionSortSwaps(): SortResult[]{
    let res: SortResult[] = []
    
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let heightArr = elArr.map(el => el.clientHeight);

    for(let i=0; i<heightArr.length-1; i++){
        let [minEl, minIdx] = [heightArr[i], i];

        for(let j=i+1; j<heightArr.length; j++){
            res.push({v1: minIdx, v2: j, action: "compare"});

            if(heightArr[j] < minEl){
                [minEl, minIdx] = [heightArr[j], j];
            }
        }

        if(i !== minIdx){
            res.push({v1: i, v2: minIdx, action: "swap"});
            [heightArr[i],heightArr[minIdx]] = [heightArr[minIdx],heightArr[i]];
        }
    }

    console.log(res)
    
    return res;
}

export function getInsertionSortSwaps(): SortResult[]{
    let res: SortResult[] = []
    
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let heightArr = elArr.map(el => el.clientHeight);

    for(let i=1; i<heightArr.length; i++){
        for(let j=i-1; j>=0 && heightArr[j]; j--){
            res.push({v1: j, v2: j+1, action: "compare"})
            
            if(heightArr[j] < heightArr[j+1]) break;
            else{
                [heightArr[j],heightArr[j+1]] = [heightArr[j+1],heightArr[j]];
                res.push({v1: j, v2:j+1, action: "swap"});
            }
        }
    }

    return res;
}