import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './ItemDetailContainer.css';
import Card from '../Card/Card';
import Counter from '../Counter/Counter';

export default function ItemDetailContainer({itemId}) {

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

    useEffect(() => {
        async function fetchProductById(itemId) {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${itemId}`);
                if (!response.ok) {
                    throw new Error('Error al cargar el producto');
                }
                const data = await response.json();
                setProducto(data);
            } catch (e) {
                setError(e);
                console.error('Error al cargar el producto:', e);
            } finally {
                setLoading(false);
            }
        }
        
        fetchProductById(itemId);
        
    }, [itemId]);

    return (

        <div className="item-detail-container">
            
            <h2>Detalle del Producto</h2>
            {loading && <div className='spinner'></div>}
            {error && <Card>
                <p>Error al cargar el producto {console.log(error.message)}</p>
                </Card>}
            {producto && !loading && !error && (
                <Card>
                    <h3>{producto.title}</h3>
                    <p>Precio: ${producto.price}</p>
                    <p>{producto.description}</p>
                    <img src={producto.image} alt={producto.title} style={{ maxWidth: '200px' }} />
                    <Counter/>
                    <Button onClick={() => alert('Producto agregado al carrito!')}>Agregar al carrito</Button>
                </Card>
            )}
        <Link className='link' to={'/productos'}>Volver a Productos</Link>
        </div>
    );
}