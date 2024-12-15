import React, { useState } from 'react';
import '../styles/ArtisianAuth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArtisianLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('artid', response.data.artid);
      localStorage.setItem('isadmin', response.data.admin);
      console.log(response.data.artid);
      alert('Login successful');
      window.dispatchEvent(new Event('storage')); // Notify navbar of changes
      window.location.href = '/dashboard';;
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <a href="/artisian-register">Register</a></p>
    </div>
  );
};

export default ArtisianLogin;
