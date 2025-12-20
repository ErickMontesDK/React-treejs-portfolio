import './../../styles/ipodScreen.css';
import { useMusic } from '../../context/MusicContext';

export default function IpodScreen() {
    const { currentSong, isPlaying, currentTime } = useMusic();

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate progress percentage
    const progress = (currentTime / currentSong.duration) * 100;

    return (
        <div className="ipod-screen">
            {/* Header */}
            <div className="ipod-header">
                <span className="battery">🔋</span>
                <span className="time">3:14</span>
            </div>

            {/* Album Art */}
            <div className="album-art">
                <div className="album-placeholder">♪</div>
            </div>

            {/* Song Info */}
            <div className="song-info">
                <div className="song-title">{currentSong.title}</div>
                <div className="artist">{currentSong.artist}</div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
                <span className="time-label">{formatTime(currentTime)}</span>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="time-label">{formatTime(currentSong.duration)}</span>
            </div>

            {/* Controls */}
            <div className="controls">
                <span className="control-icon">⏮</span>
                <span className="control-icon play">{isPlaying ? '❚❚' : '▶'}</span>
                <span className="control-icon">⏭</span>
            </div>
        </div>
    );
}