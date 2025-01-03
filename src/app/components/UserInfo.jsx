"use client";
import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaEarthAmericas } from "react-icons/fa6";

const UserInfo = ({
  userName,
  numberOfGuest,
  contactNumber,
  handleForm,
  selectDateTime,
  setIsDateTimeSelected,
  isShowUserInput,
}) => {
  const [nameError, setNameError] = useState("");
  const [guestError, setGuestError] = useState("");
  const [contactError, setContactError] = useState("");

  const validateForm = (event) => {
    let isValid = true;
    // Name validation
    const nameValue = userName.current.value.trim();
    if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      setNameError("Name can only contain alphabets.");
      isValid = false;
    } else {
      setNameError("");
    }

    // Guest validation
    const guestValue = parseInt(numberOfGuest.current.value);
    if (isNaN(guestValue) || guestValue < 2 || guestValue > 10) {
      setGuestError("Number of guests must be 2 to 10.");
      isValid = false;
    } else {
      setGuestError("");
    }

    // Contact number validation
    const contactValue = contactNumber.current.value.trim();
    if (!/^\d{10}$/.test(contactValue)) {
      setContactError("Contact number must be exactly 10 digits.");
      isValid = false;
    } else {
      setContactError("");
    }

    if (isValid) {
      handleForm(event);
    }
  };

  return (
    <div className="container2">
      <div
        className="form_container"
        style={{ width: isShowUserInput ? "70%" : "0" }}
      >
        <div className="back_icon" onClick={() => setIsDateTimeSelected(true)}>
          <IoMdArrowRoundBack />
        </div>
        <div className="schedule">
          <p className="heading">1 Hour Meeting</p>
          <div className="timing">
            <FaRegClock />
            <p>60 Minutes</p>
          </div>
          <div className="time_and_date">
            <CiCalendar />
            <p>
              {selectDateTime.date} {selectDateTime.time}
            </p>
          </div>
          <div className="indian_time">
            <FaEarthAmericas />
            <p>Indian Standard Time</p>
          </div>
        </div>
        <form onSubmit={validateForm}>
          <h1>Enter Details</h1>

          <div className="name">
            <input type="text" ref={userName} placeholder="Enter Your Name" required />
            {nameError && <p className="error">{nameError}</p>}
          </div>

          <div className="number_of_guest">
            <input type="number" ref={numberOfGuest} placeholder="Number of Guest" required />
            {guestError && <p className="error">{guestError}</p>}
          </div>

          <div className="phone_number">
            <input type="number" ref={contactNumber} placeholder="Mobile Number"required />
            {contactError && <p className="error">{contactError}</p>}
          </div>

          <button type="submit" className="btn">
            Schedule Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
