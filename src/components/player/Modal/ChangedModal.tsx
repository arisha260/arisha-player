
interface Props {
    title: string;
    values: number[];
    selected: number;
    unit: string;
    onBack: () => void;
    onSelect: (value: number) => void;
}


export default function ChangedModal ({ title, values, selected, unit, onBack, onSelect }: Props) {
    return (
        <div onClick={(e) => e.stopPropagation()} className="modal-container">
            <div className="modal-header text-16" onClick={onBack}>
                <div className="modal-back">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.72264 1.00007L1.8228 2.38331C0.735462 3.17499 0.723846 4.79273 1.7997 5.59993L3.67948 7.01032" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="modal-descr">{title}</div>
            </div>
            <div className="modal-list">
                {values.map((item) =>
                    <div
                        key={item}
                        className={`modal-menu-item text-16 ${selected === item ? 'modal-menu-item_active' : ''}`}
                        onClick={() => {
                            onSelect(item)
                        }}>
                            {item}{unit}
                        </div>
                )}
            </div>
        </div>
    )
}