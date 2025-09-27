import Input from '../Input/Input.jsx';
import Button from '../Button/Button.jsx';
import './NavBar.css'
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';

export default function Navbar(props) {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

    return (
    <nav className={props.className}>
        <div className='navTop'>
            <NavLink className='navLink' to=''>
                <h1 className='logo'>{props.title}</h1>
            </NavLink>
            <Input type="text" placeholder="Buscar..." onChange={(e)=>{
                console.log(e.target.value)
            }}/>
                <Button className='boton-buscar' onClick={() => alert('Búsqueda realizada')} children="🔎" />
        </div>
        <div className='navBottom'>
            <Button className='boton-modo' onClick={() => toggleDarkMode()} children={isDarkMode ? '🌞' : '🌙'} />
            <ul className='navLinks'>
                <NavLink className='navLink' to="/">Inicio</NavLink>
                <NavLink className='navLink' to="/productos">Productos</NavLink>
                <NavLink className='navLink' to="/servicios">Servicios</NavLink>
            </ul>
        </div>
    </nav>
    );
}