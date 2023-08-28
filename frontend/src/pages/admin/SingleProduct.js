import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import axios from "axios";

const SingleProduct = () => {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [singleProd, setSingleProd] = useState({});
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${id}`);
      console.log(data);
      if (data?.success) {
        setSingleProd(data?.product);

        console.log(data?.product);
      }
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };
  useEffect(() => {
    getProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <div className="product-page">
        <div className="product-container">
          <div className="product-image">
            <img
              src={`/api/v1/product/get-product-photo/${singleProd?._id}`}
              alt={singleProd?.name}
            />
          </div>
          <div className="product-details">
            <h2 className="product-title">{singleProd?.name}</h2>
            <p className="product-description">{singleProd?.description}</p>
            <div className="product-info">
              <p className="product-price">Price: ₹{singleProd?.price}</p>
              <p className="product-price">In Stock: {singleProd?.quantity}</p>
              <p className="product-category">
                Category: {singleProd?.category?.name}
              </p>
            </div>
            <div
              className={`shipping-status ${
                singleProd?.shippingStatus ? "shipped" : "not-shipped"
              }`}
            >
              {singleProd?.shippingStatus ? "Shipped" : "Not Shipped"}
            </div>
          </div>
        </div>
        <div>
          <Link
            to={`/panel/admin/product/update-product/${singleProd.slug}`}
            className="product-link"
          >
            <button className="update-button ms-2">Update</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
