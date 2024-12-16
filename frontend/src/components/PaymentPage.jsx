import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import '../styles/PaymentPage.css';

const PaymentPage = () => {
  const { state } = useLocation();
  const { cart = [], totalPrice = 0 } = state || {}; 
  const [paymentStatus, setPaymentStatus] = useState(null);
  const artistId = localStorage.getItem("artisanIdproduct");
  const [allowCOD, setAllowCOD] = useState(true); 
  const userId = localStorage.getItem("user");
  const [user, setUser] = useState(null); 
  const [cod, setCod] = useState(null); 
  console.log(cart[0]['_id']);
  useEffect(() => {
    const checkCODLimit = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/cod/${userId}`);
        setUser(response.data);
        setCod(response.data.codCount);
        if (response.data.codCount >= 5) {
          console.log("COD limit reached. Disabling COD option.");
          setAllowCOD(false);
          localStorage.setItem("allowCOD", "false");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const persistedAllowCOD = localStorage.getItem("allowCOD");
    if (persistedAllowCOD === "false") {
      setAllowCOD(false);
    }

    checkCODLimit();
  }, [userId]);

  const handlePayment = async (paymentMethod) => {
    setPaymentStatus("Processing...");
    alert("Confirm payment");

    if (!artistId) {
      setPaymentStatus("Error: Artisan not found.");
      return;
    }

    if (paymentMethod === "COD" && !allowCOD) {
      setPaymentStatus("COD limit exceeded. Please choose online payment.");
      return;
    }

    const productData = cart.map(item => ({
      productId: item._id, 
      quantity: item.quantity ,
      pname : item.name,
    }));
    setTimeout(async () => {
      try {
        const [updateResponse, codResponse,cartres] = await Promise.all([
          axios.post("http://localhost:4000/api/updateearned", { artisianId: artistId, amount: totalPrice }),
          axios.post(`http://localhost:4000/api/checkcod/${userId}`),
          axios.post("http://localhost:4000/api/usercart",{userId, quantity:cart.length, productIds:productData}),
        ]);

        if (updateResponse.status === 200) {
          setPaymentStatus("Payment Successful!");
        } else {
          setPaymentStatus("Payment Failed. Please try again.");
        }
      } catch (error) {
        console.error("Payment error:", error);
        setPaymentStatus("Payment Failed. Please try again.");
      }
    }, 3000); 
  };

  return (
    <div className="payment-container">
      <h1 className="payment-heading">Payment Details</h1>
      <div className="cart-details">
        <h2>Cart Items</h2>
        {cart.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p className="cart-item-total">Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))
        )}
        <div className="cart-summary">
          <h3>Total: ₹{totalPrice}</h3>
        </div>
      </div>

      <div className="payment-options">
        <h2>Payment Method</h2>
        {allowCOD && <h3>{5 - cod} Cash On Deliveries Left</h3>}
        <button
          onClick={() => handlePayment("COD")}
          className={allowCOD ? "payment-button" : "payment-button disabled-button"}
          disabled={!allowCOD}
        >
          Cash on Delivery
        </button>
        {!allowCOD && <p>COD limit reached. Please use online payment.</p>}
        {!allowCOD && <form >
          <label htmlFor="payment" >Card Number:</label>
          <input type="number" placeholder="xxx-xxx-xxx"/>
          <label htmlFor="payment">Expiry Date:</label>
          <input type="num" placeholder="MM/YY" />
          <label htmlFor="payment">CVV:</label>
          <input type="number" placeholder="000"/>

          </form>}
        <button
          onClick={() => handlePayment("Online")}
          className="payment-button"
        >
          Pay Online
        </button>
      </div>

      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentPage;
