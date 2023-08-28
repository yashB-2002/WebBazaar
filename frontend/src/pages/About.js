import React from "react";
import Layout from "../components/Layout";

const About = () => {
  return (
    <>
      <Layout
        title="About Page - WebBazaar"
        description="This is about page of website"
      >
        <div className="about-us-page">
          <div className="about-us-content">
            <h1>About Us</h1>
            <p>
              Welcome to our online store! We are dedicated to providing you
              with the best shopping experience.
            </p>
            <p>
              Our mission is to offer a wide selection of high-quality products
              at competitive prices. Whether you're looking for electronics,
              fashion, home goods, or more, you'll find it here.
            </p>
            <p>
              Our extensive catalog features a wide range of products carefully
              selected to cater to your diverse preferences. From cutting-edge
              electronics to the latest fashion trends and stylish home decor,
              we have something for everyone.
            </p>
            <p>
              At WebBazaar, we prioritize quality and affordability. Our team is
              dedicated to sourcing products from reputable suppliers, ensuring
              that every item meets our high standards. We believe that shopping
              should be enjoyable and hassle-free, and that's why we've designed
              our store to provide a seamless shopping experience.
            </p>
            <p>
              Whether you're a tech enthusiast, a fashionista, or someone
              looking to spruce up your living space, we're here to help you
              find the perfect products to suit your lifestyle. Join our
              ever-growing community of satisfied customers and experience the
              convenience of online shopping with WebBazaar.
            </p>
            <p>
              Thank you for choosing us as your go-to online shopping
              destination. Happy shopping!
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
