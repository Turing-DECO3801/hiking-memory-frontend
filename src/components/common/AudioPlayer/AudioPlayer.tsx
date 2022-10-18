import React, { useState, useRef, useEffect } from 'react'
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

  /**
   * Updates the settings of the audio file every time the
   * audio file plays so it returns back to the starting configuration
   * for visual functionality.
   */
  useEffect(() => {
    setIsPlaying(false);
    if (audioPlayer.current !== undefined) {
      const timer = setInterval(() => {
        if (audioPlayer.current === null) {
            clearTimeout(timer);
        }
        if (audioPlayer.current !== null && audioPlayer.current!.duration
          && !isNaN(audioPlayer.current!.duration)) {
            const seconds = Math.floor(audioPlayer.current!.duration);
            setDuration(seconds);
            progressBar.current.max = seconds;
            clearTimeout(timer);
        }
      }, 10)
    }
  }, [audioFile])

  /**
   * Calculates the formatted time
   * 
   * @param secs Number of seconds
   * @returns Minute and second formatted string
   */
  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  /**
   * Toggles the current state of the play/pause button
   */
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

  /**
   * Repeated updates to the styling and progress bar of the audio player
   */
  const whilePlaying = () => {
    if (audioPlayer.current !== undefined && audioPlayer.current !== null) {
      progressBar.current.value = audioPlayer.current!.currentTime;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  }

  /**
   * Updates the range of the progress bar
   */
  const changeRange = () => {
    if (audioPlayer.current !== undefined && audioPlayer.current !== null) {
      audioPlayer.current!.currentTime = progressBar.current.value;
      changePlayerCurrentTime();
    }
  }

  /**
   * Changes the current time shown on the audio memo player
   */
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--progress', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  return (
    <div className="audio-player">
      <div className="progress-bar-container">
        <audio ref={audioPlayer} src={audioFile} ></audio>
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