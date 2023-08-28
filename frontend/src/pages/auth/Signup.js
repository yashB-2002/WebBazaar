import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    key: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/signup", {
        name: formData.name,
        address: formData.address,
        phone: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        forgotPasswordKey: formData.key,
      });
      if (res && res.data.success) {
        alert(res.data && res.data.message);
        navigate("/login");
      } else {
        alert(res.data && res.data.message);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
    setFormData({
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
  };
  return (
    <Layout
      title={"Register Page - WebBazaar"}
      description={"this is sign up for website"}
    >
      <div className="signup-page">
        <div className="signup-content">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                autoComplete="off"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                autoComplete="off"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                autoComplete="off"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                autoComplete="off"
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                autoComplete="off"
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="key">Enter Your Secret Key</label>
              <input
                autoComplete="off"
                type="text"
                id="key"
                value={formData.key}
                onChange={handleChange}
                name="key"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
