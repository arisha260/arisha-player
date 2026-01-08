import { useEffect } from "react";

interface Props {
    handlePlayerClick: () => void;
    isTouch: boolean;
}

export const useKeyboardControls = ({handlePlayerClick, isTouch}: Props) => {

    useEffect(() => {

        const handelSpacePress = (e: KeyboardEvent) => {
            if (isTouch) return;
            if (e.code == 'Space') {
                handlePlayerClick();
            }
        }

        document.addEventListener('keydown', handelSpacePress);

        return () => {
            document.removeEventListener('keydown', handelSpacePress);
        }
    }, [handlePlayerClick, isTouch])

}