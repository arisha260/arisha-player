import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
    playerRef: React.RefObject<HTMLDivElement | null>;
    togglePlay: () => void;
    isTouch: boolean;
    isOpenModal: boolean;
}

export const usePlayerControls = ({playerRef, togglePlay, isTouch, isOpenModal}: Props) => {

    const timeoutRef = useRef<number | null>(null);
    const lastPointerTypeRef = useRef<string>("mouse");
    const isBottomHoveredRef = useRef(false);

    const [activeControls, setActiveControls] = useState(false);

    const HIDE_DELAY = 1500; // ms


    //* Активирует контролы и запускает таймер авто-деактивации
    //* Используется при любом пользовательском взаимодействии
    const activateControls = useCallback(() => {
        setActiveControls(true);

        if (isBottomHoveredRef.current) return;

        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            if (!isBottomHoveredRef.current && !isOpenModal) {
                setActiveControls(false);
            }
            timeoutRef.current = null;
        }, HIDE_DELAY);
    }, [isOpenModal]);


    //* Принудительно деактивирует контролы
    //* Используется при уходе курсора или повторном тапе на мобилке
    const deactivateControls = useCallback(() => {
        if (isBottomHoveredRef.current) return;
        if (isOpenModal) return;

        setActiveControls(false);

        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, [isOpenModal]);


    //* Обрабатывает клик / тап по области видео
    //* На мобилке — управляет только активацией контролов
    //* На десктопе — активирует контролы и переключает play/pause
    const handlePlayerClick = () => {
        if (isTouch) {
            if (activeControls) {
                deactivateControls();
                return;
            } else {
                activateControls();
                return;
            }
        }

        // На ПК: сразу play/pause
        activateControls();
        togglePlay();
    };


    //* Фиксирует контролы в активном состоянии
    //* Пока курсор находится над нижней панелью
    const handleBottomHoverStart = () => {
        isBottomHoveredRef.current = true;
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setActiveControls(true);
    };


    //* Снимает блокировку с контролов после ухода курсора
    //* Перезапускает таймер авто-деактивации
    const handleBottomHoverEnd = () => {
        isBottomHoveredRef.current = false;
        activateControls();
    };

    useEffect (() => {
        const player = playerRef.current;

        if (!player) return;

        const handler = (e: PointerEvent) => {
            lastPointerTypeRef.current = e.pointerType;
        }

        player.addEventListener('pointerdown', handler);

        return () => {
            player.removeEventListener('pointerdown', handler);
        };
    })

    useEffect (() => {
        const player = playerRef.current;
        if (!player) return;

        // Desktop
        player.addEventListener("mousemove", activateControls);
        player.addEventListener("mouseleave", deactivateControls);

        return () => {
            player.removeEventListener("mousemove", activateControls);
            player.removeEventListener("mouseleave", deactivateControls);
        }

    }, [playerRef, activateControls, deactivateControls])

    return { activeControls, handlePlayerClick, handleBottomHoverStart, handleBottomHoverEnd };
}