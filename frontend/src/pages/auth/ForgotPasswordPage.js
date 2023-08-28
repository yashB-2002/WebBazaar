import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    newpassword: "",
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
      const res = await axios.post("api/v1/auth/changepassword", {
        email: formData.email,
        newpassword: formData.newpassword,
        forgotPasswordKey: formData.key,
      });
      if (res.data.success) {
        alert("Password Changed Successfully.");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
    setFormData({
      email: "",
      newpassword: "",
      key: "",
    });
  };
  return (
    <Layout
      title={"Forgot Password Page - WebBazaar"}
      description={"this is reset password page for website"}
    >
      <div className="signup-page">
        <div className="signup-content">
          <h1>Reset Password</h1>
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
              <label htmlFor="newpassword">Password</label>
              <input
                autoComplete="off"
                type="newpassword"
                id="newpassword"
                value={formData.newpassword}
                onChange={handleChange}
                name="newpassword"
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
            <button
              type="submit"
              onClick={() => navigate("/login")}
              className="submit-button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
