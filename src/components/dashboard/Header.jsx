import DashBoardCard from "./DashBoardCard";
import {
  getAllArtsByOwner,
  selectAllarts,
} from "../../features/arts/artsSlice";
import {
  getOrders,
  getOrdersCustomer,
  selectOrdersLoading,
  selectOrdersError,
  selectOrders,
  selectCustomers,
  selectTotalRevenue,
} from "../../features/orders/ordersSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const arts = useSelector(selectAllarts);
  const totalRevenue = useSelector(selectTotalRevenue);
  const totalOrders = useSelector(selectOrders);
  const totalCustomers = useSelector(selectCustomers); 
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(getAllArtsByOwner());
    dispatch(getOrders());
    dispatch(getOrdersCustomer());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <DashBoardCard title="Total Orders" value={totalOrders?.length} />
      <DashBoardCard title="Total Customers" value={totalCustomers.length} />
      <DashBoardCard title="Total Arts" value={arts.length} />
      <DashBoardCard title="Total Revenue" value={totalRevenue} currency="Frw" />
    </div>
  );
};

export default Header;
