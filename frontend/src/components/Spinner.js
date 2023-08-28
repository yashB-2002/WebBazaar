import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [sec, setSec] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    let id = setInterval(() => {
      setSec((prev) => prev - 1);
    }, 1000);
    sec === 0 && navigate("/");
    return () => {
      clearInterval(id);
    };
  }, [sec, navigate]);
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      {sec > 1 ? (
        <p className="loading-text">
          Redirecting you to the home page in {sec} seconds...
        </p>
      ) : (
        <p className="loading-text">
          Redirection complete! You are now on the home page.
        </p>
      )}
    </div>
  );
};

export default Spinner;
