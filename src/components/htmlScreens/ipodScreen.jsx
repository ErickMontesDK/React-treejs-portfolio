import './../../styles/ipodScreen.css';
import { useMusic } from '../../context/MusicContext';

export default function IpodScreen() {
    const { currentSong, isPlaying, currentTime, playlist, currentSongIndex } = useMusic();

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

            <div className="song-data">
                {/* Album Art */}
                <div className="album-art-container">
                    <div className="album-art">
                        {currentSong.image ? (
                            <img src={currentSong.image} alt={currentSong.title} className="album-img" />
                        ) : (
                            <div className="album-placeholder">♪</div>
                        )}
                    </div>
                </div>

                {/* Song Info */}
                <div className="song-info">
                    <div className="song-title">{currentSong.title}</div>
                    <div className="artist">{currentSong.artist}</div>
                    <div className="album-name">{currentSong.album}</div>
                    <div className="rating">
                        {'★'.repeat(currentSong.rating || 0).padEnd(5, '☆')}
                    </div>
                    <div className="track-count">
                        {currentSongIndex + 1} of {playlist.length}
                    </div>
                </div>
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