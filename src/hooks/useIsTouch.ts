import { useEffect, useState } from "react";


export const useIsTouch = () => {

    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(pointer: coarse)");
        setIsTouch(query.matches);

        const listener = (e: MediaQueryListEvent) => setIsTouch(e.matches);
        query.addEventListener("change", listener);

        return () => query.removeEventListener("change", listener);
    }, []);

    return isTouch;
}