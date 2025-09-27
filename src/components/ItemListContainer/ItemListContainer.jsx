import './ItemListContainer.css';
import '../../db/products.json';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Input from '../Input/Input.jsx';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { fetchPage } from '../../db/db.js';

export default function ItemListContainer({ greeting='', itemId=null }) {
    const [productos, setProductos] = useState([]);
    const [productosOriginales, setProductosOriginales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemsByPage, setItemsByPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastVisible, setLastVisible] = useState(null);
    const [firstVisible, setFirstVisible] = useState(null);
    const { isDarkMode } = useContext(ThemeContext);

    async function fetchProducts(pages = 5, field = 'title', start = null, order = 'asc') {
        setLoading(true);
        setError(null); // resetea el estado de error antes de una nueva carga
        try {
            const items = await fetchPage(pages, field, start, order);
            
            if (items.data.length > 0) {
                setProductosOriginales(items.data);
                setProductos(items.data);
                setLastVisible(items.last);
                setFirstVisible(items.first);
            }
        } catch (error) {
            setError(error); // establece el estado de error
            console.error('Error al cargar el archivo JSON:', error);
        } finally {
            setLoading(false); // establece loading a false cuando la carga termina
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    function filtrarProductos(term) {
        const filtrados = productosOriginales.filter((prod) => prod.title.toLowerCase().includes(term.toLowerCase()));
        setProductos(filtrados)
    }

    function handlePrevPage() {
        setCurrentPage(currentPage-1);
        console.log(currentPage-1);
        
        fetchProducts(itemsByPage, 'title', firstVisible, 'desc');
    }

    function handleNextPage() {
        setCurrentPage(currentPage + 1);
        fetchProducts(itemsByPage, 'title', lastVisible);
        
    }

    return (
        <div className={isDarkMode ? 'item-list-container dark' : 'item-list-container light' }>
            <h2>{greeting}</h2>
            <Input type="text" placeholder="Buscar..." onChange={(e) => filtrarProductos(e.target.value)} />
            {loading && <div className='spinner'></div>}
            {error && <Card>
                <p>Error al cargar los productos {console.log(error.message)}</p>
            </Card>}
            {!loading && !error && productos.length === 0 && <p>No hay productos disponibles.</p>}
            {!loading && !error && productos.length > 0 && !itemId && (
            <ul className='lista-productos'>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        <Card>
                            <h3>{prod.title}</h3>
                            <p>Precio: ${prod.price}</p>
                            <img src={prod.image} alt={prod.title} style={{maxWidth:'200px'}} />
                            <Link className={isDarkMode ? 'link link-detalle dark' : 'link link-detalle'} to={`/productos/${prod.id}`}>Ver Detalle</Link>
                        </Card>
                    </li>
                ))}
            </ul>)}
            <div className='pagination'>
                <label htmlFor="itemsPerPage">Productos por página:</label>
                <select id="itemsPerPage" value={itemsByPage} onChange={
                    (e) => {
                        setItemsByPage(e.target.value)
                        setCurrentPage(1);
                        fetchProducts(e.target.value);
                        }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                <span>Página {currentPage}</span>
                <button onClick={handleNextPage} disabled={productos.length < itemsByPage}>Siguiente</button>
            </div>
        </div>
    );
}