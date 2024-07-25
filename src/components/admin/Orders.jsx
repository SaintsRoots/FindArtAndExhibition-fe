import { useSelector, useDispatch } from "react-redux";
import { IoMdDoneAll } from "react-icons/io";
import { GoIssueReopened } from "react-icons/go";
import {
  selectOrders,
  selectOrdersLoading,
  selectOrdersError,
  getAllOrders,
  completePayment,
} from "../../features/orders/ordersSlice";
import Skeleton from "../skeleton/artistOrder.skelton";
import { useEffect, useState } from "react";
import Button from "../form/Button";
import Spinner from "../Spinner";
import { notifyError, notifySuccess } from "../notifications/notification";

const Orders = () => {
  const thClasses =
    "px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-nowrap";

  const dispatch = useDispatch();
  const loading = useSelector(selectOrdersLoading);
  const errors = useSelector(selectOrdersError);
  const orders = useSelector(selectOrders);

  const [localLoading, setLocalLoading] = useState({});

  const handleCompletePayment = async (id) => {
    try {
      setLocalLoading((prev) => ({ ...prev, [id]: true }));
      await dispatch(completePayment(id)).unwrap();
      notifySuccess("Approved Successfully");
      setLocalLoading((prev) => ({ ...prev, [id]: false }));
      await dispatch(getAllOrders()).unwrap();
    } catch (error) {
      console.error("Error Approving Payment:", error.message);
      notifyError(error.message);
      setLocalLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-col w-full bg-white">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden min-w-full">
              {loading ? (
                Array.from({ length: 20 }, (_, index) => (
                  <Skeleton key={index} />
                ))
              ) : errors ? (
                <div className="text-red-600">{errors}</div>
              ) : !Array.isArray(orders) || orders.length === 0 ? (
                <div className="text-gray-600 min-w-full justify-center items-center">
                  No data found
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr>
                      <th scope="col" className={thClasses}>
                        Client Name
                      </th>
                      <th scope="col" className={thClasses}>
                        Client Email
                      </th>
                      <th scope="col" className={thClasses}>
                        Product Owner
                      </th>
                      <th scope="col" className={thClasses}>
                        Quantity Per Product
                      </th>
                      <th scope="col" className={thClasses}>
                        Name Of Products
                      </th>
                      <th scope="col" className={thClasses}>
                        Category
                      </th>
                      <th scope="col" className={thClasses}>
                        Address
                      </th>
                      <th scope="col" className={thClasses}>
                        Status
                      </th>
                      <th scope="col" className={thClasses}>
                        Total Items
                      </th>
                      <th scope="col" className={thClasses}>
                        Total Price
                      </th>
                      <th scope="col" className={thClasses}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {orders.map((order) => (
                      <tr
                        className="text-sm font-medium text-gray-600"
                        key={order._id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.user?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.user?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.items
                            ? order.items
                                .map(
                                  (item) => item.product?.owner?.name || "N/A"
                                )
                                .join(", ")
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.items
                            ? order.items
                                .map((item) => item.quantity)
                                .join(", ")
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.items
                            ? order.items
                                .map((item) => item.product?.name || "N/A")
                                .join(", ")
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.items
                            ? order.items
                                .map((item) => item.product?.category || "N/A")
                                .join(", ")
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.shippingAddress || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.status || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.totalItems || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.totalPrice || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            icon={
                              localLoading[order._id] ? (
                                <Spinner classes={`!h-4`} />
                              ) : order?.status === "pending" ? (
                                <GoIssueReopened className="!text-primary font-bold " />
                              ) : (
                                <IoMdDoneAll className="!text-primary font-bold " />
                              )
                            }
                            styles="!bg-indigo-100"
                            click={() => {
                              handleCompletePayment(order?._id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Orders;

