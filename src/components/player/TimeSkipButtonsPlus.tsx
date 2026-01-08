interface Props {
    onClick: () => void;
}


export default function TimeSkipButtonsPlus ({onClick}: Props) {
    return (
        <div className="btn-tsk btn-tsk_p" onClick={onClick}>
            <div className="btn-tsk_con">
                <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.7667 24.169L27.5145 14.8809C27.7776 14.5188 27.768 14.0259 27.491 13.6743L20.7667 5.13784M25.5307 14.5667L3.80899 14.5667C3.2567 14.5667 2.80899 15.0144 2.80899 15.5667L2.80899 20.3564" stroke="#B7B7B7" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <span>+10</span>
            </div>
        </div>
    )
}