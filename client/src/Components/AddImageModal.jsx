import FileBase from "react-file-base64";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { useRef, useState } from "react";
import {
  Backdrop,
  Button,
  Fade,
  IconButton,
  makeStyles,
  Modal,
} from "@material-ui/core";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "grey",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: 20,
  },
}));

export default function AddImageModal({ setMedia }) {
  const classes = useStyles();
  const [modalOpen, setOpen] = useState(false);
  const [img, setImg] = useState(
    "https://img.icons8.com/pastel-glyph/64/000000/image-file-add.png"
  );
  const [cropped, setCropped] = useState("");
  const cropperRef = useRef(img);
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setImg("https://img.icons8.com/pastel-glyph/64/000000/image-file-add.png");
    setOpen(false);
  };

  const sendMedia = () => {
    setMedia(cropped);
    handleModalClose();
  };

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    setCropped(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <>
      <IconButton onClick={handleModalOpen} style={{ marginTop: 15 }}>
        <AddPhotoAlternateIcon style={{ color: "#ffffff" }} />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <div
              style={{
                marginBottom: 20,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {img !==
              "https://img.icons8.com/pastel-glyph/64/000000/image-file-add.png" ? (
                <Cropper
                  src={img}
                  style={{ maxHeight: "50vh", maxWidth: "50vw" }}
                  initialAspectRatio={1 / 1}
                  guides={true}
                  crop={onCrop}
                  ref={cropperRef}
                />
              ) : (
                <img
                  style={{ maxHeight: "30vh", maxWidth: "50vw" }}
                  src={img}
                  alt="Oops!"
                />
              )}
            </div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setImg(base64);
              }}
            />
            <Button
              disabled={
                img ===
                "https://img.icons8.com/pastel-glyph/64/000000/image-file-add.png"
                  ? true
                  : false
              }
              style={{
                marginTop: 20,
                background: "#0063B2",
                fontWeight: "bold",
                color: "#ffffff",
              }}
              fullWidth
              onClick={sendMedia}
              variant="contained"
            >
              done
            </Button>
            <Button
              style={{
                marginTop: 20,
                background: "#b22222",
                fontWeight: "bold",
                color: "#ffffff",
              }}
              fullWidth
              onClick={handleModalClose}
              variant="contained"
            >
              cancel
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
