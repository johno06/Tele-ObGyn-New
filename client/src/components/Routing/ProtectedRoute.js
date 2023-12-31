import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/userSlice";
import { hideLoading, showLoading } from "../../redux/alertSlice";

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://fuentes-clinic.onrender.com/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        navigate("/home");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/home");
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  //verifies if user is logged in
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    //if not logged in, redirect to home page
    return <Navigate to="/home" />;
  }
}

export default ProtectedRoute;
