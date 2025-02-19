import { GRAPH_ELEMENT_CLASS_NAME } from "../components/BarGraph";

export interface SortResult {
    v1: number;
    v2: number;
    action: "compare" | "swap" | "setHeight";
    height?: number
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


export function getQuickSortSwaps(): SortResult[]{
    let res: SortResult[] = [];
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let heightArr = elArr.map(el => el.clientHeight);

    function getRandomIndex(l: number, h: number){
        return l + Math.round(Math.random() * (h-l));
    }

    function partition(arr: number[], l: number, h: number){
        let [i1,i2,i3] = [getRandomIndex(l, h), getRandomIndex(l,h), getRandomIndex(l,h)];
        let [a,b,c] = [arr[i1],arr[i2],arr[i3]];
        let medianIndex;

        res.push({v1: i1, v2: i2, action: "compare"});
        if(a < b){
            res.push({v1: i1, v2: i3, action: "compare"});
            medianIndex = a > c ? i1 : i3;
        } else{
            res.push({v1: i2, v2: i3, action: "compare"});
            medianIndex = b > c ? i2 : i3;
        }

        if(medianIndex !== h){
            [arr[medianIndex], arr[h]] = [arr[h], arr[medianIndex]];
            res.push({v1: medianIndex, v2: h, action: "swap"});
        }
        

        let pivot = arr[h]; 
        let i = l - 1; 
      
        for (let j = l; j <= h - 1; j++) { 
            res.push({v1: j, v2: h, action: "compare"});
            if (arr[j] < pivot) { 
                i++; 
                if(i !== j){
                    [arr[i], arr[j]] = [arr[j], arr[i]];  
                    res.push({v1: i, v2: j, action: "swap"});
                }
            } 
        } 
        
        i++;
        if(i !== h){
            [arr[i], arr[h]] = [arr[h], arr[i]];  
            res.push({v1: i, v2: h, action: "swap"});
        }

        return i;
    }
    
    function quickSort(arr: number[], l: number, h: number){
        if(l >= h) return;
        let m = partition(arr, l, h);

        quickSort(arr, l, m-1);
        quickSort(arr, m+1, h);
    }

    quickSort(heightArr, 0, heightArr.length-1);

    return res;
}

export function getHeapSortSwaps(): SortResult[]{
    let res: SortResult[] = [];
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let heightArr = elArr.map(el => el.clientHeight);

    function heapSort(arr: number[]) {
        const n = arr.length;
      
        function heapify(arr: number[], n: number, i: number) {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
        
            if (left < n) {
                res.push({v1: left, v2: largest, action: "compare"})
                if(arr[left] > arr[largest]){
                    largest = left;
                }
            }
        
            if (right < n) {
                res.push({v1: right, v2: largest, action: "compare"})
                
                if(arr[right] > arr[largest]){
                    largest = right;
                }
            }
        
            if (largest !== i) {
                res.push({v1: i, v2: largest, action: "swap"});
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                heapify(arr, n, largest);
            }
        }
      
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
      
        for (let i = n - 1; i > 0; i--) {
            res.push({v1: 0, v2: i, action: "swap"});
            [arr[0], arr[i]] = [arr[i], arr[0]];
            heapify(arr, i, 0);
        }
        return arr;
    }

    heapSort(heightArr);

    return res;
}


export function getMergeSortSwaps(): SortResult[]{
    let res: SortResult[] = [];
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let heightArr = elArr.map(el => Number(el.getAttribute("style")?.slice("flex-basis: ".length,-1)));

    function mergeSortInPlace(arr: number[], left = 0, right = arr.length - 1) {
        // Base case: If the array has one or no elements, it's already sorted
        if (left >= right) return;
    
        // Find the middle index
        const mid = Math.floor((left + right) / 2);
        
        // Recursively sort the left half
        mergeSortInPlace(arr, left, mid);
        
        // Recursively sort the right half
        mergeSortInPlace(arr, mid + 1, right);
        
        // Merge the sorted halves in place using a more efficient method
        mergeOptimized(arr, left, mid, right);
    }
    
    function mergeOptimized(arr: number[], left: number, mid: number, right: number) {
        let leftArr = arr.slice(left, mid + 1);
        let rightArr = arr.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;

        while(i < leftArr.length && j < rightArr.length){
            res.push({v1: i+left, v2: j+mid+1, action: "compare"});
            if(leftArr[i] <= rightArr[j]){
                i++;
            } else{
                j++;
            }
        }

        i = 0;
        j = 0;

        // 0 5 10
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                res.push({v1: k, v2: k, height: leftArr[i], action: "setHeight"});
                arr[k++] = leftArr[i++];
            } else {
                res.push({v1: k, v2: k, height: rightArr[j], action: "setHeight"});
                arr[k++] = rightArr[j++];
            }
        }
        
