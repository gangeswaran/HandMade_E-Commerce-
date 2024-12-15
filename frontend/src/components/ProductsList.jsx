import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "../styles/ProductsList.css";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const descriptionLimit = 100;
  const token =localStorage.getItem("token");

  const navigate = useNavigate();

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  const addToCart = async (product) => {
    let user = localStorage.getItem("user");
    // let userid = JSON.parse(user);
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        user = userData;
      } else {
        console.warn("User data is not present in localStorage");
        alert("Please log in to add items to the cart");
        return;
      }
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      alert("There was an issue retrieving your user data. Please log in again.");
      return;
    }
  
    const userId = user; // Ensure this userId exists
    console.log("User ID:", userId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === product._id);
  
    // If product already exists in the cart, increment quantity
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/addToCart",
        { 
          productId: product._id, 
          quantity: 1, 
          userId: user // Ensure this field is included in the request payload
        }
      );
      console.log(response.data);
      alert('Product added to cart successfully');
      navigate('/cart');
    } catch (error) {
      console.error("Error adding to cart", error);
      alert('Failed to add product to cart');
    }
  };
  
  
  
  
  
  
  
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/productList")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  },[]);
  products.map((product) => {
    localStorage.setItem("artisanIdproduct",product.artisanId._id);

  });
  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="cardProduct"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {products.map((product) =>
        product && product.name ? (
          <Card style={{ width: "18rem", margin: "10px" }} key={product._id}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text style={{ fontWeight: "bold", color: "#555" }}>
                Artisan: {product.artisanId ? product.artisanId.name : "Unknown"}
              </Card.Text>
              <Card.Text className="description">
                {readMore
                  ? product.description
                  : product.description.slice(0, descriptionLimit) +
                    (product.description.length > descriptionLimit
                      ? "..."
                      : "")}
                {product.description.length > descriptionLimit && (
                  <span
                    onClick={toggleReadMore}
                    style={{
                      color: "#007bff",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {readMore ? " Read Less" : " Read More"}
                  </span>
                )}
              </Card.Text>
              <Card.Text style={{ fontWeight: "bolder", color: "black" }}>
                ₹{product.price}
              </Card.Text>
              <Button variant="primary" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <div key={product._id}>Product data is missing</div>
        )
      )}
    </div>
  );
};

export default ProductsList;
