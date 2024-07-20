import { FaTimes } from "react-icons/fa";

const Modal = ({ close, image, email, name }) => {
  return (
    <div className="fixed top-0 left-0 w-screen min-h-screen z-50 flex justify-center items-center bg-primary/50 backdrop-blur-sm">
      <div className="flex flex-col p-4 xl:p-4 gap-4 justify-start items-start w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-slate-100 rounded-3xl duration-300">
        <div className="flex justify-end w-full p-4" onClick={close}>
          <span
            className="p-2 bg-primary rounded-md cursor-pointer text-secondary"
            onClick={close}
          >
            <FaTimes onClick={close} />
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Artist Certificate</h1>
          <p className="text-gray-600">
            This certificate is awarded to recognize the outstanding talent and
            achievements of the artist in their field. It serves as a testament
            to their dedication and skill.
          </p>
        </div>
        <div className=" flex justify-center items-center h-[330px] w-full ">
          <img
            className="w-full h-full object-cover rounded-md"
            src={image}
            alt={name}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary">{name}</h2>
          <small>{email}</small>
        </div>
      </div>
    </div>
  );
};

export default Modal;
