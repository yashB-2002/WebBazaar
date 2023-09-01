import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();
  return (
    <div className="payment-cancelled-page">
      <div className="payment-cancelled-content">
        <h2 className="payment-cancelled-heading">Payment Cancelled</h2>
        <p className="payment-cancelled-message">
          Your payment was not completed successfully.
        </p>
        <button className="back-to-cart-button " onClick={navigate("/cart")}>
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Cancel;
