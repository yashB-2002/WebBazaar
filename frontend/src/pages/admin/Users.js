import React from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";

const Users = () => {
  return (
    <Layout
      title={"all users page"}
      description={"this is all users page of website"}
    >
      <div className="container-fluid m-3 p-4 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">All users</div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
