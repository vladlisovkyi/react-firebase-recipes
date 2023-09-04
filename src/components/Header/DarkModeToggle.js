import React from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      className={`${darkMode ? "bg-white" : "bg-[#130c2a]"} p-2 rounded-full`}
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <BsSunFill size={22} className="text-yellow-200" />
      ) : (
        <BsMoonStarsFill size={22} className="text-yellow-200" />
      )}
    </button>
  );
};

export default DarkModeToggle;
