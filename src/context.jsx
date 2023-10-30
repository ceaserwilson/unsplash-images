import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getInitialMode = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

  const storedDarkMode = localStorage.getItem("darkTheme") === "true";

  return storedDarkMode || prefersDark;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialMode());
  const [searchTerm, setSearchTerm] = useState("dogs");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", isDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
