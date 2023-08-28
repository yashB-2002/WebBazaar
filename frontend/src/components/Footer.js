import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h5 className="text-center">All rights reserved &copy; Yash Bhardwaj</h5>
      <p className="text-center mt-3">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
      </p>
    </div>
  );
};

export default Footer;
