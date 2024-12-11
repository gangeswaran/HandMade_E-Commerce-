import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sales = () => {
  const artistId = localStorage.getItem('artid'); // Ensure 'artid' is set properly during login

  const [salesData, setSalesData] = useState([]);
  const sales = {
    sales: 10000,
    profit: 500
  }
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/productAdmin/${artistId}`);
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, [artistId]);
  const tableHeaderStyle = {
    backgroundColor: '#4A90E2',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  };
  
  const tableCellStyle = {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
  };
  

  return (
    <div>
      <h2>Sales & Profit Data</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Product</th>
            <th style={tableHeaderStyle}>Sales</th>
            <th style={tableHeaderStyle}>Profit</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((data, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{data.date}</td>
              <td style={tableCellStyle}>{data.name}</td>
              <td style={tableCellStyle}>₹{sales.sales}</td>
              <td style={tableCellStyle}>₹{sales.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
