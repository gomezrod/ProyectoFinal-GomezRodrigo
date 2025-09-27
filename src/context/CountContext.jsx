import { createContext } from "react";
import { useState } from "react";

const CountContext = createContext();

const CountProvider = ({ children }) => {
    const [count, setCount] = useState(1);
    
    const incrementCounter = () => setCount(count + 1);
    const decrementCounter = () => setCount(count > 1 ? count - 1 : 1);

    return (
        <CountContext.Provider value={{ count, incrementCounter, decrementCounter }}>
            {children}
        </CountContext.Provider>
    );
}

export { CountContext, CountProvider}