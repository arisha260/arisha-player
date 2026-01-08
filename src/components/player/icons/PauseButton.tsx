
interface Props {
    togglePlay: () => void;
}

export default function ButtonPause ({togglePlay}: Props) {
    return (
        <div className={`button button-big button-pause`} onClick={togglePlay}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="32" y="20" width="6" height="40" rx="3" fill="black" />
                <rect x="42" y="20" width="6" height="40" rx="3" fill="black" />
            </svg>
        </div>
    )
};


export function ButtonPauseSmall () {
    return (
        <div className="button button-hovered button-pause">
            <svg className="btn-svg" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="16" y="10" width="3" height="20" rx="1.5" fill="black" />
                <rect x="21" y="10" width="3" height="20" rx="1.5" fill="black" />
            </svg>
        </div>
    )
};