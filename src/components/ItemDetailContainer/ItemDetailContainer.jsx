import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './ItemDetailContainer.css';
import Card from '../Card/Card';
import Counter from '../Counter/Counter';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext.jsx';
import { CountContext } from '../../context/CountContext.jsx';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { getItemById } from '../../db/db.js';

export default function ItemDetailContainer({itemId}) {

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { addToCart, cartItems } = useContext(CartContext);
    const { count } = useContext(CountContext);
    const { isDarkMode } = useContext(ThemeContext);

    const handleAddToCart = () => {
        console.log('Estado previo: ', cartItems);
        addToCart(producto, count);
        count===1?alert(`${producto.title} agregado al carrito`):alert(`${count} unidades de ${producto.title} agregadas al carrito`)
        console.log('Estado posterior: ', cartItems);
        
    }

    async function fetchProductById(itemId) {
        try {
            const item = await getItemById(itemId);
            if (!item) {
                throw new Error('Producto no encontrado');
            }
            setProducto(item);
            console.log(item);
            
        } catch (e) {
            setError(e);
            console.error('Error al cargar el producto:', e);
        } finally {
            setLoading(false);
        }
    }
 
    useEffect(() => {
        
        fetchProductById(itemId);
        
    }, [itemId]);

    return (

        <div className={"item-detail-container" + (isDarkMode ? ' dark' : ' light')}>
            
            <h2>Detalle del Producto</h2>
            {loading && <div className='spinner'></div>}
            {error && <Card>
                <p>Error al cargar el producto {console.log(error.message)}</p>
                </Card>}
            {producto && !loading && !error && (
                <Card>
                    <Link className='link cerrar-detalle' to={'/productos'}>X</Link>
                    <h3>{producto.title}</h3>
                    <p>Precio: ${producto.price}</p>
                    <p>{producto.description}</p>
                    <img src={producto.image} alt={producto.title} style={{maxWidth: '200px' }} />
                    <Counter />
                    <Button onClick={handleAddToCart}>Agregar al carrito</Button>
                </Card> 
            )}
        
        </div>
    );
}