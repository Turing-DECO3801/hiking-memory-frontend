import React, { useState, useRef, useEffect, useContext } from 'react';
import { FiImage, FiEdit3, FiFileText, FiHeadphones, FiChevronLeft, FiX, FiSave } from "react-icons/fi";
import { useSwipeable, DOWN, SwipeEventData } from 'react-swipeable'; 
import { AuthContext } from '../../../contexts/AuthContext';
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { updateMemoNotes, updateImage } from '../../../api';

import "./AudioModal.scss"

interface Props {
    show: boolean,
    handleClose: () => void,
    id: number,
    audioFile: string,
    imageFile: string,
    notes: string,
    transcript: string,
}

function AudioModal( { show, handleClose, id, audioFile, imageFile, notes,
                      transcript }: Props) {

  /**
   * Email and Password references for API 
   */
  const { email, password } = useContext(AuthContext)

  /**
   * Use State hooks for display changes
   */
  const [hidden, setHidden] = useState(false);
  const [notesDisplayed, setNotesDisplayed] = useState(false);
  const [transcriptDisplayed, setTranscriptDisplayed] = useState(false);
  const [memoDisplayed, setMemoDisplayed] = useState(false);
  const [tabDisplay, setTabDisplay] = useState(0);
  const [image, setImage] = useState<any>(null);
  const [imagePopup, setImagePopup] = useState(false);
  const [notesText, setNotesText] = useState("");

  /**
   * Reference for height changes of the Notes input section
   */
  const notesRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Updates the currently set value of the notes section one keyboard
   * press
   * 
   * @param event Input Change Event
   */
  const onNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotesText(event.currentTarget.value);
    if (notesRef.current !== null) {
      notesRef.current.style.height = (notesRef.current.scrollHeight) + "px";
    }
  }

  /**
   * Hnadles the setting and uploading of image when a new one has been uploaded
   * 
   * @param event File Input Change
   */
  const uploadHandler = async (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    
    const file = event.target.files[0];

    // Set image
    const url = URL.createObjectURL(file);
    setImage(url);

    // Read image and send to backend
    const reader = new FileReader();
    reader.onloadend = async (e) => {
      const fileData = e?.target?.result
      const data = await updateImage(fileData, id, email as string, password as string);
    };

    reader.readAsBinaryString(file);
  }

  /**
   * Updates the notes and transcription when the audio memo selection
   * has changed.
   */
  useEffect(() => {
    if (notes === null) {
      setNotesText("");
    } else {
      setNotesText(notes);
    }
  }, [notes])

  /**
   * Updates the notes and transcription when the audio memo selection
   * has changed.
   */
  useEffect(() => {
    if (imageFile !== null && imageFile !== undefined) {
      setImage(imageFile);
    } else {
      setImage(null);
    }
  }, [imageFile])

  /**
   * Save the notes by sending data to the backend for storage in the
   * database.
   */
  const saveNotes = () => {
    updateMemoNotes(notesText, id, email as string, password as string);
  }

  /**
   * Checks if an image already exists, if it does, then it will 
   * be displayed, if not, then an option to add an image will be
   * shown.
   * 
   * @returns Image Add or Display React Component
   */
  const getImage = () => {
    if (image !== null && image !== undefined) {
      const source = image;
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

  /**
   * Handles the closing of the menu
   */
  const hideModal = () => {
    if (show) {
      setTabDisplay(0);
      handleClose();
      setHidden(true);
    }
  }

  /**
   * Swipe event that is called once a swipe has occurred
   * on the audio menu
   * 
   * @param eventData Swipe Event Data 
   */
  const handleSwiped = (eventData: SwipeEventData) => {
    if (eventData.dir === DOWN) {
      hideModal();
    }
  }

  /**
   * Handlers for swipeable features for closing the menu
   */
  const handlers = useSwipeable({
    onSwiped: handleSwiped,
    touchEventOptions: { passive: false },
    preventScrollOnSwipe: true,
  });

  /**
   * Checks if an image exists for the current audio memo,
   * if it does, then return the component for it.
   * 
   * @returns Image React Component
   */
  const getImagePopUp = () => {
    if (image !== null) {
      return (
        <div className={`image-box-container ${imagePopup ? "" : "image-box-inactive"}`} onClick={() => setImagePopup(false)}>
          <div className="image-box-exit">
            <FiX/>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <label className="update-button">
              <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={uploadHandler}/>
              Update
            </label>
          </div>
          <div className="popup-image-container">
            <img src={image} className="popup-image"/>
          </div>
        </div>
      )
    }
  }

  /**
   * React Component for the audio options tab
   * 
   * @returns Default Menu React Component
   */
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

  /**
   * React Component for the Notes Tab
   * 
   * @returns React Component
   */
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
            <div className="nav-save" onClick={saveNotes}>
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

  /**
   * React Component for the Audio Transcript Tab
   * 
   * @returns Transcript React Component
   */
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

  /**
   * React Component for the Audio Player Tab
   * 
   * @returns Audio Player React Component
   */
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
        <div className={`audio-modal ${show && tabDisplay === 0 ? "" : "hidden"}`} onClick={(e) => e.stopPropagation()}>
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