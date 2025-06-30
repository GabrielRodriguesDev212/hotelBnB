import React, { useEffect, useState } from "react";
import Perks from "./Perks";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import PhotoUploader from "./PhotoUploader";

const NewPlace = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photolink, setPhotoLink] = useState("");
  const [description, setDescription] = useState();
  const [extras, setExtras] = useState("");
  const [price, setPrice] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [perks, setPerks] = useState([]);

  useEffect(() => {
    if (id) {
      const axiosGet = async () => {
        const { data } = await axios.get(`/places/${id}`);

        setTitle(data.title);
        setCity(data.city);
        setPhotos(data.photos);
        setDescription(data.description);
        setExtras(data.extras);
        setPrice(data.price);
        setCheckin(data.checkin);
        setCheckout(data.checkout);
        setGuests(data.guests);
        setPerks(data.perks);
      };
      axiosGet();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      title &&
      city &&
      photos.length > 0 &&
      description &&
      price &&
      checkin &&
      checkout &&
      guests
    ) {
      console.log("Todos foram preenchidos.");

      if (id) {
        try {
          const modifiedPlace = await axios.put(`/places/${id}`, {
            title,
            city,
            photos,
            description,
            extras,
            perks,
            price,
            checkin,
            checkout,
            guests,
          });
        } catch (error) {
          console.log(error);
          alert("Erro ao tentar atualizar o novo lugar!");
        }
      } else {
        try {
          const newPlaceDoc = await axios.post("/places", {
            owner: user._id,
            title,
            city,
            photos,
            description,
            extras,
            perks,
            price,
            checkin,
            checkout,
            guests,
          });
        } catch (error) {
          console.log(error);
          alert("Erro ao tentar criar o novo lugar!");
        }
        console.log(newPlaceDoc);
      }

      setRedirect(true);
    } else {
      alert("Preencha todos os campos!");
    }
  };

  if (redirect) return <Navigate to="/account/places" />;

  return (
    <form onSubmit={handleSubmit} className="w-full px-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-2xl font-bold ml-2">
          Título
        </label>
        <input
          type="text"
          placeholder="Digite o título do seu anúncio"
          className="border border-gray-300 rounded-full px-4 py-2"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1 ">
        <label htmlFor="city" className="text-2xl font-bold ml-2">
          Cidade e País
        </label>
        <input
          type="text"
          placeholder="Digite a cidade e país do seu anúncio"
          className="border border-gray-300 rounded-full px-4 py-2 "
          value={city}
          id="city"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <PhotoUploader {...{ photolink, setPhotoLink, setPhotos, photos }} />

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-2xl font-bold ml-2">
          Descrição
        </label>
        <textarea
          placeholder="Digite a descrição do seu anúncio"
          className="border border-gray-300 rounded-2xl px-4 py-2 h-56 resize-none"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="perks" className="text-2xl font-bold ml-2">
          Comodidades
        </label>

        <Perks perks={perks} setPerks={setPerks} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="extras" className="text-2xl font-bold ml-2">
          Informações Extras
        </label>
        <textarea
          placeholder="Digite as informações extras do seu anúncio"
          className="border border-gray-300 rounded-2xl px-4 py-2 h-56 resize-none"
          id="extras"
          value={extras}
          onChange={(e) => setExtras(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold ml-2">Restriçoes e Preços</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-6">
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="price">
              Preço
            </label>

            <input
              type="number"
              placeholder="500"
              className="border border-gray-300 rounded-full px-4 py-2 "
              value={price}
              id="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkin">
              Check-in
            </label>

            <input
              type="text"
              placeholder="16:00"
              className="border border-gray-300 rounded-full px-4 py-2 "
              value={checkin}
              id="checkin"
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkout">
              Check-out
            </label>

            <input
              type="text"
              placeholder="21:00"
              className="border border-gray-300 rounded-full px-4 py-2 "
              value={checkout}
              id="checkout"
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="guests">
              N° Convidados
            </label>

            <input
              type="number"
              placeholder="4"
              className="border border-gray-300 rounded-full px-4 py-2 "
              value={guests}
              id="guests"
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button className="bg-primary-400 cursor-pointer rounded-full px-4 py-2 transition text-white  hover:bg-primary-600">
        Salvar Informações
      </button>
    </form>
  );
};

export default NewPlace;
