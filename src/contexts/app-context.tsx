import React, { useEffect, useState } from "react";

interface AppContext {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  searchHistory: any[];
  setSearchHistory: React.Dispatch<React.SetStateAction<any[]>>;
}

const AppContext = React.createContext<AppContext>({
  theme: "light",
  setTheme: () => {},
  searchHistory: [],
  setSearchHistory: () => {},
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light"); // light, dark
  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  // Use localStorage to save search history instead API
  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  return (
    <AppContext.Provider
      value={{ theme, setTheme, searchHistory, setSearchHistory }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
export { AppContext };
