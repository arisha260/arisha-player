import { useIsTouch } from "../../../hooks/useIsTouch";
import FullScreenIcon from "../icons/FullScreenIcon";
import { ButtonPauseSmall } from "../icons/PauseButton";
import SettingsIcon from "../icons/SettingsIcon";
import { ButtonStartSmall } from "../icons/StartButton";
import ProgressBar from "./ProgressBar";
import SoundIcon from "./Sound";
import Time from "./Time";

interface Props {
    isPlaying: boolean;
    togglePlay: () => void;
    time: string;
    isMuted: boolean;
    toggleMute : () => void;
    isFullScreen: boolean;
    handleFullScreen: () => void;
    onBottomEnter: () => void;
    onBottomLeave: () => void;
    volume: number;
    barRef: React.RefObject<HTMLDivElement | null>;
    setVideoVolume: (newVolume: number) => void;
    toggleModal: () => void;
    progress: number;
    changeProgres: (pct: number) => void;
    videoDuration: number;
    bufferedVideoPct: number;
}



export default function BottomPlayer (
    {
        isPlaying,
        togglePlay,
        time,
        isMuted,
        toggleMute ,
        isFullScreen,
        handleFullScreen,
        onBottomEnter,
        onBottomLeave,
        volume,
        barRef,
        setVideoVolume,
        toggleModal,
        progress,
        changeProgres,
        videoDuration,
        bufferedVideoPct,
    }: Props) {

    const isTouch = useIsTouch();

    return (
        <div className={`plr-opc plr-bottom`} onPointerEnter={onBottomEnter} onPointerLeave={onBottomLeave}>
            <ProgressBar progress={progress} duration={videoDuration} bufferedPct={bufferedVideoPct} onChange={changeProgres}/>
            {!isTouch ?
            <div className="plr-bottom-container">
                <div className="plr-bottom-left">
                    <div className={`playing-buttons_bottom`} onClick={() => togglePlay()}>
                        { isPlaying ?  <ButtonPauseSmall /> : <ButtonStartSmall /> }
                    </div>
                    <Time time={time}/>
                    <SoundIcon isMuted={isMuted} toggleMute ={() => toggleMute()} volume={volume} barRef={barRef} setVideoVolume={setVideoVolume}/>
                </div>
                <div className="plr-bottom-right">
                    <SettingsIcon toggleModal={toggleModal}/>
                    <FullScreenIcon isFullScreen={isFullScreen} handleFullScreen={handleFullScreen}/>
                </div>
            </div>
            :
            <div className="plr-bottom-container">
                <div className="plr-bottom-left">
                    <div className={`playing-buttons_bottom`} onClick={() => togglePlay()}>
                        { isPlaying ?  <ButtonPauseSmall /> : <ButtonStartSmall /> }
                    </div>
                    <Time time={time}/>
                </div>
                <div className="plr-bottom-right">
                    <SettingsIcon toggleModal={toggleModal}/>
                    <FullScreenIcon isFullScreen={isFullScreen} handleFullScreen={handleFullScreen}/>
                </div>
            </div>
            }
        </div>
    )
}