import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

const AdminProtected = () => {
  const [permit, setPermit] = useState(false);
  const [auth] = useAuth();
  useEffect(() => {
    const check = async () => {
      const res = await axios.get("/api/v1/auth/adminauthenticate");
      if (res.data.success) {
        setPermit(true);
      } else {
        setPermit(false);
      }
    };
    auth?.token && check();
  }, [auth?.token]);
  return permit ? <Outlet /> : <Spinner />;
};

export default AdminProtected;
