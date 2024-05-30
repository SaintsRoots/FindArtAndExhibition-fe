import Button from "../components/form/Button";
import { FaCartPlus } from "react-icons/fa";

const ArtsCard = ({ name, price, image, key, money }) => {
  return (
    <div className="flex flex-col gap-4 " key={key}>
      <div className="max-h-[300px] overflow-hidden  ">
        <img src={image} alt={name} className=" aspect-square  " />
      </div>
      <div className="flex justify-between items-start gap-2 ">
        <div className="flex flex-col leading-6 ">
          <h1 className="text-sm font-nomal text-gray-500 text-nowrap  capitalize">
            {name}
          </h1>
          <p className="text-sm text-slate-700 font-ligh capitalize">
            {price} {money}
          </p>
        </div>
        <Button icon={<FaCartPlus />} styles={`text-nowrap`} />
      </div>
    </div>
  );
};

export default ArtsCard;
