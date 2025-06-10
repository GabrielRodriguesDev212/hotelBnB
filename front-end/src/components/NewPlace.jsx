import React, { useState } from "react";

const NewPlace = () => {
  const [title, setTitle] = useState();
  const [city, setCity] = useState();
  const [photos, setPhotos] = useState();

  return (
    <div className="w-full px-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-2xl font-bold ml-2">
          Título
        </label>
        <input
          type="text"
          placeholder="Digite o título do seu anúncio"
          className="border border-gray-300 rounded-full px-4 py-2 "
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

      <div className="flex flex-col gap-1 ">
        <label htmlFor="photos" className="text-2xl font-bold ml-2">
          Fotos
        </label>

        <div className="flex  gap-2">
          <input
            type="text"
            placeholder="Adcione uma foto pelo link"
            className="border border-gray-300 rounded-full px-4 py-2 grow "
            value={photos}
            id="photos"
            onChange={(e) => setPhotos(e.target.value)}
          />
          <button className="hover:bg-gray-300 transition bg-gray-200 cursor-pointer border border-gray-300 rounded-full px-4 py-2 text-black">
            Enviar Fotos
          </button>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-2">
          <label
            htmlFor="file"
            className="cursor-pointer aspect-square rounded-2xl border border-gray-300 flex items-center justify-center gap-2 transition hover:bg-gray-100"
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
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
            <input type="file" id="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NewPlace;
