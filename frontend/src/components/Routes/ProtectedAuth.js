import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

const ProtectedAuth = () => {
  const [permit, setPermit] = useState(false);
  const [auth] = useAuth();
  useEffect(() => {
    const check = async () => {
      const res = await axios.get("/api/v1/auth/authenticate");
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

export default ProtectedAuth;
