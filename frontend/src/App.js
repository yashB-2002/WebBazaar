import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Signup from "./pages/auth/Signup";

import Login from "./pages/auth/Login";
import Panel from "./pages/user/Panel";
import ProtectedAuth from "./components/Routes/ProtectedAuth";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import AdminProtected from "./components/Routes/AdminProtected";
import AdminPanel from "./pages/admin/AdminPanel";
import AddCategory from "./pages/admin/AddCategory";
import AddProduct from "./pages/admin/AddProduct";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Order from "./pages/user/Order";
import Products from "./pages/admin/Products";
import SingleProduct from "./pages/admin/SingleProduct";
import UpdateSingleProd from "./pages/admin/UpdateSingleProd";
import SearchPage from "./pages/SearchPage";
import SingleProdUser from "./pages/SingleProdUser";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<SingleProdUser />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/panel" element={<ProtectedAuth />}>
          <Route path="user" element={<Panel />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Order />} />
        </Route>
        <Route path="/panel" element={<AdminProtected />}>
          <Route path="admin" element={<AdminPanel />} />
          <Route path="admin/addcategory" element={<AddCategory />} />
          <Route path="admin/addproduct" element={<AddProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:id" element={<SingleProduct />} />
          <Route
            path="admin/product/update-product/:id"
            element={<UpdateSingleProd />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
