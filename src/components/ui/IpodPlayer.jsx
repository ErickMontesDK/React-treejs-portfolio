import { useMusic } from '../../context/MusicContext';
import './../../styles/ipodPlayer.css';
import IpodScreen from '../htmlScreens/ipodScreen';

export default function IpodPlayer() {
    const { togglePlay, next, previous, isPlaying } = useMusic();

    return (
        <div className="ipod-player">
            {/* iPod Body */}
            <div className="ipod-body">
                {/* Screen Area */}
                <div className="ipod-screen-container">
                    <IpodScreen />
                </div>

                {/* Click Wheel */}
                <div className="click-wheel">
                    {/* Center Button */}
                    <button
                        className="center-button"
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? "❚❚" : "▶"}
                    </button>

                    {/* Wheel Buttons */}


                    <button
                        className="wheel-button wheel-left"
                        onClick={previous}
                        aria-label="Previous"
                    >
                        ⏮
                    </button>

                    <button
                        className="wheel-button wheel-right"
                        onClick={next}
                        aria-label="Next"
                    >
                        ⏭
                    </button>


                </div>
            </div>
        </div>
    );
}
