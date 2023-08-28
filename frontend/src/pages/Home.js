import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
// import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { PriceFilter } from "../components/PriceFilter";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Context";
// import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [radio, setRadio] = useState([]);
  const [checked, setChecked] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        console.log(categories);
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClearFilter = async () => {
    window.location.reload();
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <Layout title="Home page- Web Bazaar">
        <div className="row mt-3">
          <div className="col-md-3">
            <h4 className="text-center section-heading">Filter By Category</h4>
            <div className="d-flex flex-column ms-2 ">
              {categories?.map((c) => (
                // <Checkbox
                //
                // onChange={(e) => setCategory(e.target.value)}
                // >
                //   {c.name}
                // </Checkbox>
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}{" "}
                </Checkbox>
              ))}
            </div>
            {/* <div className="col-md-3"> */}
            <h4 className="text-center section-heading mt-3 ">
              Filter By Price
            </h4>
            <div className="d-flex flex-column ms-2 ">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {PriceFilter?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.value}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column ms-2  my-3 ">
              <button className="btn btn-danger" onClick={handleClearFilter}>
                Clear All Filters{" "}
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {/* {JSON.stringify(radio, null, 4)} */}
            <h2 className="section-heading">
              Lowest Prices, Best Quality Shopping
            </h2>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="card m-2 product-card "
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`/api/v1/product/get-product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-title">
                      {p.description.substring(0, 100)}....
                    </p>
                    <p className="product-price">Price: Rs.{p.price}</p>
                  </div>
                  <button
                    className="add-to-cart-button"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      alert("Added to cart.");
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="add-to-cart-button"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Click to get more details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* </div> */}
      </Layout>
    </>
  );
};

export default Home;
