import React from "react";
import { Link } from "react-router-dom";

const Item = ({ place }) => {
  return (
    <Link
      to={`/place/${place._id}`}
      className="flex flex-col gap-3 hover:scale-103 transition"
    >
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
        <span className="font-semibold">
          R$ {place.price.toLocaleString("pt-BR")}
        </span>{" "}
        por noite
      </p>
    </Link>
  );
};

export default Item;
