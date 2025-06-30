import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NewPlace from "./NewPlace";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const AccPlaces = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/places/owner");
      setPlaces(data);
    };

    axiosGet();
  }, [action]);

  return (
    <div className="w-full max-w-7xl flex flex-col items-center ">
      {action !== "new" ? (
        <div className="flex flex-col gap-8 items-center w-full">
          <Link
            to="/account/places/new"
            className="min-w-44  bg-primary-400 cursor-pointer rounded-full px-4 py-2 transition text-white flex gap-2 hover:bg-primary-600"
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
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Adcionar novo lugar
          </Link>

          {places.map((place) => (
            <Link
              to={`/account/places/new/${place._id}`}
              className="flex bg-gray-100 rounded-2xl p-6 gap-6 items-center cursor-pointer w-full max-w-6xl"
              key={place._id}
            >
              <img
                className="max-w-56 object-cover aspect-square rounded-md"
                src={place.photos[0]}
                alt="Foto da Acomodação"
              />

              <div className="flex flex-col gap-2">
                <p className="text-2xl font-medium">{place.title}</p>
                <p>{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <NewPlace />
      )}
    </div>
  );
};

export default AccPlaces;
