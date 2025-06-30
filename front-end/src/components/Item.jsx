import React from "react";

const Item = ({ place }) => {
  return (
    <a href="/" className="flex flex-col gap-3">
      <img
        className="rounded-md aspect-square object-cover"
        src={place.photos[0]}
        alt="Imagem da acomodação"
      />

      <div>
        <h3 className="text-xl font-semibold">{place.title}</h3>
        <p className="truncate text-gray-600">{place.description}</p>
      </div>

      <p>
        <span className="font-semibold">R$ {place.price}</span> por noite
      </p>
    </a>
  );
};

export default Item;
