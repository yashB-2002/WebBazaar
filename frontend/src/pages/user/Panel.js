import React from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";

const panel = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [auth] = useAuth();
  return (
    <Layout title={"User Panel - WebBazaar"}>
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="user-card">
          <h3 className="user-name">{auth.user.name}</h3>
          <p className="user-info">
            <span className="user-label">Address:</span> {auth.user.address}
          </p>
          <p className="user-info">
            <span className="user-label">Email:</span> {auth.user.email}
          </p>
          <p className="user-info">
            <span className="user-label">Phone:</span> {auth.user.phone}
          </p>
          <p className="user-role">
            <span className="user-label">Role:</span>{" "}
            {auth.user.role === 1 ? "Admin" : "Normal User"}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default panel;
