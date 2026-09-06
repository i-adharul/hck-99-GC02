import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { showErrorToast } from "../utils/toast";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (localStorage.access_token) {
    return <Navigate to="/" />;
  }

  async function handleLogin(e) {
    e.preventDefault(); //mencegah reload setelah submit req

    try {
      const res = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });

      localStorage.setItem("access_token", res.data.access_token);
      navigate("/");
    } catch (error) {
      showErrorToast(error.response?.data?.message);
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        {/* Container Main */}
        <div className="flex flex-col justify-center items-center min-h-screen p-6 gap-4">
          <h1>TiketStays CMS</h1>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="account@tiket.com"
              autoComplete="current-email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button btnName="Login" btnColor={"btn-info"} type="submit" />
          </fieldset>
        </div>
      </form>
    </>
  );
}
