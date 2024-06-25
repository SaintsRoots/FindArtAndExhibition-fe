import DashBoardCard from "./DashBoardCard";
const Header = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <DashBoardCard title={`Total Orders`} value="400" />
      <DashBoardCard title={`Total Customers`} value="400" />
      <DashBoardCard title={`Total Arts`} value="400" />
      <DashBoardCard title={`Total Revenue`} value="40" currency="Frw" />
    </div>
  );
};

export default Header;
