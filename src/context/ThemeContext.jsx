import { createContext } from "react";
import { useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeProvider, ThemeContext };
        