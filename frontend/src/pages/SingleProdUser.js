import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleProdUser = () => {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { slug } = useParams();
  const [singleProd, setSingleProd] = useState({});
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
      console.log(data);
      if (data?.success) {
        setSingleProd(data?.product);
        getSimilarProduct(data?.product._id, data?.product?.category);
        // console.log(data?.product);
      }
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="single-product-page">
            <div className="similar-products">
              <div className="text-center similar-products-title">
                Similar Products
              </div>
              <div className="similar-product-list">
                {relatedProducts.length < 1 ? (
                  <div className="title-of-no-products">
                    No related products found
                  </div>
                ) : (
                  relatedProducts.map((p) => (
                    <div key={p._id} className="similar-product-card">
                      <div className="similar-product-image">
                        <img
                          src={`/api/v1/product/get-product-photo/${p?._id}`}
                          alt={p.name}
                        />
                      </div>
                      <div className="similar-product-details">
                        <div className="similar-product-name">{p.name}</div>
                        <div className="similar-product-category">
                          Category: {p.category.name}
                        </div>
                        <div className="similar-product-description">
                          {p.description.substring(0, 200)}
                        </div>
                        <button
                          className="see-more-button"
                          onClick={() => {
                            navigate(`/product/${p.slug}`);
                            window.location.reload();
                          }}
                        >
                          Click to see more details
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-page">
            <h3 className="my-product-title">Your Product</h3>
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
                  <p className="product-price">
                    In Stock: {singleProd?.quantity}
                  </p>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProdUser;
