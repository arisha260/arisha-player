interface Props {
    isFullScreen: boolean;
    handleFullScreen: () => void;
}

export default function FullScreenIcon ({isFullScreen, handleFullScreen}: Props) {
    return (
        <div className="button button-hovered button-transparent button-pd14" onClick={handleFullScreen}>
            { isFullScreen ?
            <svg className="btn-svg" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 21.5V8.5C16.5 7.39543 15.6046 6.5 14.5 6.5H1.5" stroke="black" strokeWidth="3" strokeLinecap="round" />
                <path d="M6.5 1.5V14.5C6.5 15.6046 7.39543 16.5 8.5 16.5H21.5" stroke="black" strokeWidth="3" strokeLinecap="round" />
            </svg>
            :
            <svg className="btn-svg" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V11.5M2 2L9.5 9.5" stroke="black" strokeWidth="3" strokeLinecap="round" />
                <path d="M11.5 21.5H20.5C21.0523 21.5 21.5 21.0523 21.5 20.5V11.5M21 21L13.5 13.5" stroke="black" strokeWidth="3" strokeLinecap="round" />
            </svg>
            }
        </div>
    )
};