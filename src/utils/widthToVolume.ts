export const widthToVolume = (width: number) => {
    return Math.min(1, Math.max(0, width / 45));
};

export const volumeToWidth = (volume: number) => {
    return volume * 45;
};