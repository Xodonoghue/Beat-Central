import { useState,useContext } from "react";
import { RiCloseFill, RiMenu3Line } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const {user, loading, error, dispatch} = useContext(AuthContext)
  const logout = () => {
      dispatch({type:"LOGOUT"})
      navigate("/login")
  }

  return (
    <nav className="top-4 left-0 right-0 z-50 p-3">
      <div className="text-neutral-400 bg-black/80 backdrop-blur-md max-w-7xl mx-auto px-4 py-3 flex justify-between items-center rounded-xl border border-neutral-800">
        <img src={"../../src/assets/Beat Central Logo.png"} alt="logo" width={70} height={24} />

        <div className="hidden md:flex space-x-4 items-center">
        <a onClick={() => {navigate("/dashboard")}} className="hover:text-neutral-200">
            Dashboard
          </a>
          <a onClick={() => {navigate("/upload-beat")}} className="hover:text-neutral-200">
            Upload Beat
          </a>
        <a onClick={() => {navigate("/manage-store")}} className="hover:text-neutral-200">
            Manage Store
          </a>
          <a onClick={() => {navigate("/tasks")}} className="hover:text-neutral-200">
            Tasks
          </a>
          <a onClick={() => {navigate("/account")}} className="hover:text-neutral-200">
            Manage Account
          </a>
          <a onClick={() => {logout()}} className="hover:text-neutral-200">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
