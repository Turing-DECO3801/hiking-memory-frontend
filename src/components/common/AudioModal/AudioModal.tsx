import { Button, Modal } from "react-bootstrap";
import { StringLiteral } from "typescript";

interface Props {
    show: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    audioFile: string;
    imageFile: string;
}

function AudioModel(p: Props) {

    let audio = new Audio(p.audioFile);

    const start = () => {
        audio.play();
      }

    return(      
    <>
        <Modal show={p.show} onHide={p.handleClose} size="lg" aria-labelledy="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>Audio Memo</Modal.Title>
          </Modal.Header>
          <img src={p.imageFile}></img>
          <Modal.Body>You recored a voice Memo at this Location</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={p.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={start}>
              Play Audio
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      )

}

export default AudioModel;