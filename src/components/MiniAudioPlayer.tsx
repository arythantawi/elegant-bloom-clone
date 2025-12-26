import { useState, useRef, useEffect, useCallback } from "react";

interface AudioFile {
  title: string;
  artist: string;
  url: string;
  "record-art"?: string;
}

interface MiniAudioPlayerProps {
  playlist?: AudioFile[];
  defaultRecordArt?: string;
  autoStart?: boolean;
}

const defaultPlaylist: AudioFile[] = [
  {
    title: "Untuk Perempuan yang Sedang Dalam Pelukan",
    artist: "Payung Teduh",
    url: "/audio/payung-teduh-untuk-perempuan.mp3",
    "record-art": "/images/payung-teduh-cover.jpeg"
  },
  {
    title: "Anugerah Terindah",
    artist: "Andmesh",
    url: "/audio/andmesh-anugerah-terindah.mp3",
    "record-art": "/images/andmesh-cover.jpg"
  },
  {
    title: "Teman Hidup",
    artist: "Tulus",
    url: "/audio/tulus-teman-hidup.mp3",
    "record-art": "/images/tulus-cover.png"
  },
  {
    title: "It's You",
    artist: "Raisa",
    url: "/audio/raisa-its-you.mp3",
    "record-art": "/images/raisa-cover.jpg"
  },
  {
    title: "Denganmu",
    artist: "Arsy Widianto",
    url: "/audio/arsy-widianto-denganmu.mp3",
    "record-art": "/images/arsy-widianto-cover.jpg"
  }
];

const MiniAudioPlayer = ({ 
  playlist = defaultPlaylist, 
  defaultRecordArt = "/images/payung-teduh-cover.jpeg",
  autoStart = false
}: MiniAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);
  const [recordArt, setRecordArt] = useState(playlist[0]?.["record-art"] || defaultRecordArt);

  // Use refs for values needed in event handlers to avoid stale closures
  const autoPlayRef = useRef(autoPlay);
  const currentIndexRef = useRef(currentIndex);

  // Keep refs in sync with state
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Auto start playback when component mounts
  useEffect(() => {
    if (autoStart && !hasAutoStarted && audioRef.current) {
      setHasAutoStarted(true);
      setIsLoading(true);
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            // Autoplay was prevented by browser, user needs to interact first
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }
  }, [autoStart, hasAutoStarted]);

  const currentTrack = playlist[currentIndex];

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const playAtIndex = useCallback((index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentIndex(index);
      const track = playlist[index];
      setRecordArt(track["record-art"] || defaultRecordArt);
      setIsLoading(true);
      
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.load();
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsLoading(false);
            })
            .catch(() => {
              setIsPlaying(false);
              setIsLoading(false);
            });
        }
      }
    }
  }, [playlist, defaultRecordArt]);

  const playNext = useCallback(() => {
    const nextIndex = (currentIndexRef.current + 1) % playlist.length;
    playAtIndex(nextIndex);
  }, [playlist.length, playAtIndex]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }
  }, [isPlaying]);

  const playPrevious = useCallback(() => {
    const prevIndex = currentIndexRef.current === 0 ? playlist.length - 1 : currentIndexRef.current - 1;
    playAtIndex(prevIndex);
  }, [playlist.length, playAtIndex]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !duration) return;
    const seekTo = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
  }, [duration]);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    
    const handleEnded = () => {
      if (autoPlayRef.current) {
        const nextIndex = (currentIndexRef.current + 1) % playlist.length;
        playAtIndex(nextIndex);
      } else {
        setIsPlaying(false);
      }
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setIsPlaying(false);
      setIsLoading(false);
      console.error("Audio error occurred");
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, [playlist.length, playAtIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const progressGradient = `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${progress}%, hsl(var(--muted)) ${progress}%, hsl(var(--muted)) 100%)`;

  return (
    <div className={`mini-audio-player ${isPlaying ? "playing" : ""} ${isMinimized ? "minimized" : ""}`}>
      <audio 
        ref={audioRef} 
        src={currentTrack?.url} 
        preload="auto"
      />
      
      {/* Minimize/Expand Button */}
      <button 
        className="minimize-btn"
        onClick={() => setIsMinimized(!isMinimized)}
        title={isMinimized ? "Expand Player" : "Minimize Player"}
        aria-label={isMinimized ? "Expand Player" : "Minimize Player"}
      >
        {isMinimized ? "♫" : "−"}
      </button>
      
      {/* Spinning Record */}
      <div className="spinning-album">
        <img 
          src={recordArt} 
          alt={`${currentTrack?.title} - ${currentTrack?.artist}`} 
          className={isPlaying ? "spinning" : ""} 
          loading="eager"
        />
        {isLoading && (
          <div className="loading-indicator" aria-label="Loading">
            <span className="loading-spinner" />
          </div>
        )}
      </div>

      {/* Playlist */}
      <div className="playlist-container">
        <ul role="listbox" aria-label="Playlist">
          {playlist.map((track, index) => (
            <li 
              key={`${track.title}-${track.artist}`}
              role="option"
              aria-selected={index === currentIndex}
              className={index === currentIndex ? "active" : ""}
              onClick={() => playAtIndex(index)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  playAtIndex(index);
                }
              }}
            >
              <h4>{track.title}</h4>
              <p>{track.artist}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Controls */}
      <div className="player-controls">
        <div className="control-buttons">
          <button 
            onClick={playPrevious} 
            title="Previous"
            aria-label="Previous track"
          >
            ⇤
          </button>
          <button 
            onClick={togglePlayPause} 
            className="play-pause-btn"
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={isLoading}
          >
            {isLoading ? "◌" : isPlaying ? "❚❚" : "▶"}
          </button>
          <button 
            onClick={playNext} 
            title="Next"
            aria-label="Next track"
          >
            ⇥
          </button>
          <button 
            onClick={() => setIsLooping(!isLooping)} 
            className={isLooping ? "active" : ""}
            title={isLooping ? "Loop ON" : "Loop OFF"}
            aria-label={isLooping ? "Disable loop" : "Enable loop"}
            aria-pressed={isLooping}
          >
            ∞
          </button>
          <button 
            onClick={() => setAutoPlay(!autoPlay)} 
            className={autoPlay ? "active" : ""}
            title={autoPlay ? "Autoplay ON" : "Autoplay OFF"}
            aria-label={autoPlay ? "Disable autoplay" : "Enable autoplay"}
            aria-pressed={autoPlay}
          >
            ♻
          </button>
        </div>

        <div className="seek-container">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            style={{ background: progressGradient }}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          />
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span className="separator">/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniAudioPlayer;
