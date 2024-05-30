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
              <Link to="/shop">Shoping</Link>
              <p>
                If you need any assistance or have any questions about how to
                use our site, we're here to help. Please feel free to reach out
                to our support team at   <span className="text-blue-700 font-black ">imigongo@gmail.com</span> or call us at (+250) 784404173
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className=" uppercase font-semibold ">GET IN TOUCH</h1>
            <div className="flex flex-col gap-2 text-[12px]">
              <p>
                Any questions? Let us know , Kayonza-Mukarange, Nyagatovu You
                can call us on (+250) 784404173
              </p>
              <div className="flex"></div>
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
                styles={`!scale-100 bg-primary text-secondary`}
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
