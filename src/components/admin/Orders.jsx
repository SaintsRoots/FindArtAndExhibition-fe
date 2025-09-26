import { useSelector, useDispatch } from "react-redux";
import { IoMdDoneAll } from "react-icons/io";
import {
  selectOrders,
  selectOrdersLoading,
  selectOrdersError,
  getAllOrders,
  completePayment,
} from "../../features/orders/ordersSlice";
import Skeleton from "../skeleton/artistOrder.skelton";
import { useEffect, useState } from "react";
// import Button from "../form/Button";
import Spinner from "../Spinner";
import { notifyError, notifySuccess } from "../notifications/notification";
import { 
  Search, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  X, 
  CreditCard, 
  Package 
} from "lucide-react";

const Orders = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectOrdersLoading);
  const errors = useSelector(selectOrdersError);
  const orders = useSelector(selectOrders);
  const [localLoading, setLocalLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleCompletePayment = async (id) => {
    try {
      setLocalLoading((prev) => ({ ...prev, [id]: true }));
      await dispatch(completePayment(id)).unwrap();
      notifySuccess("Order approved successfully");
      dispatch(getAllOrders());
    } catch (error) {
      notifyError(error.message || "Failed to approve order");
    } finally {
      setLocalLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.items?.some(item => 
        item.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === "all" || order?.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'paid': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    const iconProps = { className: "w-3 h-3" };
    
    switch (status) {
      case 'completed': return <CheckCircle {...iconProps} />;
      case 'pending': return <Clock {...iconProps} />;
      case 'shipped': return <Truck {...iconProps} />;
      case 'cancelled': return <X {...iconProps} />;
      case 'paid': return <CreditCard {...iconProps} />;
      default: return <Package {...iconProps} />;
    }
  };

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(order => order.status === 'pending').length,
    completed: orders.filter(order => order.status === 'completed').length,
    revenue: orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Orders
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.revenue} Frw</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders by customer, product, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            Array.from({ length: 5 }, (_, index) => <Skeleton key={index} />)
          ) : errors ? (
            <div className="p-6 text-red-600 bg-red-50 rounded-lg text-center">{errors}</div>
          ) : !Array.isArray(filteredOrders) || filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all" 
                  ? "No orders match your current filters." 
                  : "No orders have been placed yet."
                }
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order Info</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <>
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{order?.user?.name || "N/A"}</div>
                          <div className="text-sm text-gray-500">{order?.user?.email || "N/A"}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {order.shippingAddress ? 
                              `${order.shippingAddress.substring(0, 30)}...` : 
                              "Address not provided"
                            }
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.items && order.items.length > 0 ? (
                            <div>
                              <span className="font-medium">{order.items.length} product(s)</span>
                              <div className="text-xs text-gray-500 mt-1">
                                {order.items.slice(0, 2).map(item => item.product?.name).join(', ')}
                                {order.items.length > 2 && ` +${order.items.length - 2} more`}
                              </div>
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">Frw{order.totalPrice || "0"}</div>
                        <div className="text-xs text-gray-500">{order.totalItems || "0"} items</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                          <span className="mr-1">{getStatusIcon(order?.status)}</span>
                          {order?.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleOrderDetails(order._id)}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {order.status === "pending" && (
                            <button
                              onClick={() => handleCompletePayment(order._id)}
                              disabled={localLoading[order._id]}
                              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                              title="Approve Order"
                            >
                              {localLoading[order._id] ? (
                                <Spinner classes="w-4 h-4" />
                              ) : (
                                <IoMdDoneAll className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Order Details */}
                    {expandedOrder === order._id && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h4 className="font-semibold mb-2">Order Details</h4>
                              <div className="space-y-1">
                                <div><span className="font-medium">Order ID:</span> {order._id}</div>
                                <div><span className="font-medium">Customer:</span> {order.user?.name} ({order.user?.email})</div>
                                <div><span className="font-medium">Shipping Address:</span> {order.shippingAddress || "Not provided"}</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Products</h4>
                              <div className="space-y-2">
                                {order.items?.map((item, index) => (
                                  <div key={index} className="flex justify-between">
                                    <span>{item.product?.name} (x{item.quantity})</span>
                                    <span>Frw{item.price * item.quantity}</span>
                                  </div>
                                ))}
                                <div className="border-t pt-2 font-semibold">
                                  Total: Frw{order.totalPrice}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;