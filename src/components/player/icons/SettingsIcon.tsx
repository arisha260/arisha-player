
interface Props {
    toggleModal: () => void;
}

export default function SettingsIcon ({ toggleModal }: Props) {
    return (

        <div className="button button-hovered button-transparent button-pd14"
            onClick={(e) => {
                e.stopPropagation();
                toggleModal()
                }
            }>
            <svg className="btn-svg" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="21.813" y="4" width="25" height="8" rx="3" transform="rotate(120 21.813 4)" fill="black" />
                <rect x="25" y="16.6787" width="25" height="8" rx="3" transform="rotate(180 25 16.6787)" fill="black" />
                <rect x="15.251" y="24.2846" width="23" height="6" rx="2" transform="rotate(-120 15.251 24.2846)" fill="black" stroke="black" strokeWidth="2" />
            </svg>
        </div>
    )
};