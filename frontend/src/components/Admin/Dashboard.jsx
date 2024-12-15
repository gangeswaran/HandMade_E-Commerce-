import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import AddProduct from './AddProduct';
import Sales from './Sales';
import '../../styles/Dashboard.css';  // Import the external CSS file
import AdminProducts from './AdminProducts';
import EditProducts from './EditProducts';
import axios from 'axios';

const Dashboard = () => {
  const location = useLocation();  // Track the current route
  const isadmin = localStorage.getItem('isadmin');
  const [adminproducts , setadminproducts] = useState([]);
  const [count, setcount] = useState([]);
  const artistId = localStorage.getItem('artid'); // Ensure 'artid' is set properly during login
  const [earned, setearned] = useState([]);
  const [leader, setleader] = useState([]);
  
  const isDashboardPage = location.pathname === '/dashboard';

  
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/productAdmin/${artistId}`);
        console.log(response.data);
        setadminproducts(response.data);
        setcount(response.data.length); 
        console.log(response.data.length)
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };

    const fetchproducts = async () =>{
      try {
        const response = await axios.get(`http://localhost:4000/api/earned/${artistId}`);
        setearned(response.data); // Update state with additional sales data
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching additional sales data:', error);
      }
    }

    const fetchleader = async () =>{
      try {
        const response = await axios.get('http://localhost:4000/api/leaderboard');
        console.log(response.data);
        setleader(response.data); // Update state with leaderboard data
      } catch (error) {
        console.error('Error fetching leader:', error);
      }
    }

  
    // Call the function after it is declared
    fetchArtist();
    fetchproducts();
    fetchleader();
  
  }, [artistId]); // Ensure artistId is stable to avoid unnecessary calls
  
  
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
                  <p>{count}</p>
                </div>
                <div className="stat-card">
                  <h4>Total Sales</h4>
                  <p>{earned.earnedAmount}</p>
                </div>
              </div>
            </div>

            <div className="recent-activities" 
     style={{ 
       backgroundColor: '#f4f4f9', 
       padding: '20px', 
       borderRadius: '10px', 
       boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
       width: '100%', 
       maxWidth: '400px', 
       margin: '20px auto', 
       textAlign: 'center' 
     }}
>
  <h3 
    style={{ 
      fontSize: '24px', 
      color: '#333', 
      marginBottom: '20px', 
      fontWeight: 'bold' 
    }}
  >
    Leaderboard
  </h3>
  
  {leader.map((data, index) => (
    <div 
      key={index} 
      className="activity" 
      style={{ 
        backgroundColor: '#ffffff', 
        padding: '15px 10px', 
        borderRadius: '8px', 
        marginBottom: '10px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        transition: 'all 0.3s ease-in-out' 
      }}
    >
      <p 
        style={{ 
          fontSize: '16px', 
          color: '#555', 
          margin: '0', 
          fontWeight: 'bold' 
        }}
      >
        {index + 1}. {data.name}
      </p>
      
      <p 
        style={{ 
          fontSize: '16px', 
          color: '#4CAF50', 
          margin: '0', 
          fontWeight: 'bold' 
        }}
      >
        ₹{data.earnedAmount}
      </p>
    </div>
  ))}
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
