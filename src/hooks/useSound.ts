import { useRef, useState } from "react";

interface Props {
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const useSound = ({videoRef}: Props) => {

    const barRef = useRef<HTMLDivElement>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [videoVolume, setVideoVolume] = useState(1);

    const prevVolumeRef = useRef(1);

    const updateVolume = (v: number) => {
        const video = videoRef.current;
        if (!video) return;

        setVideoVolume(v);
        video.volume = v;

        if (v === 0) {
            video.muted = true;
            setIsMuted(true);
        } else {
            video.muted = false;
            setIsMuted(false);
            prevVolumeRef.current = v;
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isMuted) {
            const restored = prevVolumeRef.current || 0.5;

            setIsMuted(false);
            video.muted = false;
            updateVolume(restored);
        } else {
            prevVolumeRef.current = videoVolume;

            setIsMuted(true);
            video.muted = true;
            updateVolume(0);
        }
    };

    return {
        barRef,
        isMuted,
        videoVolume,
        setVideoVolume: updateVolume,
        toggleVolume: toggleMute,
    };
}