        while (i < leftArr.length) {
            res.push({v1: k, v2: k, height: leftArr[i], action: "setHeight"});
            arr[k++] = leftArr[i++];
        }
        while (j < rightArr.length) {
            res.push({v1: k, v2: k, height: rightArr[j], action: "setHeight"});
            arr[k++] = rightArr[j++];
        }
    }

    mergeSortInPlace(heightArr);

    return res;
}

export function getShellSortSwaps(): SortResult[]{
    let res: SortResult[] = [];
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let heightArr = elArr.map(el => Number(el.getAttribute("style")?.slice("flex-basis: ".length,-1)));

    function sort(arr: number[])
    {
        let n = arr.length;
            for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
            {
        
                for (let i = gap; i < n; i += 1)
                {
                    let temp = arr[i];
    
                    let j;
                    for (j = i; j >= gap && arr[j - gap] > temp; j -= gap){
                        arr[j] = arr[j - gap];
                        res.push({v1: j, v2: j-gap, action: "swap"});
                    }
    
                    arr[j] = temp;
                    res.push({v1: j, v2: j, action: "setHeight", height: temp})
                                        
                }
            }
            return arr;
    }

    sort(heightArr);

    return res;
}

export function getCocktailSortSwaps(): SortResult[] {
    let res: SortResult[] = [];
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let heightArr = elArr.map(el => Number(el.getAttribute("style")?.slice("flex-basis: ".length,-1)));
     
    function cocktailSort(a: number[]): void
    {
        let isIncreasing = true;
        let swapped = true;
        let start = 0;
        let end = a.length;

    
        while (swapped === true) {    
            swapped = false;

            for (let i = start; i < end - 1 && isIncreasing; ++i) {
                res.push({v1: i, v2: i+1, action: "compare"});
                if (a[i] > a[i + 1]) {
                    res.push({v1: i, v2: i+1, action: "swap"});
                    [a[i], a[i+1]] = [a[i+1],a[i]];
                    swapped = true;
                }
            }

            for (let i = end - 1; i >= start && !isIncreasing; i--) {
                res.push({v1: i, v2: i+1, action: "compare"});
                if (a[i] > a[i + 1]) {
                    res.push({v1: i, v2: i+1, action: "swap"});
                    [a[i], a[i+1]] = [a[i+1],a[i]];
                    swapped = true;
                }
            }
    
    
            end = isIncreasing ? end - 1 : end;
            start = !isIncreasing ? start + 1 : start;
            isIncreasing = !isIncreasing;
        }
    }

    cocktailSort(heightArr)

    return res;
}

export function getGnomeSortSwaps(): SortResult[] {
    let res: SortResult[] = [];
    let elArr = Array.from(document.getElementsByClassName(GRAPH_ELEMENT_CLASS_NAME));
    let heightArr = elArr.map(el => Number(el.getAttribute("style")?.slice("flex-basis: ".length,-1)));

    function gnomeSort(arr: number[]){
        let pos = 0;

        while(pos < arr.length){
            if(pos === 0) {
                pos++;
                continue;
            }

            res.push({v1: pos, v2: pos-1, action: "compare"});

            if(pos === 0 || arr[pos] >= arr[pos-1]){
                pos++;
            }
            else{
                res.push({v1: pos, v2: pos-1, action: "swap"});
                [arr[pos], arr[pos-1]] = [arr[pos-1],arr[pos]];
                pos--;
            }
        }
    }

    // Driver method
    gnomeSort(heightArr);

    return res;
}