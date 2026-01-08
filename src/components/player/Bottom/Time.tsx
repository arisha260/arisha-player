
interface Props {
    time: string;
}

export default function Time ({time}: Props) {
    return (
        <div className="time-bottom">
            <div className="button button-hovered button-pd14">
                <div className="inner-button">
                    <div className="text-16">{time}</div>
                </div>
            </div>
        </div>
    )
}