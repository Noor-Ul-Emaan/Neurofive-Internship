import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './App.css';

const PIE_COLORS = ['#38bdf8', '#818cf8', '#c084fc'];

export default function App() {
  const [category, setCategory] = useState('All');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/analytics?category=${category}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Server response was not OK');
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.success) {
          setData(resData.data);
        } else {
          setError('Failed to fetch data');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Backend server disconnected! Please ensure server is running on http://localhost:5000');
      })
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#38bdf8' }}>
        <h2>🔄 Loading Dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#ef4444', padding: '20px' }}>
        <h2>⚠️ Connection Error</h2>
        <p style={{ marginTop: '10px', color: '#94a3b8' }}>{error}</p>
        <button 
          onClick={() => setCategory((prev) => prev)} 
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', background: '#38bdf8', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header & Filter Controls */}
      <div className="dashboard-header">
        <div>
          <h1 className="title">📊 Analytics Dashboard</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Real-time business performance overview</p>
        </div>

        <div className="filter-group">
          <label htmlFor="category">Filter Category: </label>
          <select
            id="category"
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>
      </div>

      {/* Dynamic Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">{data.stats.totalSales}</div>
          <span className="stat-badge">{data.stats.growth} vs last month</span>
        </div>
        <div className="stat-card">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value">{data.stats.totalOrders}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Users</div>
          <div className="stat-value">{data.stats.activeUsers}</div>
        </div>
      </div>

      {/* 3 Visualizations Grid */}
      <div className="charts-grid">
        {/* Chart 1: Revenue Area Chart */}
        <div className="chart-card">
          <h3 className="chart-title">📈 Revenue Trend (Monthly)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data.salesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Area type="monotone" dataKey="revenue" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Conversions Bar Chart */}
        <div className="chart-card">
          <h3 className="chart-title">📊 Conversion Leads (Weekly)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.performanceMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Bar dataKey="conversions" fill="#818cf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Category Share Donut Chart */}
        <div className="chart-card">
          <h3 className="chart-title">🍩 Category Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.categoryShare}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                label
              >
                {data.categoryShare.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}