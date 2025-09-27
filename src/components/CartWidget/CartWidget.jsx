import './CartWidget.css';
import Button from '../Button/Button.jsx';
import { useState, useRef, useEffect } from 'react';
import CartListContainer from '../Cart/CartListContainer.jsx';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext.jsx';

export default function CartWidget({label}) {

    const [isHover, setIsHover] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const {clearCart} = useContext(CartContext);
    const boxRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if(boxRef.current && !boxRef.current.contains(e.target)){
                setShowCart(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const handleClick = () => {
        setShowCart(!showCart);
        showCart ? setIsHover(false) : setIsHover(true);
    }

    const handleClickLimpiar = () => {
        clearCart();
    }

    return (
        <div 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            className={showCart ? 'cart-widget visible':'cart-widget'}>

            {showCart?
                <>
                    <div ref={boxRef} className='carrito-visible'>
                        <CartListContainer />
                        <Button onClick={handleClick} className="boton-carrito">
                            Ocultar Carrito
                        </Button>
                        <Button onClick={handleClickLimpiar} className="boton-cerrar">Vaciar carrito</Button>
                    </div>
                </>
                :
                <Button onClick={handleClick} className="boton-carrito">
                    {isHover ? "Ver Carrito" : label}
                </Button>
                }
        </div>
    );
}