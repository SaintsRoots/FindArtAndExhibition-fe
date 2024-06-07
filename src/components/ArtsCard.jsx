import Button from "../components/form/Button";
import { FaCartPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, selectcartloading } from "../features/cart/cartSlice";

const ArtsCard = ({ name, price, image, money, id }) => {
  const dispatch = useDispatch();
  const cartloading = useSelector(selectcartloading);

  const handleAddCart = (productId) => {
    dispatch(addItemToCart({ productId, quantity: 1 }));
  };
  return (
    <div className="flex flex-col gap-4 relative group shadow-md hover:scale-105 transition ease-out duration-200 hover:shadow-md">
      <div className="max-h-[300px] overflow-hidden">
        <img src={image} alt={name} className="aspect-square duration-100 " />
      </div>
      <div className="flex justify-between items-start p-3 gap-2">
        <div className="flex flex-col leading-6">
          <h1 className="text-sm font-normal text-gray-500 text-nowrap capitalize">
            {name}
          </h1>
          <p className="text-sm text-slate-700 font-light capitalize">
            {price} {money}
          </p>
        </div>
        <Button
          title={cartloading ? `Wait A bit ..` : ``}
          click={() => handleAddCart(id)}
          icon={cartloading ? ` ` : <FaCartPlus />}
          styles={`text-nowrap`}
        />
      </div>
      <div className="buttons-container flex h-[80%] pb-3 w-full justify-center transition ease-out duration-200 absolute left-0 items-end">
        <Button
          title={`Quick View`}
          path={`/${name}`}
          styles={`text-nowrap bg-white text-textColor !rounded-full`}
        />
      </div>
    </div>
  );
};

export default ArtsCard;
