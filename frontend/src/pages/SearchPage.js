import React from "react";
import Layout from "../components/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
const SearchPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="row mt-3">
        <div className="col-md-3 sidebar-search ">
          <div className="left-sidebar">
            <div className="search-info">Search Results</div>
            <div className="result-count">
              {values?.results.length} products found
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className=" d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
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
                <button className="add-to-cart-button">Add to Cart</button>
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
    </Layout>
  );
};

export default SearchPage;
