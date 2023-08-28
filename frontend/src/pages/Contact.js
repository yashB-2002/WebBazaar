import React from "react";
import Layout from "../components/Layout";

const Contact = () => {
  return (
    <>
      <Layout
        title="Contact Page - WebBazaar"
        description="This is contact page of website"
      >
        <div className="contact-us-page">
          <h1>Contact Us</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                autoComplete="off"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                autoComplete="off"
                name="message"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
