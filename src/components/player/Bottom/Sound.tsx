
interface Props {
    isMuted: boolean;
    toggleMute : () => void;
    volume: number;
    barRef: React.RefObject<HTMLDivElement | null>;
    setVideoVolume: (newVolume: number) => void;
}


export default function SoundIcon ({isMuted, toggleMute , volume, barRef, setVideoVolume}: Props) {

    const calcVolumeFromEvent = (
        e: React.MouseEvent | PointerEvent,
        bar: HTMLDivElement,
        maxWidth: number
    ) => {
        const rect = bar.getBoundingClientRect();
        const x = e.clientX - rect.left;

        const newWidth = Math.min(maxWidth, Math.max(0, x));
        return newWidth / maxWidth;
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        const bar = barRef.current;
        if (!bar) return;

        const maxWidth = 45;

        // 1. При обычном клике сразу меняем громкость
        const initialVolume = calcVolumeFromEvent(e, bar, maxWidth);
        setVideoVolume(initialVolume);

        // 2. Включаем drag
        bar.setPointerCapture(e.pointerId);

        const handleMove = (ev: PointerEvent) => {
            const newV = calcVolumeFromEvent(ev, bar, maxWidth);
            setVideoVolume(newV);
        };

        const handleUp = (ev: PointerEvent) => {
            bar.releasePointerCapture(ev.pointerId);
            bar.removeEventListener("pointermove", handleMove);
            bar.removeEventListener("pointerup", handleUp);
        };

        bar.addEventListener("pointermove", handleMove);
        bar.addEventListener("pointerup", handleUp);
    };

    return (
        <div className="button button-hovered button-pd14">
            <div className="sound">
                <div className="sound-icon inner-button" onClick={() => toggleMute ()}>
                    <div className="sound-button">
                        <svg className="btn-svg" width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="5" width="6" height="10" rx="3" fill="black" />
                            <rect x="7" width="6" height="20" rx="3" fill="black" />
                        </svg>
                    </div>

                    {!isMuted ?
                    <div className="sound-icon_effects">
                        <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 11.5C1.65685 11.5 3 10.1569 3 8.5C3 6.84315 1.65685 5.5 0 5.5" stroke="black" strokeWidth="3" />
                            <path d="M2 15.5C4.76142 15.5 9 12.366 9 8.5C9 4.63401 4.76142 1.5 2 1.5" stroke="black" strokeWidth="3" />
                        </svg>
                    </div>
                    :
                    <div className="sound-icon_effects">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="3.74032" height="11.221" rx="1.87016" transform="matrix(-0.642788 0.766044 0.766044 0.642788 2.40424 2.28882e-05)" fill="black" />
                            <rect width="3.74032" height="11.221" rx="1.87016" transform="matrix(-0.642788 -0.766044 -0.766044 0.642788 11 2.86525)" fill="black" />
                        </svg>
                    </div>}
                </div>
                <div className="sound-volume inner-button sound-line" ref={barRef} onPointerDown={handlePointerDown}>
                    {/* <div className="sound-volume_slider" style={{transform: `translateX(${volume}px)`}}>
                    </div> */}
                    <div className="sound-volume_point" style={{left: `${volume * 35}px`}}></div>
                </div>
            </div>
        </div>
    )
}