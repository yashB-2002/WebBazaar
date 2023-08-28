import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import SearchInput from "./Form/SearchInput";
import { useCart } from "../context/Context";
import { Badge } from "antd";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert("logged out successfully.");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            WebBazaar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item  ">
                <NavLink className="nav-link " to="/">
                  Home
                </NavLink>
              </li>

              <SearchInput />
              <li className="nav-item ">
                <NavLink className="nav-link " to="/cart">
                  <Badge count={cart.length} offset={[5, 2]}>
                    <p style={{ fontSize: "20px" }}> 🛒</p>
                  </Badge>
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      SignUp
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth.user.name}
                    </NavLink>

                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/panel/${
                            auth.user.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Panel
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          onClick={handlelogout}
                          to="/login"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
