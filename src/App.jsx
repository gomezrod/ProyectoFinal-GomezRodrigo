import NavBar from './components/NavBar/NavBar'
import CartWidget from './components/CartWidget/CartWidget'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Contacto from './components/Contacto/Contacto'
import Productos from './components/Productos/Productos'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Servicios from './components/Servicios/Servicios'
import Producto from './components/Producto/Producto'

function App() {
    return (
        // <>
        // <NavBar className={'navegacion'} title={'Lashee'}/>
        // <CartWidget/>
        // <ItemListContainer greeting={'¡Bienvenido a Lashee!'}/>
        // </>
        <BrowserRouter>
            <NavBar className={'navegacion'} title={'Lashee'}/>
            <CartWidget label={'🛒'}/>
            <Routes>
                <Route path='/contacto' element={<Contacto/>}/>
                <Route path='/servicios' element={<Servicios/>}/>
                <Route path='/productos/' element={<Productos/>}/>
                <Route path='/productos/:id' element={<Producto/>} />
                <Route path='/' element={<ItemListContainer greeting={'¡Bienvenido a Lashee!'}/>}/>
                <Route path='*' element={
                    <div>
                        <h2>Error 404</h2>
                        <p>La página que buscás no existe.</p>
                        <Link className='link' to={'/'}>Volver al Inicio</Link>
                    </div>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
