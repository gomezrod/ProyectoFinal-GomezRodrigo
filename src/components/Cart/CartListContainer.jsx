import { CartContext } from "../../context/CartContext"
import { useContext } from "react"
import { useState, useEffect } from "react"
import Button from "../Button/Button";
import './CartListContainer.css';
import { Link } from "react-router-dom";


export default function CartListContainer () {
    const {cartItems, removeFromCart} = useContext(CartContext);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newTotal = cartItems.reduce((acu, item) => acu + item.price * item.qty, 0);
        setTotal(newTotal);
    }, [cartItems]);

    return(
        <ul className='cart-list-container'>
            {
                
                cartItems.length > 0 ? cartItems.map(item => (
                    <li key={item.id} className="cart-item">
                        <span className="unidad-item">{`${item.qty}x `}</span>{item.title} - ${item.price}
                        <Button onClick={() => {
                            removeFromCart(item.id);
                        }} className="boton-eliminar">🗑️</Button>
                    </li>
                )) : <p>El carrito está vacío</p>
            }
            {cartItems.length>0 && <li className="cart-total">Total: ${total.toFixed(2)}</li>}
            {cartItems.length > 0 && <Link className="link" to={'/comprar'}><Button>Finalizar Compra</Button></Link>}
        </ul>
    )
}