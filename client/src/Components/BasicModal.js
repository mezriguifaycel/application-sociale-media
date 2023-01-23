import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Form from "react-bootstrap/Form";
import { UpdatePosts } from "../Redux/PostSlice";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ el }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [updatedPost, setUpdatedPost] = React.useState({
    _id: el._id,
  });
  const HandleChange = (e) => {
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Button className="btnn" onClick={handleOpen}>
        Update
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Romplir Les Formulaires
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Form.Control
              onChange={HandleChange}
              name="title"
              type="text"
              placeholder="Nouveau Tittre"
            />

            <Form.Control
              onChange={HandleChange}
              name="Des"
              type="text"
              placeholder="Nouveau Description"
            />
          </Typography>
          {/* update func*/}
          <Button
            onClick={() => {
              dispatch(UpdatePosts(updatedPost));
              handleClose();
            }}
            className="btnn"
          >
            Update
          </Button>
          <Button className="btn" onClick={handleClose}>
            exit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
