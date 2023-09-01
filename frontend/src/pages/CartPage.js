import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Context";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const totalCartPrice = cart.reduce((total, item) => total + item.price, 0);
  const handleRemoveFromCart = async (product) => {
    let newCart = cart.filter((p) => p._id !== product._id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const makePayment = async () => {
    console.log(cart);
    const stripe = await loadStripe("your stripe private key");
    const body = {
      products: cart,
    };
    const { data } = await axios.post("/api/v1/product/checkout", body);
    console.log(data);
    const result = stripe.redirectToCheckout({
      sessionId: data.id,
    });
    if (result.error) console.log(result.error);
  };
  return (
    <Layout>
      {auth?.token ? (
        <div className="cart-page">
          <div className="cart-container">
            <div className="cart-products">
              <h2 className="cart-heading">Your Cart</h2>
              {cart.map((product) => (
                <div key={product.id} className="product-item">
                  <img
                    src={`/api/v1/product/get-product-photo/${product._id}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">₹{product.price}</div>
                  </div>
                  <button
                    className="remove-from-cart-button"
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="checkout-section">
              <h2 className="cart-heading">Proceed to Checkout</h2>
              <p>
                Total Prdoucts:{" "}
                <span style={{ fontWeight: "bold" }}> {cart?.length}</span>
              </p>
              <p>
                Subtotal:{" "}
                <span style={{ fontWeight: "bold" }}>₹{totalCartPrice}</span>
              </p>
              <button className="checkout-button" onClick={makePayment}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        "Please login first to start shopping"
      )}
    </Layout>
  );
};

export default CartPage;
