import { FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import Button from "./form/Button";
import pic from "../assets/bg-5.jpg";
const ArtistCard = ({ name, imgSrc, phone, email }) => {
  return (
    <div className="flex w-full flex-col group gap-2 shadow-md hover:scale-105 relative overflow-hidden rounded-xl transition ease-out duration-200 hover:shadow-md">
      <img
        src={imgSrc || pic}
        alt={name}
        className="aspect-square duration-100 rounded-xl"
      />
      <div className="absolute w-full h-full top-0 left-0 overLAY duration-100 flex flex-col p-5 justify-end text-secondary">
        <div className="flex flex-col gap-2">
          <div className="contents duration-100">
            <div className="flex items-center justify-between">
              <h1 className="text-base">{name}</h1>
              <p className="text-xs">{phone}</p>
            </div>
            <div className="text-xs text-slate-300">{email}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              icon={<FaXTwitter className="text-primary" />}
              styles={`!p-2 !bg-secondary !text-primary !w-fit`}
            />
            <Button
              icon={<FaInstagram className="text-primary" />}
              styles={`!p-2 !bg-secondary !text-primary !w-fit`}
            />
            <Button
              icon={<FaWhatsapp className="text-primary" />}
              styles={`!p-2 !bg-secondary !text-primary !w-fit`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
