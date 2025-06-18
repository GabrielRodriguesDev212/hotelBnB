import axios from "axios";
import React from "react";

const PhotoUploader = ({ photolink, setPhotoLink, setPhotos, photos }) => {
  const uploadByLink = async (e) => {
    e.preventDefault();
    if (photolink) {
      const { data: filename } = await axios.post("/places/upload/link", {
        link: photolink,
      });
      setPhotos((prevValue) => [...prevValue, filename]);
    } else {
      alert("Não existe nenhum link a ser enviado");
    }
  };
  return (
    <div className="flex flex-col gap-1 ">
      <label htmlFor="photos" className="text-2xl font-bold ml-2">
        Fotos
      </label>

      <div className="flex  gap-2">
        <input
          type="text"
          placeholder="Adcione uma foto pelo link"
          className="border border-gray-300 rounded-full px-4 py-2 grow "
          value={photolink}
          id="photolink"
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          onClick={uploadByLink}
          className="hover:bg-stone-600 transition bg-stone-900 cursor-pointer border border-gray-300 rounded-full px-4 py-2 text-white"
        >
          Enviar Fotos
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-2">
        {photos.map((photo) => (
          <img
            className=" aspect-square object-cover rounded-2xl border border-gray-300"
            src={`${axios.defaults.baseURL}/tmp/${photo}`}
            alt="Imagem do Lugar"
            key={photo}
          />
        ))}

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
  );
};

export default PhotoUploader;
