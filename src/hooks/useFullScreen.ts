import { useEffect, useState } from "react";

interface Props {
    playerRef: React.RefObject<HTMLDivElement | null>;
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const useFullScreen = ({playerRef, videoRef}: Props) => {

    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullScreen = () => {
        const player = playerRef.current;
        const video = videoRef.current;
        if (!player || !video) return;

        if (!document.fullscreenElement) {
            player.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const onFullScreenChange = () => {
            if (document.fullscreenElement) {
                setIsFullscreen(true);
            } else {
                setIsFullscreen(false);
            }
        };

        document.addEventListener("fullscreenchange", onFullScreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", onFullScreenChange);
        };
    }, []);

    return {isFullscreen, setIsFullscreen, handleFullScreen};
}