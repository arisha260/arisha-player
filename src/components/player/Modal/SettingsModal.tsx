import { useState } from "react";
import { settingModalData } from "./ModalSettingsData";
import ChangedModal from "./ChangedModal";
import type { PlayerSettings } from "../../../types/playerSettings.types";

interface Props {
    isOpenModal: boolean;
    modalRef: React.RefObject<HTMLDivElement | null>;
    isChangedModal: boolean;
    setIsChangedModal: (isChangedModal: boolean) => void;
    onSelect: (key: "quality" | "speed", value: number) => void;
    selectedValues: PlayerSettings;
}

export default function SettingsModal ({isOpenModal, modalRef, isChangedModal, setIsChangedModal, onSelect, selectedValues}: Props) {

    const [currentSetting, setCurrentSetting] = useState<keyof typeof settingModalData | null>(null);

    return (
        <div
            className={`player-modal ${isOpenModal ? "player-modal_active" : ""}`}
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}>

            { isChangedModal && currentSetting ?
                <ChangedModal
                    title={settingModalData[currentSetting].title}
                    values={settingModalData[currentSetting].values}
                    selected={selectedValues[currentSetting]}
                    unit={settingModalData[currentSetting].unit}
                    onBack={() => setIsChangedModal(false)}
                    onSelect={(val) => {
                        onSelect(currentSetting, val);
                        setIsChangedModal(false);
                    }}/>
            :
                <div className="modal-container">

                    <div className="modal-menu-item text-16" onClick={() => {
                            setIsChangedModal(true)
                            setCurrentSetting('quality');
                        }}>
                        <div className="modal-descr">Качество</div>
                        <div className="modal-volue">{selectedValues.quality}p</div>
                    </div>

                    <div className="modal-menu-item text-16" onClick={() =>{
                            setIsChangedModal(true)
                            setCurrentSetting('speed');
                        }}>
                        <div className="modal-descr">Скорость</div>
                        <div className="modal-volue">{selectedValues.speed}x</div>
                    </div>

                </div>
            }
        </div>
    )
}