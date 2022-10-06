import React, { useState, useRef } from 'react';
import { FiImage, FiEdit3, FiFileText, FiHeadphones, FiChevronLeft, FiX, FiSave } from "react-icons/fi";
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
  const [image, setImage] = useState<any>(null);
  const [imagePopup, setImagePopup] = useState(false);
  const [notesText, setNotesText] = useState("");

  const notesRef = useRef<HTMLTextAreaElement>(null);

  // const audio = new Audio(audioFile);

  // const start = () => {
  //   audio.play();
  // }

  const preventPropogation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }

  const onNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotesText(event.currentTarget.value);
    if (notesRef.current !== null) {
      notesRef.current.style.height = (notesRef.current.scrollHeight) + "px";
    }
  }

  const uploadHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event !== null && event.target !== null && event.target.files !== null) {
      setImage(event.target.files[0])
    }
  }

  const getImage = () => {
    if (image !== null) {
      const source = URL.createObjectURL(image);
      return (
        <div className="image-container" onClick={() => setImagePopup(true)} >
          <img
            src={source}
            className="modal-image"
          />
        </div>
      );
    }
    return (
      <label className="modal-option">
        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={uploadHandler}/>
        <FiImage className="modal-option-icon"/>
        <h5>Add Image</h5>
      </label>
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

  const getImagePopUp = () => {
    if (image !== null) {
      return (
        <div className={`image-box-container ${imagePopup ? "" : "image-box-inactive"}`} onClick={() => setImagePopup(false)}>
          <div className="image-box-exit">
            <FiX className="exit-icon"/>
          </div>
          <div className="popup-image-container">
            <img src={URL.createObjectURL(image)} className="popup-image"/>
          </div>
        </div>
      )
    }
  }

  const defaultTab =() => {
    return (
      <>
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
              onClick={() => setTabDisplay(1)}
            >
              <FiEdit3 className="modal-option-icon"/>
              <h5>Notes</h5>
            </div>
          </div>
          <div className="divider"/>
          <div className={`modal-section ${transcriptDisplayed ? "show-transcript" : ""}`}>
            <div
              className="modal-option"
              onClick={() => setTabDisplay(2)}
            >
              <FiFileText className="modal-option-icon"/>
              <h5>Audio Transcript</h5>
            </div>
          </div>
        <div
          className="modal-option"
          onClick={() => setTabDisplay(3)}
        >
          <FiHeadphones className="modal-option-icon"/>
          <h5>Listen to Audio Memo</h5>
        </div>
        <div className="divider"/>
      </>
    )
  }

  const notesTab = () => {
    return (
      <>
        <div className="bar-container">
          <div className="bar"/>
        </div>
        <div className="modal-nav" >
          <div className="notes-options">
            <div className="nav-back" onClick={() => setTabDisplay(0)}>
              <FiChevronLeft className="back-icon"/>
              Back
            </div>
            <div className="nav-save" >
              <FiSave className="save-icon"/>
              Save
            </div>
          </div>
          <div className="modal-option">
            <FiEdit3 className="modal-option-icon"/>
            <h5>Notes</h5>
          </div>
          <textarea
            placeholder="Click to Add Notes!"
            ref={notesRef}
            value={notesText}
            className="audio-modal-notes audio-modal-content"
            onChange={onNotesChange}
          />
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

  const audioTab = () => {
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
      </>
    )
  }
  
  return(
    <>
    <div className="audio-modal-outline" >
      <div className={`audio-modal-container ${show ? "" : "behind"}`} {...handlers}>
        <div className={`audio-modal ${show && tabDisplay === 0 ? "" : "hidden"}`} onClick={(e) => preventPropogation(e)}>
          {
            defaultTab()
          }
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
        <div className={`audio-modal ${show && tabDisplay === 3 ? "" : "hidden"}`} {...handlers}>
          {
            audioTab()
          }
        </div>
      </div>
    </div>
    {
      getImagePopUp()
    }
    </>
  );
}


export default AudioModal;