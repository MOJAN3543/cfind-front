import { useState } from "react"

type UseSetReturnType<T> = [Set<T>, (arg0: T) => void]

export const useSet = <T,>(): UseSetReturnType<T> => {
    const [set, setSet] = useState<Set<T>>(new Set);

    const toggleSet = (element: T) => {
        const updatedSet = new Set([...set]);
        if(updatedSet.has(element))
            updatedSet.delete(element);
        else
            updatedSet.add(element);
        setSet(updatedSet);
    }

    return [set, toggleSet];
}