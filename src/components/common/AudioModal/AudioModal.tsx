import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { isNotEmittedStatement, StringLiteral } from "typescript";
import { FiImage, FiEdit3, FiFileText, FiHeadphones, FiChevronLeft } from "react-icons/fi";
import { useSwipeable, DOWN, SwipeEventData } from 'react-swipeable'; 
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";

import "./AudioModal.scss"

interface Props {
    show: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    audioFile: string;
    imageFile: string;
}

function AudioModal( { show, handleClose, handleOpen, audioFile, imageFile }: Props) {

  const [hidden, setHidden] = useState(false);
  const [notesDisplayed, setNotesDisplayed] = useState(false);
  const [transcriptDisplayed, setTranscriptDisplayed] = useState(false);
  const [memoDisplayed, setMemoDisplayed] = useState(false);
  const [tabDisplay, setTabDisplay] = useState(0);

  // const audio = new Audio(audioFile);

  // const start = () => {
  //   audio.play();
  // }

  const preventPropogation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }

  const getImage = () => {
    // if (false) {
    //   return (
    //     <div className="audio-modal-image">
    //     </div>
    //   );
    // }
    return (
      <div className="modal-option">
        <FiImage className="modal-option-icon"/>
        <h5>Add Image</h5>
      </div>
    );
  }

  const hideModal = () => {
    if (show) {
      handleClose();
      setHidden(true);
    }
  }

  const handleSwiped = (eventData: SwipeEventData) => {
    if (eventData.dir === DOWN) {
      hideModal();
    }
  }

  const handlers = useSwipeable({
    onSwiped: handleSwiped,
    touchEventOptions: { passive: false },
    preventScrollOnSwipe: true,
  });

  const notesTab = () => {
    return (
      <>
        <div className="bar-container">
          <div className="bar"/>
        </div>
        <div className="modal-nav" >
          <div className="nav-back" onClick={() => setTabDisplay(0)}>
            <FiChevronLeft className="back-icon"/>
            Back
          </div>
          <div className="modal-option">
            <FiEdit3 className="modal-option-icon"/>
            <h5>Notes</h5>
          </div>
          <div className="audio-modal-notes audio-modal-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae tincidunt velit. Suspendisse elementum ex eget fermentum hendrerit... 
          </div>
        </div>
      </>
    );
  }

  const audioTranscriptTab = () => {
    return (
      <>
        <div className="bar-container">
          <div className="bar"/>
        </div>
        <div className="modal-nav" >
          <div className="nav-back" onClick={() => setTabDisplay(0)}>
            <FiChevronLeft className="back-icon"/>
            Back
          </div>
          <div className="modal-option">
            <FiFileText className="modal-option-icon"/>
            <h5>Audio Transcript</h5>
          </div>
          <div className="audio-modal-notes audio-modal-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae tincidunt velit. Suspendisse elementum ex eget fermentum hendrerit... 
          </div>
        </div>
      </>
    );
  }
  
  return(
    <div className={`audio-modal-container ${show ? "" : "behind"}`} {...handlers}>
      <div className={`audio-modal ${show && tabDisplay === 0 ? "" : "hidden"}`} onClick={(e) => preventPropogation(e)}>
        <div className="bar-container">
          <div className="bar"/>
        </div>
        {
          getImage()
        }
        <div className="divider"/>
        <div className={`modal-section ${notesDisplayed ? "show-notes" : ""}`}>
          <div
            className="modal-option"
            onClick={() => setNotesDisplayed(!notesDisplayed)}
          >
            <FiEdit3 className="modal-option-icon"/>
            <h5>Notes</h5>
          </div>
          <div className="audio-modal-notes audio-modal-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae tincidunt velit. Suspendisse elementum ex eget fermentum hendrerit...
            <span className="show-more" onClick={() => setTabDisplay(1)}>show more</span> 
          </div>
        </div>
        <div className="divider"/>
        <div className={`modal-section ${transcriptDisplayed ? "show-transcript" : ""}`}>
          <div
            className="modal-option"
            onClick={() => setTranscriptDisplayed(!transcriptDisplayed)}
          >
            <FiFileText className="modal-option-icon"/>
            <h5>Audio Transcript</h5>
          </div>
          <div className="audio-modal-transcript audio-modal-content">
            Hello
            <span className="show-more" onClick={() => setTabDisplay(2)}>show more</span> 
          </div>
        </div>
        <div className="divider"/>
        <div className={`modal-section ${memoDisplayed ? "show-audio" : ""}`}>
          <div
            className="modal-option"
            onClick={() => setMemoDisplayed(!memoDisplayed)}
          >
            <FiHeadphones className="modal-option-icon"/>
            <h5>Listen to Audio Memo</h5>
          </div>
          <div className="audio-modal-memo audio-modal-content">
            <AudioPlayer audioFile={audioFile}/>
          </div>
        </div>
      </div>
      <div className={`audio-modal ${show && tabDisplay === 1 ? "" : "hidden"}`} {...handlers}>
        {
          notesTab()
        }
      </div>
      <div className={`audio-modal ${show && tabDisplay === 2 ? "" : "hidden"}`} {...handlers}>
        {
          audioTranscriptTab()
        }
      </div>
    </div>
  );
}


export default AudioModal;