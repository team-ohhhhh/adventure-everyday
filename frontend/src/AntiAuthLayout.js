import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"

const AntiAuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let TOKEN = useSelector((state) => state.token)

  useEffect(() => {
    if (TOKEN) {
      navigate("/map", { state: pathname });
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AntiAuthLayout;