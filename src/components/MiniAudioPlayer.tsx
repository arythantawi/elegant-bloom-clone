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
    url: "/audio/andmesh-anugerah-terindah.mp3"
  },
  {
    title: "Teman Hidup",
    artist: "Tulus",
    url: "/audio/tulus-teman-hidup.mp3"
  },
  {
    title: "Denganmu",
    artist: "Arsy Widianto",
    url: "/audio/arsy-widianto-denganmu.mp3"
  }
];

const MiniAudioPlayer = ({ 
  playlist = defaultPlaylist, 
  defaultRecordArt = "/lovable-uploads/838e7f90-49c0-401d-b3a7-557bc5fdc4b2.png" 
}: MiniAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [recordArt, setRecordArt] = useState(defaultRecordArt);

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
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.load();
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  }, [playlist]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % playlist.length;
    playAtIndex(nextIndex);
  };

  const playPrevious = () => {
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    playAtIndex(prevIndex);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTo = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  const handleEnded = () => {
    if (autoPlay) {
      playNext();
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [autoPlay, currentIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const progressGradient = `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${progress}%, hsl(var(--muted)) ${progress}%, hsl(var(--muted)) 100%)`;

  return (
    <div className={`mini-audio-player ${isPlaying ? "playing" : ""} ${isMinimized ? "minimized" : ""}`}>
      <audio ref={audioRef} src={currentTrack?.url} />
      
      {/* Minimize/Expand Button */}
      <button 
        className="minimize-btn"
        onClick={() => setIsMinimized(!isMinimized)}
        title={isMinimized ? "Expand Player" : "Minimize Player"}
      >
        {isMinimized ? "♫" : "−"}
      </button>
      
      {/* Spinning Record */}
      <div className="spinning-album">
        <img src={recordArt} alt="Album Art" className={isPlaying ? "spinning" : ""} />
      </div>

      {/* Playlist */}
      <div className="playlist-container">
        <ul>
          {playlist.map((track, index) => (
            <li 
              key={index} 
              className={index === currentIndex ? "active" : ""}
              onClick={() => playAtIndex(index)}
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
          <button onClick={playPrevious} title="Previous">⇤</button>
          <button onClick={togglePlayPause} className="play-pause-btn">
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button onClick={playNext} title="Next">⇥</button>
          <button 
            onClick={() => setIsLooping(!isLooping)} 
            className={isLooping ? "active" : ""}
            title={isLooping ? "Loop ON" : "Loop OFF"}
          >
            ∞
          </button>
          <button 
            onClick={() => setAutoPlay(!autoPlay)} 
            className={autoPlay ? "active" : ""}
            title={autoPlay ? "Autoplay ON" : "Autoplay OFF"}
          >
            ♻
          </button>
        </div>

        <div className="seek-container">
          <input
            type="range"
            value={progress}
            onChange={handleSeek}
            style={{ background: progressGradient }}
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
