"use client";
import Image from "next/image";
import Index from "./components/Index";
import UserInfo from "./components/UserInfo";
import { useRef, useState } from "react";
import Modal from "./components/Modal";
import MyModal from "./components/Modal";

export default function Home() {
  const [selectDateTime, setSelectDateTime] = useState({
    date: null,
    time: null,
  });
  const [isRouteComponent, setisRouteComponent] = useState(true);
  const [isShowUserInput, setIsShowUserInput] = useState(false);
  const [isTimeSlot, setIsTimeSlot] = useState(false);
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
    console.log(userName.current.value);
    console.log(numberOfGuest.current.value);
    console.log(contactNumber.current.value);
    setModalMessage({
      name: userName.current.value,
      numberOfGuest: numberOfGuest.current.value,
      date: selectDateTime.date,
      time: selectDateTime.time,
    });
    const response = await fetch("/api/bookings", {
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
    console.log(res);
    if (res?.message) {
      handleOpen();
    }
    setisRouteComponent(true);
  };

  return (
    <>
      {isRouteComponent ? (
        <Index
          selectDateTime={selectDateTime}
          setSelectDateTime={setSelectDateTime}
          setisRouteComponent={setisRouteComponent}
          isTimeSlot={isTimeSlot}
          setIsTimeSlot={setIsTimeSlot}
          setIsShowUserInput={setIsShowUserInput}
        />
      ) : (
        <UserInfo
          selectDateTime={selectDateTime}
          userName={userName}
          numberOfGuest={numberOfGuest}
          contactNumber={contactNumber}
          handleForm={handleForm}
          setisRouteComponent={setisRouteComponent}
          isShowUserInput={isShowUserInput}
        />
      )}
      <MyModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        modalMessage={modalMessage}
      />
    </>
  );
}
