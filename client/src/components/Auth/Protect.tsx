import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export default function Protect() {
  const { user } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem("token") as string;

  const isAuth = token && user;

  //  const isAuth = token && user;

  console.log("Protect Component - token:", token);
  console.log("Protect Component - user:", user);
  console.log("Protect Component - isAuth:", isAuth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
}
