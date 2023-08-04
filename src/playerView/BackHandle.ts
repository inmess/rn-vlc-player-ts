/**
 * Created by aolc on 2018/5/22.
 */

let backFunctionKeys: string[] = [];
let backFunctionsMap = new Map();

function removeIndex(array: any[], index: number) {
    let newArray:any[] = [];
    for (let i = 0; i < array.length; i++) {
        if (i !== index) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

function removeKey(array: any[], key: any) {
    let newArray:any[] = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== key) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

const handleBack = () => {
    if (backFunctionKeys.length > 0) {
        let functionKey = backFunctionKeys[backFunctionKeys.length - 1];
        backFunctionKeys = removeIndex(backFunctionKeys, backFunctionKeys.length - 1);
        let functionA = backFunctionsMap.get(functionKey);
        backFunctionsMap.delete(functionKey);
        functionA && functionA();
        return false;
    }
    return true;
};

const addBackFunction = (key: string, functionA: any) => {
    backFunctionsMap.set(key, functionA);
    backFunctionKeys.push(key);
};

const removeBackFunction = (key: string) => {
    backFunctionKeys = removeKey(backFunctionKeys, key);
    backFunctionsMap.delete(key);
};

export default {
    handleBack,
    addBackFunction,
    removeBackFunction,
};
