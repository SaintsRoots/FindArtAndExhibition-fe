import Header from "./Header";
import Button from "../../components/form/Button";
import { IoIosAddCircleOutline } from "react-icons/io";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col-reverse gap-3 md:flex-row">
        <Header />
        <Button
          title="New Art"
          styles={`!text-nowrap`}
          icon={<IoIosAddCircleOutline />}
        />
      </div>
    </>
  );
};

export default Dashboard;
