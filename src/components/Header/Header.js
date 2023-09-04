import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { FaBowlFood } from "react-icons/fa6";
const Header = () => {
  const { currentUser, signOut } = useAuth();

  return (
    <header className="sticky top-0 left-0 w-full h-20 bg-[var(--bkg-color)]  px-[2.5%] md:px-[5%] flex items-center justify-between z-20 transition-colors duration-200">
      <Link to={"/"} className="flex items-center gap-1">
        <FaBowlFood size={24} className="text-[var(--btn-color)]" />
        <span className="text-xl">Recipes</span>
      </Link>
      <div className="flex gap-8 items-center">
        <DarkModeToggle />
        {currentUser ? (
          <button onClick={signOut} className="btn-primary">
            Sign Out
          </button>
        ) : (
          <Link to={"/signin?type=signin"} className="btn-primary">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
