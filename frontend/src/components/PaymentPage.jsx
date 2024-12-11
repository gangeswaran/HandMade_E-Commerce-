import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook

const PaymentPage = () => {
  const { state } = useLocation(); // Get the state passed from CartPage
  const { cart = [], totalPrice = 0 } = state || {}; // Destructure cart and totalPrice with defaults
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Handle payment logic
  const handlePayment = () => {
    // Simulate a payment process
    setPaymentStatus("Payment Successful!");
    // Integrate with a payment gateway like Stripe, PayPal, etc.
  };

  return (
    <div style={styles.paymentContainer}>
      <h1 style={styles.paymentHeading}>Payment Details</h1>
      <div style={styles.cartDetails}>
        <h2>Cart Items</h2>
        {cart.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.cartImage} />
              <div style={styles.cartItemInfo}>
                <p style={styles.cartItemName}>{item.name}</p>
                <p style={styles.cartItemPrice}>₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p style={styles.cartItemTotal}>Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))
        )}
        <div style={styles.cartSummary}>
          <h3>Total: ₹{totalPrice}</h3>
        </div>
      </div>

      {/* Payment Form Fields */}
      <div style={styles.paymentForm}>
        <label style={styles.label}>Card Number</label>
        <input type="text" placeholder="Enter card number" style={styles.inputField} />
        
        <div style={styles.cardDetails}>
          <div style={styles.cardExp}>
            <label style={styles.label}>Expiry Date</label>
            <input type="text" placeholder="MM/YY" style={styles.inputField} />
          </div>
          <div style={styles.cardCVV}>
            <label style={styles.label}>CVV</label>
            <input type="text" placeholder="Enter CVV" style={styles.inputField} />
          </div>
        </div>
        
        <div style={styles.paymentSummary}>
          <h3>Total: ₹{totalPrice}</h3>
        </div>
      </div>

      <button onClick={handlePayment} style={styles.paymentButton}>
        Pay Now
      </button>
      {paymentStatus && <p style={styles.paymentStatus}>{paymentStatus}</p>}
    </div>
  );
};

const styles = {
  paymentContainer: {
    padding: "40px",
    backgroundColor: "#f4f4f4",
    borderRadius: "12px",
    maxWidth: "700px",
    margin: "0 auto",
    marginTop: "70px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
  paymentHeading: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "30px",
    textTransform: "uppercase",
  },
  cartDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "30px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
  },
  cartImage: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "10px",
    marginRight: "15px",
  },
  cartItemInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  cartItemName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: "16px",
    color: "#666",
  },
  cartItemTotal: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  cartSummary: {
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  paymentForm: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
  },
  label: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "6px",
    fontWeight: "bold",
  },
  inputField: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  cardDetails: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  cardExp: {
    flex: 1,
  },
  cardCVV: {
    flex: 1,
  },
  paymentSummary: {
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  paymentButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "15px 25px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "18px",
    width: "100%",
    marginTop: "20px",
  },
  paymentStatus: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#4caf50",
    textAlign: "center",
  },
};

export default PaymentPage;
