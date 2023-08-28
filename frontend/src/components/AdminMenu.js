import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center  ">
        <div className="list-group">
          <h3>Admin Panel</h3>
          <NavLink
            to="/panel/admin/addcategory"
            className="list-group-item list-group-item-action"
          >
            Add new category
          </NavLink>
          <NavLink
            to="/panel/admin/addproduct"
            className="list-group-item list-group-item-action"
          >
            Add new product
          </NavLink>
          <NavLink
            to="/panel/admin/users"
            className="list-group-item list-group-item-action"
          >
            Add new user
          </NavLink>
          <NavLink
            to="/panel/admin/products"
            className="list-group-item list-group-item-action"
          >
            See all products here
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
