import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = localStorage.getItem('user');  // The logged-in user's ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/userprofile/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`  // Authorization header with JWT
          }
        });
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.response?.data?.message || 'Failed to load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const userProfileStyles = {
    width: '100%',
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const profileHeaderStyles = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const profileDetailsStyles = {
    fontSize: '18px',
    color: '#555',
  };

  const cartStyles = {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
  };

  const loadingStyles = {
    textAlign: 'center',
    fontSize: '18px',
    color: '#007bff',
  };

  const errorStyles = {
    textAlign: 'center',
    fontSize: '18px',
    color: '#e74c3c',
  };

  const noDataStyles = {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
  };

  if (loading) return <p style={loadingStyles}>Loading...</p>;

  if (error) return <p style={errorStyles}>{error}</p>;

  if (!userData) return <p style={noDataStyles}>No user profile found</p>;

  return (
    <div style={userProfileStyles}>
      <div style={profileHeaderStyles}>
        <h1>Welcome, {userData.name || 'Guest'}!</h1>
      </div>
      <div style={profileDetailsStyles}>
        <p><strong>Email:</strong> {userData.email || 'No email available'}</p>
        <p><strong>COD Usage Count:</strong> {userData.codCount}</p>
        
        <div style={cartStyles}>
          <h3>Products Purchased</h3>
          {userData.cart && userData.cart.length > 0 ? (
            <ul>
              {userData.cart.map((item) => (
                <li key={item._id}>
                  Product ID: {item.productId} | Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found in cart.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
