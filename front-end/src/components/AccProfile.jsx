import React, { useState, useContext } from "react";
import axios from "axios";
import { Navigate, redirect } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const AccProfile = () => {
  const { user, setUser } = useUserContext();
  const [redirect, setRedirect] = useState(false);
  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/users/logout");
      setUser(null);
      setRedirect(true);
      console.log(data);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <div>
      <div className="flex flex-col gap-4 items-center">
        <p>
          Logado como: {user?.name}{" "}
          <span className="font-semibold">({user?.email})</span>
        </p>
        <button
          onClick={handleLogout}
          className="min-w-44 bg-primary-400 cursor-pointer rounded-full px-4 py-2 transition text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccProfile;
