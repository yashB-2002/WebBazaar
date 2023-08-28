import React from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";

const Order = () => {
  return (
    <Layout title={"Orders Page"}>
      <div className="container-fluid m3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">All orders</div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
