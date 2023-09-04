import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const getUserSystemDarkModePreference = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const getInitialDarkModePreference = () => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode !== null) return JSON.parse(storedDarkMode);
    return getUserSystemDarkModePreference();
  };

  const [darkMode, setDarkMode] = useState(getInitialDarkModePreference);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const contextValue = useMemo(
    () => ({ darkMode, toggleDarkMode }),
    [darkMode]
  );

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
