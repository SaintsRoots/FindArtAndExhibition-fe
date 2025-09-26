import { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend , LineChart, Line
} from 'recharts';
import Button from "../../components/form/Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "./ArtsModol";
import { useSelector } from "react-redux";
import { selectAllarts } from "../../features/arts/artsSlice";
import { TrendingUp, Users, DollarSign, Star } from "lucide-react";

const Dashboard = () => {
  const [model, setModal] = useState(false);
  const arts = useSelector(selectAllarts);
 
  // Full 12-month data with realistic art business trends
  const salesData = [
    { month: 'Jan', sales: 12, revenue: 2400, visitors: 1200, conversion: 1.0 },
    { month: 'Feb', sales: 18, revenue: 3600, visitors: 1500, conversion: 1.2 },
    { month: 'Mar', sales: 15, revenue: 3000, visitors: 1400, conversion: 1.07 },
    { month: 'Apr', sales: 22, revenue: 4400, visitors: 1800, conversion: 1.22 },
    { month: 'May', sales: 28, revenue: 5600, visitors: 2200, conversion: 1.27 },
    { month: 'Jun', sales: 24, revenue: 4800, visitors: 2000, conversion: 1.2 },
    { month: 'Jul', sales: 32, revenue: 6400, visitors: 2500, conversion: 1.28 },
    { month: 'Aug', sales: 30, revenue: 6000, visitors: 2300, conversion: 1.3 },
    { month: 'Sep', sales: 26, revenue: 5200, visitors: 2100, conversion: 1.24 },
    { month: 'Oct', sales: 35, revenue: 7000, visitors: 2800, conversion: 1.25 },
    { month: 'Nov', sales: 40, revenue: 8000, visitors: 3200, conversion: 1.25 },
    { month: 'Dec', sales: 45, revenue: 9000, visitors: 3500, conversion: 1.29 },
  ];

  // Calculate real statistics from data
  // const totalSales = salesData.reduce((sum, month) => sum + month.sales, 0);
  const totalRevenue = salesData.reduce((sum, month) => sum + month.revenue, 0);
  const currentMonth = salesData[salesData.length - 1];
  const previousMonth = salesData[salesData.length - 2];
  
  const salesChange = previousMonth ? 
    ((currentMonth.sales - previousMonth.sales) / previousMonth.sales * 100).toFixed(1) : 0;
  const revenueChange = previousMonth ? 
    ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1) : 0;

  // Real category distribution based on arts data
  const getCategoryData = () => {
    const categoryCount = {};
    arts.forEach(art => {
      categoryCount[art.category] = (categoryCount[art.category] || 0) + 1;
    });
    
    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value: (value / arts.length * 100).toFixed(1)
    }));
  };

  const categoryData = arts.length > 0 ? getCategoryData() : [
    { name: 'Abstract', value: 40 },
    { name: 'Portrait', value: 25 },
    { name: 'Landscape', value: 20 },
    { name: 'Modern', value: 15 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const stats = [
    { 
      title: 'Total Arts', 
      value: arts.length, 
      change: '+12%', 
      color: 'bg-blue-500',
      icon: TrendingUp
    },
    { 
      title: 'Monthly Sales', 
      value: currentMonth.sales, 
      change: `${salesChange}%`, 
      color: 'bg-green-500',
      icon: Users
    },
    { 
      title: 'Total Revenue', 
      value: `${totalRevenue.toLocaleString()} Rrw`, 
      change: `${revenueChange}%`, 
      color: 'bg-purple-500',
      icon: DollarSign
    },
    { 
      title: 'Avg. Rating', 
      value: '4.8', 
      change: '+0.2', 
      color: 'bg-orange-500',
      icon: Star
    },
  ];

  const handleModal = () => setModal(!model);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'revenue' ? `Frw${entry.value}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's your annual art performance summary.</p>
        </div>
        <Button
          title="New Art"
          click={handleModal}
          styles="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          icon={<IoIosAddCircleOutline className="text-lg" />}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const isPositive = !stat.change.startsWith('-');
          
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '↑' : '↓'} {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                  <IconComponent className="text-white w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Annual Sales Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Annual Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3}
                name="Artworks Sold"
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.3}
                name="Revenue (Frw)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Art Categories Distribution {arts.length > 0 && `(${arts.length} artworks)`}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="sales" 
              fill="#8884d8" 
              radius={[4, 4, 0, 0]}
              name="Artworks Sold"
            />
            <Bar 
              yAxisId="right"
              dataKey="visitors" 
              fill="#82ca9d" 
              radius={[4, 4, 0, 0]}
              name="Website Visitors"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Rate Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Conversion Rate</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `${value}%`} />
            <Line 
              type="monotone" 
              dataKey="conversion" 
              stroke="#ff7300" 
              strokeWidth={2}
              dot={{ fill: '#ff7300', strokeWidth: 2, r: 4 }}
              name="Conversion Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {model && <Modal close={handleModal} title="Add New Art" />}
    </div>
  );
};

export default Dashboard;