import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Layout
        title="Invalid Page - WebBazaar"
        description="This is invalid page of website"
      >
        <div className="not-found-page">
          <h1>Page Not Found</h1>
          <p>The requested page could not be found.</p>
          <Link to="/" className="back-button">
            Go Back to Home
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default NotFound;
