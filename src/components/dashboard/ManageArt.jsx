import Button from "../../components/form/Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import Cards from "./Cards";

const ManageArt = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-end ">
        <Button
          title="New Art"
          styles={`!text-nowrap`}
          icon={<IoIosAddCircleOutline />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  );
};

export default ManageArt;
