import { useEffect } from "react";
import App from "../App";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Auth/Login/Login.component";
import Register from "./Auth/Register/Register.component";
import HomePage from "../homepage";
import { auth } from "../server/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../store/actioncreater";
import { AppLoader } from "./AppLoader/AppLoader.component";
import { set } from "firebase/database";

export default function Index() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.channel.loading);
  const navigate = useNavigate();
  const location = useLocation(); // To get the current path

  useEffect(() => {
    dispatch(setLoading(true)); // Set loading to true when starting auth check
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      dispatch(setUser(currentUser));
      dispatch(setLoading(false)); // Set loading to false after auth check
      navigate(currentUser ? '/' : '/homepage');

    });

    return () => {
      unsubscribe();
      dispatch(setLoading(false));
    }
  }, []);


  console.log("Debug ", currentUser);
  console.log("Loading : ", loading.loading);

  return (
    <>
      <AppLoader loading={loading.loading || false} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<App />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>

    </>
  );
}
