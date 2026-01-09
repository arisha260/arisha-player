// import PlayerButtons from "./components/player/PlayerButtons";

import { useRef } from "react";
import ButtonStart from "./components/player/icons/StartButton";
import BottomPlayer from "./components/player/Bottom/Bottom";
import { FormatedTime } from "./utils/formatedTime";
import { useVideo } from "./hooks/useVideo";
import { useSound } from "./hooks/useSound";
import { useFullScreen } from "./hooks/useFullScreen";
import { usePlayerControls } from "./hooks/usePlayerControls";
import { useIsTouch } from "./hooks/useIsTouch";
import SettingsModal from "./components/player/Modal/SettingsModal";
import { useSettingsModal } from "./hooks/useSettingsModal";
import { usePlayerSettings } from "./hooks/usePlayerSettings";
import Loader from "./components/player/Loading";
import ButtonPause from "./components/player/icons/PauseButton";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import TimeSkipButtonsMinus from "./components/player/TimeSkipButtonsMinus";
import TimeSkipButtonsPlus from "./components/player/TimeSkipButtonsPlus";


export default function App() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const playerContRef = useRef<HTMLDivElement>(null);

  const isTouch = useIsTouch();

  const { settingModalRef, isOpenModal, toggleModal, isOpenModalSpeed, setIsOpenModalSpeed } = useSettingsModal();

  const { isPlaying, currentTime, duration, progress, togglePlay, setVideoTimeByPercent, bufferedPct, isWaiting, toggleTimeSkip } = useVideo({ videoRef, isTouch });
  const { barRef, isMuted, videoVolume, setVideoVolume, toggleVolume } = useSound({ videoRef });
  const { isFullscreen, handleFullScreen } = useFullScreen({ playerRef });
  const { activeControls, handlePlayerClick, handleBottomHoverStart, handleBottomHoverEnd } = usePlayerControls({ playerRef, togglePlay, isTouch, isOpenModal });

  const { settings, updateSettings } = usePlayerSettings({ videoRef });

  useKeyboardControls({ handlePlayerClick, isTouch });

  return (
    <div className="player" ref={playerRef} >
      <div className={`player-container ${!activeControls && isPlaying ? 'plr-hid' : ''}`} ref={playerContRef} data-player-mobile={isTouch ? true : false}>

        <video
          ref={videoRef}
          className="video"
          src="https://arisha-player.hb.ru-msk.vkcloud-storage.ru/%D0%AD%D0%B4%D0%B8%D1%82%20%D0%97%D0%BB%D0%BE%D0%B1%D0%B8%D0%BD%D1%83.mp4"
          onClick={() => handlePlayerClick()}
          playsInline={false}
          webkit-playsinline
          controls={false}
        />

        {!isTouch ?
          <div
              className={`plr-opc cntr-btns`}>
              { !isPlaying ?
                //Если isTouch, то тогда emersion
                <ButtonStart togglePlay={togglePlay}/> :
                ''
              }
          </div>
          :
          <div
              className={`plr-opc cntr-btns`}>
              { !isPlaying ?
                <ButtonStart togglePlay={togglePlay}/> :
                <ButtonPause togglePlay={togglePlay}/>
              }
          </div>
        }

        {isWaiting ? <Loader /> : ''}

        { isTouch ?
          <TimeSkipButtonsMinus onClick={() => toggleTimeSkip(-10)}/>
        :
          <></>
        }

        { isTouch ?
          <TimeSkipButtonsPlus onClick={() => toggleTimeSkip(10)}/>
        :
          <></>
        }

        <SettingsModal
          isOpenModal={isOpenModal}
          modalRef={settingModalRef}
          isChangedModal={isOpenModalSpeed}
          setIsChangedModal={setIsOpenModalSpeed}
          onSelect={updateSettings}
          selectedValues={settings}/>

        <BottomPlayer
          isPlaying={isPlaying}
          togglePlay={() => togglePlay()}
          time={`${!isTouch ? `${FormatedTime(currentTime)} / ${FormatedTime(duration)}`: FormatedTime(currentTime)}`}
          isMuted={isMuted}
          toggleMute ={toggleVolume}
          isFullScreen={isFullscreen}
          handleFullScreen={handleFullScreen}
          onBottomEnter={handleBottomHoverStart}
          onBottomLeave={handleBottomHoverEnd}
          volume={videoVolume}
          barRef={barRef}
          setVideoVolume={setVideoVolume}
          toggleModal={toggleModal}
          progress={progress}
          changeProgres={setVideoTimeByPercent}
          videoDuration={duration}
          bufferedVideoPct={bufferedPct}
        />

      </div>
    </div>
  )
}