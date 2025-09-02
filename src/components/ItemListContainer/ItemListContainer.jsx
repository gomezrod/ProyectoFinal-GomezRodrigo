import './ItemListContainer.css';
import '../../db/products.json';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Input from '../Input/Input.jsx';

export default function ItemListContainer({ greeting='', itemId=null }) {
    const [productos, setProductos] = useState([]);
    const [productosOriginales, setProductosOriginales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo JSON');
                }
                const data = await response.json();
                const productosFormateados = data.map((prod) => ({
                    id: prod.id,
                    title: prod.title,
                    price: prod.price,
                    descripction: prod.description,
                    category: prod.category,
                    image: prod.image
                }));
                setProductosOriginales(productosFormateados);
                setProductos(productosFormateados); // actualiza el estado con los productos formateados
            } catch (error) {
                setError(error); // establece el estado de error
                console.error('Error al cargar el archivo JSON:', error);
            } finally {
                setLoading(false); // establece loading a false cuando la carga termina
            }
        }

        fetchProducts();
    }, []); // array vacío para que se ejecute solo una vez al montar el componente

    function filtrarProductos(term) {
        const filtrados = productosOriginales.filter((prod) => prod.title.toLowerCase().includes(term.toLowerCase()));
        setProductos(filtrados)
    }

    return (
        <div className="item-list-container">
            <h2>{greeting}</h2>
            <Input type="text" placeholder="Buscar..." onChange={(e) => filtrarProductos(e.target.value)} />
            {loading && <div className='spinner'></div>}
            {error && <Card>
                <p>Error al cargar los productos {console.log(error.message)}</p>
            </Card>}
            {!loading && !error && productos.length === 0 && <p>No hay productos disponibles.</p>}
            {!loading && !error && productos.length > 0 && !itemId && (
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        <Card>
                        <h3>{prod.title}</h3>
                        <p>Precio: ${prod.price}</p>
                        <img src={prod.image} alt={prod.title} style={{maxWidth:'200px'}} />
                        <Link className='link' to={`/productos/${prod.id}`}>Ver Detalle</Link>
                        </Card>
                    </li>
                ))}
                </ul>)};
        </div>
    );
}