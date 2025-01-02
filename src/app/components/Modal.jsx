import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaCheck } from "react-icons/fa";

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

function MyModal({ handleClose, handleOpen, open, modalMessage }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modal_div">
              <span>
                <FaCheck />
              </span>
              <h2>Booking Confirmed</h2>
              <p>
                {modalMessage.name} Your table of {modalMessage.date} {""}at{""}
                {modalMessage.time} has booked succesfully
              </p>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default MyModal;
