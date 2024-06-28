import Header from "./Header";
import Button from "../../components/form/Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import Modal from "./ArtsModol";

const Dashboard = () => {
  const [model, setModal] = useState(false);

  // handle model
  const handleModal = () => {
    setModal(!model);
    // dispatch(getAllArtsByOwner());
  };
  return (
    <>
      <div className="flex flex-col-reverse gap-3 md:flex-row">
        <Header />
        <Button
          title="New Art"
          click={() => handleModal()}
          styles={`!text-nowrap`}
          icon={<IoIosAddCircleOutline />}
        />
      </div>
      {model && <Modal close={handleModal} title={`Add New Art`} />}
    </>
  );
};

export default Dashboard;
