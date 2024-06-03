import pic1 from "../assets/bg-1.jpg";
import pic2 from "../assets/bg-2.jpg";
import pic3 from "../assets/bg-3.jpg";
import pic4 from "../assets/bg-4.jpg";
import { FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import Button from "../components/form/Button";

const artists = [
  {
    name: "John Doe",
    phone: "+250 785 161 508",
    email: "johndoe@gmail.com",
    imgSrc: pic1,
  },
  {
    name: "Jane Smith",
    phone: "+250 785 123 456",
    email: "janesmith@gmail.com",
    imgSrc: pic2,
  },
  {
    name: "Alice Johnson",
    phone: "+250 785 654 321",
    email: "alicejohnson@gmail.com",
    imgSrc: pic3,
  },
  {
    name: "Bob Brown",
    phone: "+250 785 987 654",
    email: "bobbrown@gmail.com",
    imgSrc: pic4,
  },
];

const ArtistPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-24 gap-4">
      {artists.map((artist, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 group relative overflow-hidden rounded-xl"
        >
          <img
            src={artist.imgSrc}
            alt={artist.name}
            className="aspect-square duration-100 rounded-xl"
          />
          <div className="absolute w-full h-full top-0 left-0 overLAY duration-100 flex flex-col p-5 justify-end text-secondary">
            <div className="flex flex-col gap-2">
              <div className="contents duration-100">
                <div className="flex items-center justify-between">
                  <h1 className="text-base">{artist.name}</h1>
                  <p className="text-xs">{artist.phone}</p>
                </div>
                <div className="text-xs text-slate-300">{artist.email}</div>
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
      ))}
    </div>
  );
};

export default ArtistPage;
