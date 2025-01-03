import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

function TableBookedModal({ handleClose, open, modalMessage }) {
  if (!open) return null; // Render nothing if 'open' is false

  const capitalizeEachWord = (string) => {
    if (!string) return "";
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May",
      "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const [year, month, day] = dateString.split("-");
    return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
  };

  return (
    <div className="modalBackground" onClick={handleClose}>
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={handleClose}>×</button>
          <div className="modal-body">
            <div className="checkmark">✔</div>
            <h2>Booking Confirmed</h2>
            <p className="modaltext">
              {capitalizeEachWord(modalMessage?.name || "Guest")}, your table has been
              booked successfully on {modalMessage?.date ? formatDate(modalMessage.date) : "N/A"} at {modalMessage?.time || "N/A"}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableBookedModal;
