import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await axios.post("/api/v1/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (res.data.success) {
        alert("Registered Successfully.");
        // console.log(res.data);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        // toast(res.data.message);
        alert(res.data.message);
      }
    } catch (e) {
      console.log(e);
      // toast(e.message);
      alert(e.message);
    }
    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <Layout
      title={"Login Page - WebBazaar"}
      description={"this is sign in page for website"}
    >
      <div className="signup-page">
        <div className="signup-content">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              onClick={() => navigate("/forgotpassword")}
              className="submit-button"
            >
              Forgot Password
            </button>
            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
