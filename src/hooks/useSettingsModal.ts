// interface Props {
//     modalRef: React.RefObject<HTMLDivElement | null>;
// }

import { useEffect, useRef, useState } from "react";

export const useSettingsModal = () => {

    const settingModalRef = useRef<HTMLDivElement | null>(null);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalSpeed, setIsOpenModalSpeed] = useState(false);

    const toggleModal = () => {
        setIsOpenModal(cur => !cur);
        setIsOpenModalSpeed(false);
    };

    useEffect(() => {

        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (settingModalRef.current && !settingModalRef.current.contains(e.target as Node)) {
                setIsOpenModal(false);
                setIsOpenModalSpeed(false);
            };
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [])

    return { settingModalRef, isOpenModal, toggleModal, isOpenModalSpeed, setIsOpenModalSpeed };
}
