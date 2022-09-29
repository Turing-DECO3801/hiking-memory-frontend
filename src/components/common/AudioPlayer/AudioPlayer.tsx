import React, { useState, useRef, useEffect } from 'react'
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"

import "./AudioPlayer.scss"

interface AudioPlayerProps {
  audioFile: string;
}

const AudioPlayer = ({ audioFile }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef<HTMLAudioElement>(null);   // reference our audio component
  const progressBar = useRef<any>(null);   // reference our progress bar
  const animationRef = useRef<any>(null);  // reference the animation

  useEffect(() => {
    if (audioPlayer.current !== undefined) {
      const timer = setInterval(() => {
        if (audioPlayer.current === null) {
            clearTimeout(timer);
        }
        if (!isNaN(audioPlayer.current!.duration)) {
            let seconds = Math.floor(audioPlayer.current!.duration);
            setDuration(seconds);
            progressBar.current.max = seconds;
            clearTimeout(timer);
        }
    }, 10)
    }
  }, []);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current!.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current!.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current!.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current!.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    // progressBar.current.style.setProperty('--progress', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
    progressBar.current.style.setProperty('--progress', `50%`)
    console.log(progressBar.current.max);
  }

  return (
    <div className="audio-player">
      <div className="progress-bar-container">
        <audio ref={audioPlayer} src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" ></audio>
        <div className="current-time">{calculateTime(currentTime)}</div>
        <div>
          <input type="range" className="progress-bar" defaultValue="0" ref={progressBar} onChange={changeRange} />
        </div>
        <div className="duration">{calculateTime(duration)}</div>
      </div>
      <div onClick={togglePlayPause} className="play-pause">
        {isPlaying ? <FaPause /> : <FaPlay className="play" />}
      </div>
    </div>
  )
}

export { AudioPlayer }