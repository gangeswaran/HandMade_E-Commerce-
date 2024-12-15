import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { state } = useLocation();
  const { cart = [], totalPrice = 0 } = state || {}; // Assuming artisanId is passed in state
  const [paymentStatus, setPaymentStatus] = useState(null);
  const artistId = localStorage.getItem("artisanIdproduct");
  const [allowCOD, setAllowCOD] = useState(true); // Whether COD is allowed or not
  const userId = localStorage.getItem("user");
  const [user, setUser] = useState(null); // Store user data
  
  useEffect(() => {
    // Fetch user data and check COD limit on component mount
    const checkCODLimit = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/cod/${userId}`);
        setUser(response.data);
        if (response.data.codCount >= 5) {
          console.log("COD limit reached. Disabling COD option.");
          setAllowCOD(false);
          localStorage.setItem("allowCOD", "false"); // Persist the COD status in localStorage
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Retrieve the persisted value for allowCOD from localStorage
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

    // Simulate a payment API request
    setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/updateearned",
          {
            artisianId: artistId,
            amount: totalPrice,
          }
        );

        if (response.status === 200) {
          setPaymentStatus("Payment Successful!");
        } else {
          setPaymentStatus("Payment Failed. Please try again.");
        }
      } catch (error) {
        console.error("Payment error:", error);
        setPaymentStatus("Payment Failed. Please try again.");
      }
    }, 3000); // Simulate a delay
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
                <p style={styles.cartItemTotal}>
                  Total: ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))
        )}
        <div style={styles.cartSummary}>
          <h3>Total: ₹{totalPrice}</h3>
        </div>
      </div>

      <div style={styles.paymentOptions}>
        <button
          onClick={() => handlePayment("COD")}
          style={allowCOD ? styles.paymentButton : { ...styles.paymentButton, ...styles.disabledButton }}
          disabled={!allowCOD} // Disable button when allowCOD is false
        >
          Cash on Delivery
        </button>
        {!allowCOD && <p>COD limit reached. Please use online payment.</p>}
        <button
          onClick={() => handlePayment("Online")}
          style={styles.paymentButton}
        >
          Pay Online
        </button>
      </div>

      {paymentStatus && <p>{paymentStatus}</p>}
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
  paymentOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
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
  disabledButton: {
    backgroundColor: "#d6d6d6", // Gray background for disabled button
    color: "#a6a6a6", // Lighter text color
    cursor: "not-allowed", // Change cursor to indicate it's not clickable
  },
};

export default PaymentPage;
