import React, { useRef, useState } from "react";
import { FormatedTime } from "../../../utils/formatedTime";

interface Props {
    progress: number;
    duration: number;
    bufferedPct: number;
    onChange: (pct: number) => void;
}


export default function ProgressBar ({progress, duration, bufferedPct, onChange}: Props) {

    const barRef = useRef<HTMLDivElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const [hoverX, setHoverX] = useState<number | null>(null);
    const [hoverPct, setHoverPct] = useState<number | null>(null);

    const calcPct = (e: React.MouseEvent | PointerEvent, barRef: HTMLDivElement) => {
        const rect = barRef.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        return Math.min(100, Math.max(0, pct));
    };

    const calcPx = (
        e: React.MouseEvent | PointerEvent,
        bar: HTMLDivElement,
        tooltip: HTMLDivElement
    ): number => {

        const barRect = bar.getBoundingClientRect();
        const tooltipWidth = tooltip.getBoundingClientRect().width;

        const x = e.clientX - barRect.left;

        return Math.min(
            barRect.width - tooltipWidth / 2,
            Math.max(tooltipWidth / 2, x)
        );
    };


    // prc - percent

    const handlePointerDown = (e: React.PointerEvent) => {
        const bar = barRef.current;
        if (!bar) return;

        bar.setPointerCapture(e.pointerId);

        const initial = calcPct(e, bar);
        onChange(initial);

        const move = (ev: PointerEvent) => {
            onChange(calcPct(ev, bar));
        };

        const up = (ev: PointerEvent) => {
            bar.releasePointerCapture(ev.pointerId);
            bar.removeEventListener('pointermove', move);
            bar.removeEventListener('pointerup', up);
        };

        bar.addEventListener('pointermove', move);
        bar.addEventListener('pointerup', up);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const bar = barRef.current;
        const tooltip = tooltipRef.current;
        if (!bar || !tooltip) return;

        setHoverX(calcPx(e, bar, tooltip));
        setHoverPct(calcPct(e, bar));
    };

    const handleMouseLeave = () => {
        setHoverX(null);
        setHoverPct(null);
    };

    const tooltipTime = hoverPct !==null && isFinite(duration) ? duration / 100 * hoverPct : null;

    return (
        <div className="progress-bar">
            <div style={{transform: `translateX(${hoverX}px)`}} className="tooltip-wrapper">
                <div
                    ref={tooltipRef}
                    style={{opacity: `${tooltipTime !== null ? '1' : '0'}`}}
                    className={`tooltip text-16`}>
                    {FormatedTime(tooltipTime)}
                </div>
            </div>
            <div
                className="progress"
                ref={barRef}
                onPointerDown={handlePointerDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}>
                <div className="bars">
                    <div style={{transform: `translateX(${bufferedPct}%)`}} className="progress-bar_buffered"></div>
                    <div style={{transform: `translateX(${progress}%)`}} className="progress-bar_loaded"></div>
                </div>
                <div style={{transform: `translateX(${progress}%)`}} className="progress-bar_handler-wrap">
                    <div className="progress-bar_handler"></div>
                </div>
            </div>
        </div>
    )
}