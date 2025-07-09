import React from "react";
import { Link } from "react-router-dom";

const Booking = ({ bookings, place = false }) => {
  return (
    <div className="w-full">
      <Link
        to={`/place/${bookings.place._id}`}
        className={`flex bg-gray-100 rounded-2xl p-6 gap-6 items-center w-full max-w-7xl ${place ? "cursor-auto" : ""}`}
        key={bookings.place._id}
      >
        {place ? (
          ""
        ) : (
          <img
            className="max-w-56 object-cover aspect-square rounded-md"
            src={bookings.place.photos[0]}
            alt="Foto da Acomodação"
          />
        )}

        <div className="flex flex-col gap-2">
          {place ? (
            <p className="text-2xl font-medium">Você já tem uma reserva!</p>
          ) : (
            <p className="text-2xl font-medium">
              {bookings.place.title} - Reservado
            </p>
          )}

          <div>
            <p>
              <span className="font-bold">Check-in: </span>{" "}
              {new Date(bookings.checkin + "GMT-03:00").toLocaleDateString(
                "pt-BR"
              )}
            </p>
            <p>
              <span className="font-bold">Check-out: </span>
              {new Date(bookings.checkout + "GMT-03:00").toLocaleDateString(
                "pt-BR"
              )}
            </p>

            <p>
              <span className="font-bold">Convidados: </span>
              {bookings.guests}
            </p>
            <p>
              <span className="font-bold">Noites: </span>
              {bookings.nights}
            </p>
            <p>
              <span className="font-bold">Preço: </span>
              R$ {bookings.total.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Booking;
