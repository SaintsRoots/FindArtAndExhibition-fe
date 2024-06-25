import React from "react";
import cardImage from "../../assets/bg-1.jpg";

const Cards = ({ name }) => {
  return (
    <div className="flex p-2 flex-col gap-4 relative hover:bg-slate-200 rounded-md  transition ease-out duration-200 hover:shadow-md">
      <div className="flex h-full ">
        <img src={cardImage} alt={name} className="  aspect-square object-cover rounded-md " />
      </div>
    </div>
  );
};

export default Cards;
