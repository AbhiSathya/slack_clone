import { useEffect } from "react";
import App from "../App";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Auth/Login/Login.component";
import Register from "./Auth/Register/Register.component";
import { auth } from "../server/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/actioncreater";

export default function Index() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser));
        navigate("/");
      } else {
        dispatch(setUser(null));
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  console.log("Debug ", currentUser);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
}
