import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const Layout = ({ children, description, keywords, author, title }) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />

      <main style={{ minHeight: "75vh" }}>
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Online Shopping App - WebBazaar",
  description: "Shop now..",
  author: "Yash Bhardwaj",
  keywords: "React, Nodejs, Mongodb, Html, CSS, Javascript, Mern",
};

export default Layout;
