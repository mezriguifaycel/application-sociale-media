import { useSelector } from "react-redux";
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Form from "react-bootstrap/Form";
const style = {
  position: "absolute",
  top: "80%",
  left: "50%",

  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ el }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const User = useSelector((state) => state.User.user);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} endIcon={<SendIcon />}></Button>
      <Modal hideBackdrop open={open} onClose={handleCloseModal}>
        <Box sx={{ ...style, width: 550, height: 200 }}>
          <Form.Control
            name="Email"
            type="text"
            placeholder=""
            value={el?.owner?.email}
          />

          <Form.Control
            name="Message"
            type="text"
            placeholder="Enter Message"
          />
          <Button>Send</Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default ChildModal;
