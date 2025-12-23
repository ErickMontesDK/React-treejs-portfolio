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
    const [isPlaying, setIsPlaying] = useState(true); // Preferred state
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const hasInteracted = useRef(false);

    const currentSong = playlist[currentSongIndex];

    const playAudio = () => {
        if (audioRef.current && isPlaying) {
            audioRef.current.play().then(() => {
                hasInteracted.current = true;
            }).catch(err => {
                // Autoplay usually fails on fresh load without interaction
                console.log("Waiting for user interaction to start audio...");
            });
        }
    };

    // Handle first interaction to "unlock" audio
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasInteracted.current && isPlaying) {
                playAudio();
            }
            // We can remove the listeners once the user interacts
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };

        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('keydown', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, [isPlaying]);

    // Initialize audio element when song changes
    useEffect(() => {
        // Cleanup previous audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
            audioRef.current.load();
        }

        audioRef.current = new Audio(currentSong.file);
        audioRef.current.loop = false;

        const updateTime = () => setCurrentTime(audioRef.current.currentTime);
        const handleEnded = () => next();

        audioRef.current.addEventListener('timeupdate', updateTime);
        audioRef.current.addEventListener('ended', handleEnded);

        // Attempt to play
        if (isPlaying) {
            playAudio();
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateTime);
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.pause();
            }
        };
    }, [currentSongIndex]);

    // Play/Pause when isPlaying toggle
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            playAudio();
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
        setCurrentTime(0);
    };

    const previous = () => {
        if (currentTime > 3) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
        } else {
            setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
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
