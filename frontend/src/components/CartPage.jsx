import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(carts);
  }, []);
  

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = async (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  
  

  // Proceed to payment page
  const proceedToBuy = () => {
    const totalPrice = calculateTotal();
    navigate("/payment", { state: { cart, totalPrice } }); // Pass cart and totalPrice to PaymentPage
  };

  if (cart.length === 0) {
    return <div style={styles.emptyCartMessage}>Your cart is empty.</div>;
  }

  return (
    <div style={styles.cartContainer}>
      <h1 style={styles.heading}>Your Shopping Cart</h1>
      <div style={styles.cartItems}>
        {cart.map((item) => (
          <div key={item._id} style={styles.cartItem}>
            <img src={item.image} alt={item.name} style={styles.cartImage} />
            <div style={styles.cartDetails}>
              <p style={styles.cartItemName}>{item.name}</p>
              <p style={styles.cartItemArtisan}>
                Artisan: {item.artisanId ? item.artisanId.name : "Unknown"}
              </p>
              <p style={styles.cartItemPrice}>₹{item.price}</p>
              <div style={styles.quantity}>
                <label htmlFor={`quantity-${item._id}`} style={styles.label}>
                  Quantity:
                </label>
                <input
                  type="number"
                  id={`quantity-${item._id}`}
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item._id, Number(e.target.value))
                  }
                  style={styles.input}
                />
              </div>
              <p style={styles.cartItemTotal}>
                Total: ₹{item.price * item.quantity}
              </p>
            </div>
            <button
              onClick={() => handleRemoveItem(item._id)}
              style={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div style={styles.cartSummary}>
        <h2 style={styles.summaryHeading}>Cart Summary</h2>
        <p style={styles.summaryText}>
          Total Price: ₹{calculateTotal()}
        </p>
        <button style={styles.checkoutBtn} onClick={proceedToBuy}>
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

const styles = {
  cartContainer: {
    padding: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: "12px",
    maxWidth: "800px",
    margin: "0 auto",
    marginTop: "70px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  cartImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  cartDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cartItemName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  cartItemArtisan: {
    fontSize: "16px",
    color: "#666",
  },
  cartItemPrice: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  quantity: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: "16px",
    marginRight: "10px",
  },
  input: {
    padding: "5px 10px",
    fontSize: "16px",
    width: "50px",
    textAlign: "center",
  },
  cartItemTotal: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cartSummary: {
    marginTop: "30px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  summaryHeading: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  summaryText: {
    fontSize: "18px",
    marginTop: "10px",
  },
  checkoutBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "20px",
  },
  emptyCartMessage: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "50px",
  },
};

export default CartPage;
