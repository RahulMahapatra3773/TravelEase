const mongoose = require('mongoose');
const dashboardStatsSchema = new mongoose.Schema({
  totalUsers: { type: Number, default: 0 },
  bookedTickets: { type: Number, default: 0 },
  canceledTickets: { type: Number, default: 0 },
}, {timestamps: true });
const DashboardModel = mongoose.model('dashboard', dashboardStatsSchema);
module.exports = DashboardModel;
