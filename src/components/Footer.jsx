import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { getCurrentYear } from "../utils/CurrentYear";
import { Link } from "react-router-dom";
import Input from "./form/Input";
import Button from "./form/Button";
const Footer = () => {
  return (
    <footer className="bg-textColor text-secondary min-h-[50vh] flex justify-center items-center">
      <div className="container mx-auto px-6 md:px-14 flex flex-col items-center justify-between  gap-2">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h1 className=" uppercase font-semibold ">Category</h1>
            <div className="flex flex-col gap-1 text-[12px]">
              <Link to="/shop">Photograpy</Link>
              <Link to="/shop">Painting</Link>
              <Link to="/shop">Sculpture</Link>
              <Link to="/shop">Ceramic</Link>
              <Link to="/shop">Architecture</Link>
              <Link to="/shop">Wall Gallery</Link>
              <Link to="/shop">Drawing</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className=" uppercase font-semibold ">Help</h1>
            <div className="flex flex-col gap-2 text-[12px]">
              <p>Shipping</p>
             <p>Track Order</p>
             <p>Returns</p>
             <p>Faqs</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className=" uppercase font-semibold ">GET IN TOUCH</h1>
            <div className="flex flex-col gap-2 text-[12px]">
              <p>
                Any questions? Let us know , Kayonza-Mukarange, Nyagatovu You
                can call us on (+250) 784 404 173
              </p>
              <div className="flex gap-2 font-bold text-2xl cursor-pointer text-secondary transition-all ">
                <FaInstagram className="p-1 bg-primary rounded-sm hover:scale-110 hover:bg-textColor1" />
                <FaWhatsapp className="p-1 bg-primary rounded-sm hover:scale-110 hover:bg-textColor1" />
                <FaTwitter className="p-1 bg-primary rounded-sm hover:scale-110 hover:bg-textColor1" />
                <FaFacebookF className="p-1 bg-primary rounded-sm hover:scale-110 hover:bg-textColor1" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className=" uppercase font-semibold ">NEWSLETTER</h1>
            <div className="flex flex-col gap-2 text-[12px]">
              <Input
                type="input"
                inputType="text"
                style={`!text-gray-300`}
                placeholder="johndoe@gmail.com"
              />
              <Button
                title="Subscribe"
                styles={`!scale-100 bg-primary text-white`}
              />
            </div>
          </div>
        </div>
        <p className="text-sm">
          Copyright ©{getCurrentYear()} All rights reserved | Made by{" "}
          <span className="text-blue-700 font-black ">Banini Frank</span> &
          distributed by INES RUHENGERI{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
