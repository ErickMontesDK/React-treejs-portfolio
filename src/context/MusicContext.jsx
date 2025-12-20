import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export const MusicContext = createContext();

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusic must be used within MusicProvider');
    }
    return context;
};

export const MusicProvider = ({ children }) => {
    // Playlist with song metadata
    const playlist = [
        {
            title: "Coding Vibes",
            artist: "Lo-Fi Beats",
            duration: 225, // 3:45
            file: "/music/coding-vibes.mp3"
        },
        {
            title: "Focus Flow",
            artist: "Chill Hop",
            duration: 198, // 3:18
            file: "/music/focus-flow.mp3"
        },
        {
            title: "Deep Work",
            artist: "Study Music",
            duration: 210, // 3:30
            file: "/music/deep-work.mp3"
        }
    ];

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    const currentSong = playlist[currentSongIndex];

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio(currentSong.file);
        audioRef.current.loop = false;

        // Update current time
        const updateTime = () => {
            setCurrentTime(audioRef.current.currentTime);
        };

        // Handle song end
        const handleEnded = () => {
            next();
        };

        audioRef.current.addEventListener('timeupdate', updateTime);
        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateTime);
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.pause();
            }
        };
    }, [currentSongIndex]);

    // Play/Pause when isPlaying changes
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(err => {
                console.error("Error playing audio:", err);
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const play = () => {
        setIsPlaying(true);
    };

    const pause = () => {
        setIsPlaying(false);
    };

    const next = () => {
        setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
        setCurrentTime(0);
    };

    const previous = () => {
        if (currentTime > 3) {
            // If more than 3 seconds into song, restart it
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
        } else {
            // Otherwise go to previous song
            setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
            setIsPlaying(true);
            setCurrentTime(0);
        }
    };

    const value = {
        currentSong,
        isPlaying,
        currentTime,
        playlist,
        currentSongIndex,
        togglePlay,
        play,
        pause,
        next,
        previous
    };

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
};
