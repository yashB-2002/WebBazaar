import React from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/auth";

const panel = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [auth] = useAuth();
  return (
    <Layout title={"User Panel - WebBazaar"}>
      <div className="container-fluid m-3 p-4 ">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 text-center  ">
              <h4>User Name - {auth.user.name}</h4>
              <h4>User Email - {auth.user.email}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default panel;
