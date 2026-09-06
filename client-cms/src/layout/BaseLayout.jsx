import { Outlet, Navigate } from "react-router";
import Navbar from "../components/Navbar";

export default function BaseLayout() {
  if (!localStorage.access_token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
