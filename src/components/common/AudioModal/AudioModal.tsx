import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { StringLiteral } from "typescript";
import { FiImage, FiEdit3, FiFileText, FiHeadphones } from "react-icons/fi";
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

  let audio = new Audio(audioFile);

  const start = () => {
    audio.play();
  }

  const preventPropogation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }

  const getImage = () => {
    if (true) {
      return (
        <div className="audio-modal-image">
        </div>
      );
    }
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
  
  return(
    <div className={`audio-modal-container ${show ? "" : "behind"}`} {...handlers}>
      <div className={`audio-modal ${show ? "" : "hidden"}`} onClick={(e) => preventPropogation(e)}>
        <div className="bar-container">
          <div className="bar"/>
        </div>
        {
          getImage()
        }
        <div className="divider"/>
        <div className={`modal-section ${notesDisplayed ? "show-section" : ""}`}>
          <div
            className="modal-option"
            onClick={() => setNotesDisplayed(!notesDisplayed)}
          >
            <FiEdit3 className="modal-option-icon"/>
            <h5>Notes</h5>
          </div>
          <div className="audio-modal-notes audio-modal-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae tincidunt velit. Suspendisse elementum ex eget fermentum hendrerit... 
          </div>
        </div>
        <div className="divider"/>
        <div className={`modal-section ${transcriptDisplayed ? "show-section" : ""}`}>
          <div
            className="modal-option"
            onClick={() => setTranscriptDisplayed(!transcriptDisplayed)}
          >
            <FiFileText className="modal-option-icon"/>
            <h5>Audio Transcript</h5>
          </div>
          <div className="audio-modal-transcript audio-modal-content">
            Hello
          </div>
        </div>
        <div className="divider"/>
        <div className={`modal-section ${memoDisplayed ? "show-section" : ""}`}>
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
    </div>
    // <Modal show={show} onHide={handleClose} size="lg" aria-labelledy="contained-modal-title-vcenter" centered>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Voice Recording</Modal.Title>
    //   </Modal.Header>
    //   <img src={imageFile}></img>
    //   <Modal.Body>You have recored a voice memo at this location.</Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={handleClose}>
    //       Close
    //     </Button>
    //     <Button variant="primary" onClick={start}>
    //       Play Audio
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
  );
}


export default AudioModal;