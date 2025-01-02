"use client";
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
  setisRouteComponent,
  isShowUserInput,
}) => {
  return (
    <div className="container2">
      <div
        className="form_container"
        style={{ width: isShowUserInput ? "70%" : "0" }}
      >
        <div className="back_icon" onClick={() => setisRouteComponent(true)}>
          <>
            <IoMdArrowRoundBack />
          </>
        </div>
        <div className="schedule">
          <p className="heading">1 Hour Meeting</p>
          <div className="timing">
            <>
              <FaRegClock />
            </>{" "}
            <p>60 Minutes </p>
          </div>
          <div className="time_and_date">
            <>
              <CiCalendar />
            </>
            <p>
              {selectDateTime.date} {selectDateTime.time}
            </p>
          </div>
          <div className="indian_time">
            <>
              <FaEarthAmericas />
            </>
            <p>Indian Standard Time</p>
          </div>
        </div>
        <form onSubmit={handleForm}>
          <h1>Enter Details</h1>
          <div className="name">
            <label htmlFor="">Name</label>
            <input type="text" ref={userName} required />
          </div>
          <div className="number_of_guest">
            <label htmlFor="">Number Of Guests</label>
            <input type="number" ref={numberOfGuest} required />
          </div>
          <div className="phone_number">
            <label htmlFor="">Enter Your Number</label>
            <input type="number" ref={contactNumber} required />
          </div>
          <button className="btn">Schedule Event</button>{" "}
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
