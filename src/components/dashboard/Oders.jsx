import { useSelector, useDispatch } from "react-redux";
import {
  selectOrders,
  selectOrdersLoading,
  selectOrdersError,
  getOrders,
} from "../../features/orders/ordersSlice";
import Skeleton from "../skeleton/artistOrder.skelton";
import { useEffect } from "react";

const Orders = () => {
  const thClasses =
    "px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-nowrap";

  const dispatch = useDispatch();
  const loading = useSelector(selectOrdersLoading);
  const errors = useSelector(selectOrdersError);
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-col w-full bg-white">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden min-w-full">
              {loading ? (
                Array.from({ length: 10 }, (_, index) => (
                  <Skeleton key={index} />
                ))
              ) : errors ? (
                <div className="text-red-600">{errors}</div>
              ) : orders.length === 0 ? (
                <div className="text-gray-600 min-w-full justify-center items-center">
                  No data found
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr>
                      <th scope="col" className={thClasses}>
                        Name
                      </th>
                      <th scope="col" className={thClasses}>
                        Email
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
                        Total Items
                      </th>
                      <th scope="col" className={thClasses}>
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {orders.map((order, index) => (
                      <tr className="text-sm font-medium text-gray-600" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.user?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.user?.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.items ? order.items.map(item => item.quantity).join(', ') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.items ? order.items.map(item => item.product.name).join(', ') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.items ? order.items.map(item => item.product.category).join(', ') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.shippingAddress || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.totalItems || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.totalPrice || 'N/A'}
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
