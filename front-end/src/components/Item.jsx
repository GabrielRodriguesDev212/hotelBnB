import React from "react";

const Item = () => {
  return (
    <a href="/" className="flex flex-col gap-3">
      <img
        className="rounded-md aspect-square object-cover"
        src="https://ciadasamalia.com.br/wp-content/uploads/2023/11/decoracao-de-quarto-grande.jpg"
        alt="Imamagem da acomodação"
      />

      <div>
        <h3 className="text-xl font-semibold">São Paulo, SP</h3>
        <p className="truncate text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries.
        </p>
      </div>

      <p>
        <span className="font-semibold">R$ 550</span> por noite
      </p>
    </a>
  );
};

export default Item;
