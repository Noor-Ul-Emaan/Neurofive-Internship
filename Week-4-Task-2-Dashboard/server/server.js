import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Analytics Dataset
const analyticsData = {
  All: {
    stats: { totalSales: '$45,210', totalOrders: '1,240', activeUsers: '3,820', growth: '+14.5%' },
    salesTrend: [
      { month: 'Jan', revenue: 4000, orders: 240 },
      { month: 'Feb', revenue: 3000, orders: 198 },
      { month: 'Mar', revenue: 5000, orders: 320 },
      { month: 'Apr', revenue: 4780, orders: 290 },
      { month: 'May', revenue: 5890, orders: 380 },
      { month: 'Jun', revenue: 6390, orders: 410 },
    ],
    categoryShare: [
      { name: 'Electronics', value: 45 },
      { name: 'Clothing', value: 30 },
      { name: 'Services', value: 25 },
    ],
    performanceMetrics: [
      { day: 'Mon', leads: 120, conversions: 80 },
      { day: 'Tue', leads: 150, conversions: 95 },
      { day: 'Wed', leads: 180, conversions: 110 },
      { day: 'Thu', leads: 140, conversions: 85 },
      { day: 'Fri', leads: 200, conversions: 140 },
    ]
  },
  Electronics: {
    stats: { totalSales: '$22,500', totalOrders: '610', activeUsers: '1,950', growth: '+18.2%' },
    salesTrend: [
      { month: 'Jan', revenue: 2000, orders: 120 },
      { month: 'Feb', revenue: 1500, orders: 90 },
      { month: 'Mar', revenue: 2800, orders: 160 },
      { month: 'Apr', revenue: 2400, orders: 140 },
      { month: 'May', revenue: 3100, orders: 190 },
      { month: 'Jun', revenue: 3500, orders: 210 },
    ],
    categoryShare: [
      { name: 'Mobiles', value: 50 },
      { name: 'Laptops', value: 35 },
      { name: 'Accessories', value: 15 },
    ],
    performanceMetrics: [
      { day: 'Mon', leads: 60, conversions: 40 },
      { day: 'Tue', leads: 75, conversions: 50 },
      { day: 'Wed', leads: 90, conversions: 60 },
      { day: 'Thu', leads: 70, conversions: 45 },
      { day: 'Fri', leads: 100, conversions: 70 },
    ]
  },
  Clothing: {
    stats: { totalSales: '$12,800', totalOrders: '420', activeUsers: '1,200', growth: '+9.4%' },
    salesTrend: [
      { month: 'Jan', revenue: 1200, orders: 80 },
      { month: 'Feb', revenue: 1000, orders: 70 },
      { month: 'Mar', revenue: 1400, orders: 100 },
      { month: 'Apr', revenue: 1600, orders: 110 },
      { month: 'May', revenue: 1800, orders: 120 },
      { month: 'Jun', revenue: 2000, orders: 130 },
    ],
    categoryShare: [
      { name: 'Men', value: 40 },
      { name: 'Women', value: 45 },
      { name: 'Kids', value: 15 },
    ],
    performanceMetrics: [
      { day: 'Mon', leads: 40, conversions: 25 },
      { day: 'Tue', leads: 50, conversions: 30 },
      { day: 'Wed', leads: 55, conversions: 35 },
      { day: 'Thu', leads: 45, conversions: 28 },
      { day: 'Fri', leads: 65, conversions: 42 },
    ]
  }
};

// Required API Route
app.get('/api/analytics', (req, res) => {
  const category = req.query.category || 'All';
  const data = analyticsData[category] || analyticsData['All'];
  res.json({ success: true, category, data });
});

app.listen(PORT, () => {
  console.log(`Dashboard Analytics Server running on http://localhost:${PORT}`);
});