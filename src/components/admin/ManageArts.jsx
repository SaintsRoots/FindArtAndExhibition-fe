import Button from "../../components/form/Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllarts,
  selectArtsloading,
  selectArtsError,
  getAllArts,
  deleteArts,
} from "../../features/arts/artsSlice";
import { useEffect, useState } from "react";
import Skeleton from "../skeleton/arts.skeleton";
import Cards from "../dashboard/Cards";
import Modal from "../dashboard/ArtsModol";


const ManageArts = () => {
  const dispatch = useDispatch();
  const arts = useSelector(selectAllarts);
  const loading = useSelector(selectArtsloading);
  const error = useSelector(selectArtsError);
  console.log(error, loading);

  const [model, setModal] = useState(false);

  // handle model
  const handleModal = () => {
    setModal(!model);
    dispatch(getAllArts());
  };

  // handle Delete
  const handleDelete = async (id) => {
    await dispatch(deleteArts(id));
    dispatch(getAllArts()); 
  };

  useEffect(() => {
    dispatch(getAllArts());
  }, [dispatch]);

  let content;
  if (error) {
    content = <p className="text-base text-red-700">Error: {error}</p>;
  }
  if (loading) {
    content = Array.from({ length: 6 }, (_, index) => <Skeleton key={index} />);
  }
  if (arts.length === 0) {
    content = <p>No Data Found</p>;
  }
  if (arts.length > 0) {
    content = arts.map((item, index) => (
      <Cards
        id={item._id}
        name={item?.name}
        description={item?.description}
        image={item?.image}
        category={item?.category}
        available_arts={item?.available_arts}
        price={item?.price}
        key={index}
        deleteArt={handleDelete}
      />
    ));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-end ">
        <Button
          title="New Art"
          click={() => handleModal()}
          styles={`!text-nowrap`}
          icon={<IoIosAddCircleOutline />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">{content}</div>
      {model && <Modal close={handleModal} title={`Add New Art`} />}
    </div>
  );
};

export default ManageArts;
