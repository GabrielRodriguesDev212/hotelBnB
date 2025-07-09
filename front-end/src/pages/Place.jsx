import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import Perk from "../components/Perk";
import Booking from "../components/Booking";

const Place = () => {
  const { user } = useUserContext();
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuest] = useState("");
  const [booking, setBooking] = useState(null);

  const numberOfDay = (date1, date2) => {
    const data1GMT = date1 + "GMT-03:00";
    const data2GMT = date2 + "GMT-03:00";

    const dataCheckin = new Date(data1GMT);
    const dataCheckout = new Date(data2GMT);

    return (
      (dataCheckout.getTime() - dataCheckin.getTime()) / (1000 * 60 * 60 * 24)
    );
  };
  useEffect(() => {
    if (place) {
      const axiosGet = async () => {
        const { data } = await axios.get("/bookings");

        setBooking(
          data.filter((booking) => {
            return booking.place._id === place._id;
          })[0]
        );
      };
      axiosGet();
    }
  }, [place]);
  useEffect(() => {
    if (id) {
      const axiosGet = async () => {
        const { data } = await axios.get(`/places/${id}`);
        setPlace(data);
      };
      axiosGet();
    }
  }, [id]);

  useEffect(() => {
    isOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (checkin && checkout && guests) {
      const nights = numberOfDay(checkin, checkout);

      const { data } = await axios.post("/bookings", {
        place: id,
        user: user._id,
        price: place.price,
        total: place.price * nights,
        checkin,
        checkout,
        guests,
        nights,
      });
      setRedirect(true);
      console.log(data);
    } else {
      alert("Coloque os dados");
    }
  };
  if (redirect) return <Navigate to="/account/bookings" />;

  if (!place) return <></>;

  return (
    <section>
      <div className="flex flex-col mx-auto  max-w-full  gap-4 sm:gap-6 p-4 sm:p-8 lg:max-w-7xl">
        {/* Titulos */}
        <div className="flex flex-col  sm:gap-1">
          <div className="text-xl sm:text-3xl font-bold"> {place.title}</div>

          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <p>{place.city}</p>
          </div>
        </div>

        {/* Booking */}

        {booking ? <Booking bookings={booking} place={true} /> : <></>}

        {/* Grade de imagens */}
        <div className="grid sm:grid-cols-[2fr_1fr] sm:grid-rows-2 aspect-square sm:aspect-[3/2] rounded-2xl overflow-hidden gap-4 relative">
          {place.photos
            .filter((photo, index) => index < 3)
            .map((photo, index) => (
              <img
                key={photo}
                className={`${index === 0 ? "row-span-2  h-full object-center" : ""} aspect-square w-full sm:object-cover hover:opacity-75 transition text-center cursor-pointer`}
                src={photo}
                alt="Imagem da Acomodação"
                onClick={() => setisOpen(true)}
              />
            ))}

          <div
            className="absolute flex right-4 bottom-4 bg-primary-400 p-2 rounded-md text-white gap-1 items-center hover:bg-primary-600  transition cursor-pointer "
            onClick={() => setisOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <p>Mostrar mais fotos</p>
          </div>

          <div
            className={`${isOpen ? "flex" : "hidden"} bg-black overflow-y-auto inset-0 fixed text-white items-start`}
          >
            <div className="flex flex-col mx-auto  max-w-full  gap-8 p-8 lg:max-w-7xl">
              <div className="grid grid-cols-1  sm:grid-cols-2  aspect-[3/2]  gap-4 ">
                {place.photos.map((photo, index) => (
                  <img
                    className={` aspect-square w-full object-cover rounded-md `}
                    src={photo}
                    alt="Imagem da Acomodação"
                    key={photo}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setisOpen(false)}
              className="bg-primary-400 rounded-full aspect-square w-10 font-bold absolute right-5 top-5  hover:bg-primary-600 transition cursor-pointer"
            >
              X
            </button>
          </div>
        </div>
        {/* Colunas */}
        <div className={`grid ${booking ? "" : "md:grid-cols-2 grid-cols-1"}`}>
          <div className="order-2 md:order-none p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="sm:text-2xl text-lg font-bold">Descrição</p>
              <p className="text-justify">{place.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="sm:text-2xl text-lg font-bold">
                Horarios e Restrições
              </p>
              <p>{`Check-in: ${place.checkin}`}</p>
              <p>{`Check-out: ${place.checkout}`}</p>
              <p>{`Número maximo de pessoas: ${place.guests}`}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="sm:text-2xl text-lg font-bold">Diferenciais</p>
              <div className="flex flex-col gap-2">
                {place.perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2">
                    <Perk perk={perk} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {booking ? (
            ""
          ) : (
            <form className="order-1 md:order-none flex flex-col gap-4 justify-self-center self-center border border-gray-300 rounded-2xl py-2 px-4 sm:py-4 sm:px-8">
              <p className="sm:text-2xl text-lg font-bold text-center">
                Preço: R$ {place.price} por noite
              </p>
              {/* Check-in e Check-out */}
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col border border-gray-300  rounded-tl-2xl  rounded-tr-2xl sm:rounded-tr-none sm:rounded-bl-2xl px-4 py-2">
                  <label htmlFor="checkin" className="font-bold">
                    Check-In
                  </label>
                  <input
                    className="w-full sm:w-auto"
                    type="date"
                    name="checkin"
                    id="checkin"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                </div>
                <div className="flex flex-col border border-gray-300 sm:border-l-0 border-t-0 sm:border-t-1  sm:rounded-tr-2xl rounded-br-2xl rounded-bl-2xl  sm:rounded-bl-none px-4 py-2">
                  <label htmlFor="checkout" className="font-bold">
                    Check-Out
                  </label>
                  <input
                    className="w-full sm:w-auto"
                    type="date"
                    name="checkout"
                    id="checkout"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                </div>
              </div>

              {/* Convidados */}
              <div className="flex flex-col border border-gray-300 rounded-2xl px-4 py-2 ">
                <label
                  htmlFor="convidados"
                  className="font-bold flex flex-col gap-2 text-center"
                >
                  Nº de Convidados
                  <input
                    className="border border-gray-300 rounded-2xl px-4 py-2"
                    type="number"
                    placeholder="2"
                    id="convidados"
                    value={guests}
                    onChange={(e) => setGuest(e.target.value)}
                  />
                </label>
              </div>
              {user ? (
                <button
                  onClick={handleBooking}
                  className="bg-primary-400 hover:bg-primary-600 rounded-full w-full py-2 px-4 text-white font-bold cursor-pointer transition text-center"
                >
                  Reservar
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="bg-gray-400 hover:bg-gray-600 rounded-full w-full py-2 px-4 text-white font-bold cursor-pointer transition text-center"
                >
                  Faça seu login
                </Link>
              )}
            </form>
          )}
        </div>

        {/* Extras */}
        <div className="bg-gray-200 rounded-2xl p-6 flex flex-col gap-2">
          <p className="sm:text-2xl text-lg font-bold">Informações Extras</p>
          <p>{place.extras}</p>
        </div>
      </div>
    </section>
  );
};

export default Place;
