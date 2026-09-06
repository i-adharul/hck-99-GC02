import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import Button from "../components/Button";

export default function AddUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
    role: "Staff",
    phoneNumber: "",
    address: "",
  });

  function setForm(key, value) {
    setUsers((pValue) => {
      return {
        ...pValue,
        [key]: value,
      };
    });
  }

  async function handleForm(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseUrl}/add-user`, users, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showSuccessToast(res.data.message);

      navigate(`/`);
    } catch (error) {
      showErrorToast(error.response?.data?.message);
    }
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <div className="flex flex-col justify-center items-center min-h-screen p-6 gap-4">
          <h1>TiketStays CMS</h1>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Add User</legend>

            <label className="label">Username</label>
            <input
              type="text"
              className="input"
              placeholder="username"
              onChange={(e) => {
                setForm("username", e.target.value);
              }}
            />

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              onChange={(e) => {
                setForm("email", e.target.value);
              }}
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={(e) => {
                setForm("password", e.target.value);
              }}
            />

            <label className="label">Phone Number</label>
            <input
              type="text"
              className="input"
              placeholder="6281234567823"
              onChange={(e) => {
                setForm("phoneNumber", e.target.value);
              }}
            />

            <label className="label">Address</label>
            <input
              type="text"
              className="input"
              placeholder="Jl. Pondok Indah"
              onChange={(e) => {
                setForm("address", e.target.value);
              }}
            />

            <Button btnName="Add User" btnColor={"btn-primary"} type="submit" />
          </fieldset>
        </div>
      </form>
    </>
  );
}
