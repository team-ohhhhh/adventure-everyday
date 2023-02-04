import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"

const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let TOKEN = useSelector((state) => state.token)

  useEffect(() => {
    if (!TOKEN) {
      navigate("/login", { state: pathname });
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;