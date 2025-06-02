import React from "react";
import Item from "../components/Item";

const Home = () => {
  return (
    <div>
      <section>
        <div className="mx-auto grid max-w-full grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-8 p-8 lg:max-w-7xl">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </section>
    </div>
  );
};

export default Home;
