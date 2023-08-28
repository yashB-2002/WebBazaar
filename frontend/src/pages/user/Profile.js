import React from "react";
import UserMenu from "../../components/UserMenu";
import Layout from "../../components/Layout";

const Profile = () => {
  return (
    <Layout title={"Your Profile Page"}>
      <div className="container-fluid m3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">Profile</div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
