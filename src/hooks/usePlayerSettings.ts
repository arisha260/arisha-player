import { useEffect, useState } from "react";
import type { PlayerSettings } from "../types/playerSettings.types";

interface Props {
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const usePlayerSettings = ( { videoRef }:Props) => {

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('player-settings');
        return saved
            ? JSON.parse(saved)
            : {speed: 1, quality: 1080,}
    });

    const updateSettings = (key: 'speed' | 'quality', value: number) => {
        setSettings((prev: PlayerSettings) => {
            const updated = { ...prev, [key]: value };
            localStorage.setItem('player-settings', JSON.stringify(updated));
            return updated;
        })
    }

    useEffect (() => {
        const video = videoRef?.current;
        if (!video) return

        video.playbackRate = settings.speed;
    }, [settings.speed, videoRef])

    return { settings, updateSettings };
}