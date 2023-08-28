import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center  ">
        <div className="list-group">
          <h3>Admin Panel</h3>
          <NavLink
            to="/panel/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/panel/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
