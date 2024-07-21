import { FaTimes } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

const Modal = ({ close, email }) => {
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
        <div className="flex flex-col gap-2">
          <p className="text-sm">
            Your order has been successfully placed! A
            confirmation email has been sent to <span className="text-base font-semibold text-primary">{email} </span>. Thank you for shopping
            with us.
          </p>

            <p className="text-sm">
              Feel free to browse and make a new order. Just Go To{" "}
              <a href="/shop" className="text-primary text-xl font-bold ">
                Shop
              </a>{" "}
              and Add New Products
            </p>
          <div className="bg-primary  rounded-md ">
          <a href="/shop" className="text-white text-xl flex rounded-md items-center justify-center p-3 w-full h-full text-center bg-inherit gap-2 font-bold ">
            <FaCartPlus className="text-md font-black text-white " />
            <span>

                Shop
            </span>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
