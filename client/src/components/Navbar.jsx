import { useState } from "react";
import { RiCloseFill, RiMenu3Line } from "@remixicon/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 m-2">
      <div className="text-neutral-500 bg-black/60 backdrop-blur-md max-w-7xl mx-auto px-4 py-3 flex justify-between items-center rounded-xl border border-neutral-800">
        <img src={"../../src/assets/Beat Central Logo.png"} alt="logo" width={70} height={24} />

        <div className="hidden md:flex space-x-4 items-center">
          <a href="#pricing" className="hover:text-neutral-200">
            Pricing
          </a>
          <a href="login" className="hover:text-neutral-200">
            Login
          </a>
          <a
            href="#"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition"
          >
            Start For Free
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
