
interface Props {
    togglePlay: () => void;
}

export default function ButtonStart ({togglePlay}: Props) {
    return (
        <div className={`button button-big button-start`} onClick={togglePlay}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M61.4223 38.2111C62.8964 38.9482 62.8964 41.0518 61.4223 41.7889L27.8944 58.5528C26.5646 59.2177 25 58.2507 25 56.7639V23.2361C25 21.7493 26.5646 20.7823 27.8944 21.4472L61.4223 38.2111Z" fill="black" />
            </svg>
        </div>
    )
};

export function ButtonStartSmall () {
    return (
        <div className="button button-hovered button-start">
            <svg className="btn-svg" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.4223 18.2111C29.8964 18.9482 29.8964 21.0518 28.4223 21.7889L14.8944 28.5528C13.5646 29.2177 12 28.2507 12 26.7639V13.2361C12 11.7493 13.5646 10.7823 14.8944 11.4472L28.4223 18.2111Z" fill="black" />
            </svg>
        </div>
    )
};