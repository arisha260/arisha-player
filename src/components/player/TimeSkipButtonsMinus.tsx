interface Props {
    onClick: () => void;
}


export default function TimeSkipButtonsMinus ({onClick}: Props) {
    return (
        <div className="btn-tsk btn-tsk_m" onClick={onClick}>
            <div className="btn-tsk_con">
                <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.23328 24.169L2.48549 14.8809C2.22241 14.5188 2.23201 14.0259 2.50897 13.6743L9.23331 5.13784M4.46928 14.5667L26.191 14.5667C26.7433 14.5667 27.191 15.0144 27.191 15.5667L27.191 20.3564" stroke="#B7B7B7" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <span>-10</span>
            </div>
        </div>
    )
}