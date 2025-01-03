"use client";
import UserInfo from "./components/UserInfo";
import { useRef, useState } from "react";
import BookingDateTime from "./components/BookingDateTime";
import TableBookedModal from "./components/Modal";

export default function Home() {
  const [selectDateTime, setSelectDateTime] = useState({
    date: null,
    time: null,
  });
  const [isDateTimeSelected, setIsDateTimeSelected] = useState(true);
  const [isShowUserInput, setIsShowUserInput] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userName = useRef();
  const numberOfGuest = useRef();
  const contactNumber = useRef();
  const [modalMessage, setModalMessage] = useState({
    name: null,
    numberOfGuest: null,
    date: null,
    time: null,
  });


  const handleForm = async (e) => {
    e.preventDefault();
    setModalMessage({
      name: userName.current.value,
      numberOfGuest: numberOfGuest.current.value,
      date: selectDateTime.date,
      time: selectDateTime.time,
    });
    const response = await fetch("https://table-booking-pied.vercel.app/api/bookings", {
      method: "POST",
      body: JSON.stringify({
        date: selectDateTime.date,
        time: selectDateTime.time,
        name: userName.current.value,
        contact: contactNumber.current.value,
        guests: numberOfGuest.current.value,
      }),
    });
    const res = await response.json();
    if (res?.message) {
      handleOpen();
    }
    setIsDateTimeSelected(true);
  };

  return (
    <>
      {isDateTimeSelected ? (
        <BookingDateTime
          selectDateTime={selectDateTime}
          setSelectDateTime={setSelectDateTime}
          setIsDateTimeSelected={setIsDateTimeSelected}
          setIsShowUserInput={setIsShowUserInput}
        />
      ) : (
        <UserInfo
          selectDateTime={selectDateTime}
          userName={userName}
          numberOfGuest={numberOfGuest}
          contactNumber={contactNumber}
          handleForm={handleForm}
          setIsDateTimeSelected={setIsDateTimeSelected}
          isShowUserInput={isShowUserInput}
        />
      )}
      <TableBookedModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        modalMessage={modalMessage}
      />
    </>
  );
}
