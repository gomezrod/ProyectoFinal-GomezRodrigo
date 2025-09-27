import {addItem, getItemByName, updateItemByName, loadDB, deleteItem, clearDB} from '../../db/db.js';
import {useState} from 'react';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import './Panel.css';
import Card from '../Card/Card.jsx';

export default function Panel(){

    const [productoAgregado, setProductoAgregado] = useState(false);
    const [productoEditado, setProductoEditado] = useState(false);
    const [productoEliminado, setProductoEliminado] = useState(false);
    const [productoEncontrado, setProductoEncontrado] = useState(false);
    const [producto, setProducto] = useState({});
    const [loading, setLoading] = useState(false);
    const [baseBorrada, setBaseBorrada] = useState(false);
    const [baseCargada, setBaseCargada] = useState(false);

    async function cleanState(setter){
        setTimeout(() => {
            setter(false);
        }, 4000);
    }

    async function handleAgregar(event) {
        event.preventDefault();
        const form = event.target;
        setLoading(true);
        
        const newItem = {
            title: form.title.value,
            category: form.category.value,
            description: form.description.value,
            price: parseFloat(form.price.value),
            stock: parseInt(form.stock.value, 10),
            image: form.image.value
        };

        let payload = {};
        const verification = window.confirm("¿Está seguro de que desea agregar este producto?");
        if(verification){
            try{
                await addItem(newItem);
                payload = { success: true, message: `${newItem.title} agregado exitosamente` };
            } catch (error) {
                payload = { success: false, message: error.message };
            }finally{
                setLoading(false);
            }
            }else{
                setLoading(false);    
                alert("Operación cancelada");
                payload = { success: false, message: "Operación cancelada" };
        }
        form.reset();
        if(payload.success){
            setProductoAgregado(true);
            cleanState(setProductoAgregado);
            alert(payload.message);
        }else{
            alert(payload.message);
        }
    }

    async function handleBuscar(event){
        event.preventDefault();
        const form = event.target;
        const searchTerm = form.search.value;
        setLoading(true);
        let payload = {};
        try {
            const item = await getItemByName(searchTerm);
            setProducto(item);
            payload = {success: true, message: `${searchTerm} encontrado.`}
        } catch (error) {
            payload = {success: false, message: error.message}
        } finally {
            setLoading(false);
        }
        form.reset();
        if(payload.success){
            setProductoEncontrado(true);
        } else {
            alert(payload.message);
        }
    }

    async function handleEditar(event){
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const updatedFields = {}
        form.category.value && (updatedFields.category = form.category.value);
        form.description.value && (updatedFields.description = form.description.value);
        form.price.value && (updatedFields.price = parseFloat(form.price.value));
        form.stock.value && (updatedFields.stock = parseInt(form.stock.value, 10));
        form.image.value && (updatedFields.image = form.image.value);
        let payload = {};
        const verification = window.confirm("¿Estás seguro de que desea editar este producto?");
        if (verification) {
            try{
                await updateItemByName(title, updatedFields);
                payload = { success: true, message: `${title} actualizado exitosamente` };
            } catch(error){
                payload = { success: false, message: error.message };
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            payload = { success: false, message: 'Operación cancelada' };
        }
        form.reset();
        if(payload.success){
            setProductoEditado(true);
            cleanState(setProductoEditado);
            setProductoEncontrado(false);
        }else{
            alert(payload.message);
        }
    }

    async function handleCargarDB() {
        // función para cargar la base de datos desde un archivo JSON local
        const verification = window.confirm("¿Está seguro que desea cargar la base de datos?");
        setLoading(true);
        let payload = {}
        if (verification) {
            try {
                await loadDB();
                payload = { success: true, message: 'Base de datos cargada con éxito.' };
            } catch (error) {
                payload = { success: false, message: error.message }
            } finally {
                setLoading(false);
            }
        } else {
            payload = {success: false, message:'Operación cancelada'}
            setLoading(false);
        }
        if (payload.success) {
            setBaseCargada(true);
            cleanState(setBaseCargada);
        } else {
            alert(payload.message);
        }
    }

    async function handleVaciarDB() {
        // función para vaciar la base de datos
        const verification = window.confirm("¿Está seguro que desea vaciar la base de datos?");
        setLoading(true);
        let payload = {}
        if(verification){
            try{
                await clearDB();
                payload = {success: true, message: 'Base de datos vaciada con éxito.'};
            } catch(error){
                payload = {success: false, message: error.message}
            }finally{
                setLoading(false);
            }
        }
        if(payload.success){
            setBaseBorrada(true);
            cleanState(setBaseBorrada);
        } else {
            alert(payload.message);
        }
    }

    async function handleEliminar(event) {
        event.preventDefault();
        setLoading(true);
        const form = event.target;
        const title = form.title.value;
        const item = await getItemByName(title);
        if (!item) {
            alert('No se encontraron coincidencias');
            setLoading(false);
            return;
        }
        let payload = {};
        const verification = window.confirm("¿Estás seguro de que desea editar este producto?");
        
        if (item){
            if (verification) {
                try{
                    await deleteItem(item.id);
                    payload = {success: true, message: `${title} eliminado exitosamente`};
                } catch (error) {
                    payload = { success: false, message: error.message };
                } finally {
                    setLoading(false);
                }
            } else {
                alert("Operación cancelada");
                payload = { success: false, message: 'Operación cancelada' };
            }
        }else{
            setLoading(false);
            payload = {success: false, message: 'Producto no encontrado'};
        }
        form.reset();
        if(payload.success){
            setProductoEliminado(true);
            cleanState(setProductoEliminado);
        }else{
            alert(payload.message);
        }
    }

    return(
        <div className='panel'>
            <h2>Panel de Administración</h2>
            <p>Desde este panel podés agregar, editar o eliminar productos.</p>
            <h3>Agregar producto</h3>
            {!loading&&<form onSubmit={handleAgregar} className='panel-form'>
                <div>
                    <Input type="text" id="title" name="title" placeholder="Título" required={true} />
                </div>
                <div>
                    <Input type="text" id="category" name="category" placeholder="Categoría" required={true} />
                </div>
                <div>
                    <Input type="text" id="description" name="description" placeholder="Descripción" required={true} />
                </div>
                <div>
                    <Input type="number" id="price" name="price" placeholder="Precio" required={true} step="0.01" />
                </div>
                <div>
                    <Input type="number" id="stock" name="stock" placeholder="Stock" required={true} step='1'/>
                </div>
                <div>
                    <Input type="text" id="image" name="image" placeholder="URL de la imagen" required={true} />
                </div>
                <Button type="submit">Agregar Producto</Button>
                {productoAgregado&&<p>Producto agregado exitosamente.</p>}
            </form>}
            {loading && <div className='spinner'></div>}
            <h3>Buscar producto</h3>
            <form onSubmit={handleBuscar} className='buscador'>
                <Input type="text" id="search" name="search" placeholder="Buscar producto..." />
                <Button type="submit">Buscar</Button>
            </form>
            {loading && <div className='spinner'></div>}
            {productoEncontrado && <Card>
                <h3>{producto.title}</h3>
                <p>Precio: ${producto.price}</p>
                <p>{producto.description}</p>
                <img src={producto.image} alt={producto.title} style={{ maxWidth: '200px' }} />
            </Card>}
            <h3>Editar producto</h3>
            <form onSubmit={handleEditar} className='panel-form'>
                <div>
                    <Input type="text" id="title" name="title" placeholder="Título" required={true} />
                </div>
                <div>
                    <Input type="text" id="category" name="category" placeholder="Categoría"/>
                </div>
                <div>
                    <Input type="text" id="description" name="description" placeholder="Descripción" />
                </div>
                <div>
                    <Input type="number" id="price" name="price" placeholder="Precio" step="0.01" />
                </div>
                <div>
                    <Input type="number" id="stock" name="stock" placeholder="Stock" step='1' />
                </div>
                <div>
                    <Input type="text" id="image" name="image" placeholder="URL de la imagen"/>
                </div>
                <Button type="submit">Editar Producto</Button>
                {productoEditado&&<p>Producto editado exitosamente.</p>}
            </form>
            
            <h3>Eliminar producto</h3>
            <p><strong>Advertencia:</strong> los productos eliminados no podrán ser recuperados.</p>
            {!loading&&<form onSubmit={handleEliminar}>
                <div>
                    <Input type='text' id='title' name='title' placegolder='Producto a eliminar...' />
                </div>
                <Button type='submit'>Eliminar Producto</Button>
            </form>}
            {loading && <div className='spinner'></div>}
            {productoEliminado&&<p>Producto eliminado exitosamente</p>}

            <h3>Cargar base de datos</h3>
            {!loading&&<div>
                <p>Esta acción cargará la base de datos desde un archivo JSON local. <strong>Advertencia:</strong> Esto puede sobrescribir los datos existentes.</p>
                <Button onClick={handleCargarDB}>Cargar Base de Datos</Button>
            </div>}
            {loading && <div className='spinner'></div>}
            {baseCargada&&<p>Base de datos cargada con éxito.</p>}

            <h3>Vaciar base de datos</h3>
            {!loading && <div>
                <p>Esta acción <strong>Eliminará permanentemente</strong> todos los productos de la base de datos.</p>
                <Button onClick={handleVaciarDB}>Vaciar Base de Datos</Button>
            </div>}
            {loading && <div className='spinner'></div>}
            {baseBorrada && <p>Base de datos vaciada con éxito.</p>}
        </div>
    )
}