import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import skeleta from '../assets/images/ipod/skeleta.jpg';
import love_in_song from '../assets/images/ipod/venusandmars.jpg';
import snake_eyes from '../assets/images/ipod/parsons.jpg';

export const MusicContext = createContext();

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusic must be used within MusicProvider');
    }
    return context;
};

// Playlist with song metadata
const playlist = [
    {
        title: "Umbra",
        artist: "Ghost",
        album: "Meliora",
        duration: 269, // 4:39
        file: `${process.env.PUBLIC_URL}/music/umbra.mp3`,
        image: skeleta,
        rating: 5
    },
    {
        title: "Snake Eyes",
        artist: "Alan Parsons Project",
        album: "The Turn of a Friendly Card",
        duration: 180, // 3:00
        file: `${process.env.PUBLIC_URL}/music/snake_eyes.mp3`,
        image: snake_eyes,
        rating: 4
    },
    {
        title: "Love in Song",
        artist: "Wings",
        album: "Venus and Mars",
        duration: 183, // 3:03
        file: `${process.env.PUBLIC_URL}/music/love_in_song.mp3`,
        image: love_in_song,
        rating: 5
    }
];

export const MusicProvider = ({ children }) => {
    // Playlist with song metadata
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true); // Preferred state
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const hasInteracted = useRef(false);

    const currentSong = playlist[currentSongIndex];

    const togglePlay = useCallback(() => {
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const play = useCallback(() => {
        setIsPlaying(true);
    }, []);

    const pause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const next = useCallback(() => {
        setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
        setCurrentTime(0);
    }, []);

    const previous = useCallback(() => {
        if (currentTime > 3) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
        } else {
            setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
            setCurrentTime(0);
        }
    }, [currentTime]);

    const playAudio = useCallback(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.play().then(() => {
                hasInteracted.current = true;
            }).catch(err => {
                // Autoplay usually fails on fresh load without interaction
                console.log("Waiting for user interaction to start audio...");
            });
        }
    }, [isPlaying]);

    // Handle first interaction to "unlock" audio
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (hasInteracted.current) {
                // Already unlocked, clean up
                removeListeners();
                return;
            }

            if (isPlaying) {
                // Try to play
                if (audioRef.current) {
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            hasInteracted.current = true;
                            console.log("Audio unlocked and playing");
                            removeListeners();
                        }).catch(error => {
                            console.log("Autoplay failed, waiting for next interaction:", error);
                            // Do NOT remove listeners yet, try again next click
                        });
                    }
                }
            }
        };

        const removeListeners = () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };

        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('keydown', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            removeListeners();
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

        // Attempt to play if the global state is playing
        if (isPlaying) {
            // We don't call playAudio() here to avoid dependency cycles.
            // Instead, we just try to play directly if permitted.
            // But simpler: let the separate 'isPlaying' effect handle the actual play command.
            // EXCEPT: The 'isPlaying' effect won't re-fire if isPlaying didn't change (e.g. song changed but isPlaying stayed true).
            // So we DO need to trigger play here, but be careful.

            // Solution: We can just let the separate effect handle it IF we force a re-run?
            // No, better to just call play() on the ref directly here if needed, 
            // OR just trust the next effect to pick it up?
            // Actually, if we change the src, the next effect (checking isPlaying) might not trigger if isPlaying didn't change.

            // Let's rely on the fact that we just created a NEW audio object.
            // We can schedule a play.

            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    hasInteracted.current = true;
                }).catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            }
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateTime);
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.pause();
            }
        };
        // Dependency array: only re-run if the song physically changes. 
        // We explicitly EXCLUDE isPlaying, next, etc. to prevent re-init on pause.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSongIndex, currentSong.file]);

    // Play/Pause when isPlaying toggle
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            playAudio();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, playAudio]);

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
