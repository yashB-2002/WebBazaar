import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState("");
  const getAllUsers = async () => {
    const { data } = await axios.get("/api/v1/user/getUser");
    if (data?.success) {
      setUsers(data?.users);
      console.log(data);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
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
          <div className="col-md-9">
            <div className="user-list-page">
              <h2 className="user-list-heading">All Users</h2>
              <div className="user-list">
                {users &&
                  users?.map((user) => (
                    <div
                      key={user._id}
                      className={`user-card ${
                        user.role === 1 ? "admin-card" : ""
                      }`}
                    >
                      <h3 className="user-name">{user.name}</h3>
                      <p className="user-info">
                        <span className="user-label">Address:</span>{" "}
                        {user.address}
                      </p>
                      <p className="user-info">
                        <span className="user-label">Email:</span> {user.email}
                      </p>
                      <p className="user-info">
                        <span className="user-label">Phone:</span> {user.phone}
                      </p>
                      <p className="user-role">
                        {user.role === 1 ? "Admin" : "Normal User"}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
