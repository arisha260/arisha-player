import React, { useState, useEffect, useRef } from "react";

interface Props {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    isTouch: boolean;
}

export const useVideo = ({videoRef, isTouch}: Props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [bufferedPct, setBufferedPct] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false);

    const [isVisibleCenterButtons, setIsVisibleCenterButtons] = useState(false);
    const flashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const flashButton = () => {
        if (flashTimeoutRef.current) {
            clearTimeout(flashTimeoutRef.current);
            flashTimeoutRef.current = null;
        }
        setIsVisibleCenterButtons(true);

        if (isTouch && !isPlaying) {
            return; // просто оставляем кнопки видимыми
        }

        flashTimeoutRef.current = setTimeout(() => {
            setIsVisibleCenterButtons(false);
            flashTimeoutRef.current = null;
        }, 1000);
    };

    // Функция для взаимодействия с проигрыванием плеера
    const togglePlay = () => {
        const video = videoRef?.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
        flashButton();
    };

    const toggleTimeSkip = (time: number) => {
        const video = videoRef?.current;
        if (!video) return;

        const nextTime = Math.min(
            Math.max(video.currentTime + time, 0),
            video.duration
        )

        video.currentTime = nextTime;
    }

    const showLoader = () => setIsWaiting(true);
    const hideLoader = () => setIsWaiting(false);

    useEffect (() => {
        const video = videoRef?.current;
        if (!video) return;

        const onTimeUpdate = () => {
            const t = video.currentTime;
            setCurrentTime(t);
            setProgress((t / video.duration) * 100);

            // Если видео движется — loader точно выключается
            if (!video.paused && video.readyState >= 3) {
                hideLoader();
            }
        };

        const onLoadedMeta = () => {
            setDuration(video.duration);
        };

        const updateBuffered = () => {
            if (!video.buffered.length || !video.duration) {
                setBufferedPct(0);
                return;
            }

            const end = video.buffered.end(video.buffered.length - 1);
            setBufferedPct((end / video.duration) * 100);
        };


        video.addEventListener("timeupdate", onTimeUpdate);
        video.addEventListener("progress", updateBuffered);
        video.addEventListener("loadedmetadata", onLoadedMeta);

        // Loader ON
        video.addEventListener("waiting", showLoader);
        video.addEventListener("seeking", showLoader);;

        // Loader OFF
        video.addEventListener("playing", hideLoader);

        // Playing state
        video.addEventListener("play", () => setIsPlaying(true));
        video.addEventListener("pause", () => setIsPlaying(false));

        return () => {
            video.removeEventListener("timeupdate", onTimeUpdate);
            video.removeEventListener("progress", updateBuffered);
            video.removeEventListener("loadedmetadata", onLoadedMeta);

            video.removeEventListener("waiting", showLoader);
            video.removeEventListener("seeking", showLoader);

            video.removeEventListener("playing", hideLoader);
        };
    }, [videoRef])

    const setVideoTimeByPercent = (pct: number) => {
        const video = videoRef?.current;
        if (!video || !duration) return;

        const newTime = (pct / 100) * duration;
        video.currentTime = newTime;
        setCurrentTime(newTime);
        setProgress(pct);
    };

    // Очистка таймера для центарльных кнопок, когда компонент размонтируется
    useEffect(() => {
        return () => {
            if (flashTimeoutRef.current) {
                clearTimeout(flashTimeoutRef.current);
            }
        };
    }, []);

    return { isPlaying, currentTime, duration, progress, togglePlay, setVideoTimeByPercent, bufferedPct, isWaiting, isVisibleCenterButtons, flashButton, toggleTimeSkip };
}