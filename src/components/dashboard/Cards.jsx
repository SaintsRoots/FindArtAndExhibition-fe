import cardImage from "../../assets/bg-1.jpg";
import { MdEdit, MdDelete } from "react-icons/md";
import Modal from "./EditArtsModal";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { notifyError, notifySuccess } from "../notifications/notification";

const Cards = ({
  id,
  name,
  description,
  image,
  deleteArt,
  price,
  available_arts,
  category,
}) => {
  const [model, setModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // handle model
  const handleModal = () => {
    setModal(!model);
  };

  // handle Delete
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteArt(id);
      notifySuccess("Deleted Well");
    } catch (error) {
      notifyError("Failed To Delete");
      console.error("Error deleting art:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-4 p-2 rounded-md transition duration-200 ease-out hover:bg-slate-200 hover:shadow-md">
      <div className="flex">
        <img
          src={image || cardImage}
          alt={name}
          className="aspect-square rounded-md object-cover"
        />
      </div>
      {price && (
        <div className="hidden">
          {price}
          {category}
          {available_arts}
        </div>
      )}

      <div className=" flex h-full w-full flex-col justify-between p-2 rounded-md  text-black transition duration-200 ease-out ">
        <div className="flex items-center justify-between w-full gap-3">
          <h3 className="font-bold text-sm ">{category}</h3>
          <div className="flex gap-2 items-center ">
            <p
              className="p-1 bg-primary rounded-md cursor-pointer text-white"
              onClick={handleModal}
            >
              <MdEdit className="text-xl" />
            </p>

            <p
              className="p-1 bg-primary rounded-md cursor-pointer text-white"
              onClick={handleDelete}
            >
              {/* Conditionally render Spinner while deleting */}
              {deleting ? (
                <Spinner classes="text-white h-3 w-3 animate-spin" />
              ) : (
                <MdDelete className=" text-xl hover:text-red-400" />
              )}
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center ">
            <h1 className="font-bold">{name || "Davinci"}</h1>
            <small>{price} Frw</small>
          </div>
          <p className="text-xs">{description?.slice(0, 150)}</p>
        </div>
      </div>
      {model && (
        <Modal
          close={handleModal}
          id={id}
          name={name}
          description={description}
          image={image}
          category={category}
          available_arts={available_arts}
          price={price}
        />
      )}
    </div>
  );
};

export default Cards;
