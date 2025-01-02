"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Index = ({
  selectDateTime,
  setSelectDateTime,
  setisRouteComponent,
  isTimeSlot,
  setIsTimeSlot,
  setIsShowUserInput,
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [bookingList, setBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [today, setToday] = useState();

  console.log(selectDateTime);
  // console.log(bookingList);
  const [view, setView] = useState("day");
  const timeSlotArray = [];
  for (let hour = 10; hour <= 17; hour++) {
    const timeSlot = `${hour}:00`;
    timeSlotArray.push(timeSlot);
  }

  const handleDateChange = async (changedDate) => {
    if (!changedDate) return;
    setIsTimeSlot(true);
    const date = changedDate.format("YYYY-MM-DD");
    const bookings = await fetchBookings(date);

    setBookingList(bookings);
    setSelectDateTime({ date: date, time: null });
  };
  const handleGetDateTime = (e) => {
    setBookingList((prev) => [...prev, selectDateTime]);
  };

  const fetchBookings = async (date) => {
    setIsLoading(true);
    const response = await fetch(`/api/bookings?date=${date}`);
    const data = await response.json();
    setIsLoading(false);
    return data.bookedSlots ?? [];
  };

  useEffect(() => {
    async function getTodaysBookings() {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      const bookings = await fetchBookings(formattedDate);
      setBookingList(bookings);
      setSelectDateTime({ date: formattedDate, time: null });
    }
    setToday(new Date().toISOString().split("T")[0]);
    getTodaysBookings();
  }, []);

  const handleTime = (time) => {
    setSelectDateTime((prev) => ({ ...prev, time: time }));
    setisRouteComponent(false);
    setIsShowUserInput(true);
  };

  return (
    <>
      <div className="container">
        <div className="calenderAndTime">
          <div className="calender">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                orientation="landscape"
                onAccept={handleGetDateTime}
                onChange={handleDateChange}
                views={["year", "month", "day"]}
                value={selectedDate}
                className="custom-date-picker"
                minDate={dayjs(today)}
                slots={{
                  actionBar: () => null, // Remove OK and Cancel buttons
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="timeSlot">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    // width={140}
                    // height={40}
                    style={{ margin: "5px" }}
                    className="skeleton"
                  />
                ))
              : timeSlotArray.map((timeSlot, i) => {
                  const hour = parseInt(timeSlot.split(":")[0], 10);
                  const suffix = hour >= 12 ? "PM" : "AM";
                  const formattedHour = hour > 12 ? hour - 12 : hour;
                  const time = `${formattedHour}:00 ${suffix}`;
                  const isDisable = !!bookingList.includes(time);
                  return (
                    <button
                      key={timeSlot}
                      className={`slot ${isDisable ? "isDisable" : ""}`}
                      onClick={() => handleTime(time)}
                      disabled={isDisable}
                    >
                      {formattedHour}:00 {suffix}
                    </button>
                  );
                })}
          </div>
          <div className="color_box">
            <div className="available ">
              <span></span> <p>Available Slots</p>
            </div>
            <div className="booked ">
              <span style={{ backgroundColor: "gray" }}></span>{" "}
              <p>Booked Slots</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
