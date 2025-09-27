import './Footer.css';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

export default function Footer() {
    const {isDarkMode} = useContext(ThemeContext);
    return (
        <footer className={`footer ${isDarkMode?'dark':'light'}`}>
            <p>© 2025 Rodrigo Gómez</p>
            <div className='redes'>
                <a href='https://www.linkedin.com/in/gomezrn/' target='_blank'>
                    <img className='img-footer' src="https://img.icons8.com/?size=100&id=8808&format=png&color=1A1A1A" alt="linkedin-logo" />
                </a>
                <a href='https://github.com/gomezrod/' target='_blank'>
                    <img className='img-footer' src="https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=1A1A1A" alt="gihub-logo" />
                </a>
            </div>
        </footer>
    );
}