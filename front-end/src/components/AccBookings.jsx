import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Booking from "./Booking";

const AccBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/bookings");

      setBookings(data);
    };

    axiosGet();
  }, []);

  return (
    <div className="w-full max-w-7xl flex flex-col items-center gap-8">
      {bookings.map((bookings) => (
        <Booking bookings={bookings} key={bookings._id} />
      ))}
    </div>
  );
};

export default AccBookings;
