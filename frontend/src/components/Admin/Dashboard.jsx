import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import AddProduct from './AddProduct';
import Sales from './Sales';
import '../../styles/Dashboard.css';  // Import the external CSS file
import AdminProducts from './AdminProducts';
import EditProducts from './EditProducts';

const Dashboard = () => {
  const location = useLocation();  // Track the current route
  const isadmin = localStorage.getItem('admin');
  
  // Check if the current route is the dashboard or any of the sub-routes (add-product, products, sales)
  const isDashboardPage = location.pathname === '/dashboard';
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="title">Admin Dashboard</h2>
        <ul className="menu">
          <li>
            <Link to="/dashboard" className="link">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/add-product" className="link">Add Product</Link>
          </li>
          <li>
            <Link to="/dashboard/products" className="link">View Products</Link>
          </li>
          <li>
            <Link to="/dashboard/sales" className="link">Sales & Profit</Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {isadmin ? <h2 className="admin-title">Welcome to the Admin Dashboard</h2> : <h2 className="access-denied">Access Denied</h2>}

        {/* Conditionally render Admin-specific sections if on the Dashboard page */}
        {isDashboardPage && (
          <>
            <div className="admin-overview">
              <h2>Admin Overview</h2>
              <p>Here you can manage your products, track sales, and monitor performance.</p>
            </div>

            <div className="statistics">
              <h3>Dashboard Statistics</h3>
              <div className="stat-cards">
                <div className="stat-card">
                  <h4>Total Products</h4>
                  <p>45</p>
                </div>
                <div className="stat-card">
                  <h4>Total Sales</h4>
                  <p>$12,300</p>
                </div>
                <div className="stat-card">
                  <h4>Orders Today</h4>
                  <p>15</p>
                </div>
              </div>
            </div>

            <div className="recent-activities">
              <h3>Recent Activities</h3>
              <ul>
                <li>Added new product: "Smartphone XYZ"</li>
                <li>Processed order #1234</li>
                <li>Updated sales report for October</li>
              </ul>
            </div>
          </>
        )}

        {/* Define Routes for Nested Pages */}
        <Routes>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="sales" element={<Sales />} />
          <Route path="products" element={<AdminProducts />} />
  <Route path="edit-product/:id" element={<EditProducts />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
