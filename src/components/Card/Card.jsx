import './Card.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';

export default function Card({children}) {
    const { isDarkMode } = useContext(ThemeContext);
    return (
        <div className={"card" + (isDarkMode ? ' dark' : ' light')}>
        {children}
        </div>
  );
} 