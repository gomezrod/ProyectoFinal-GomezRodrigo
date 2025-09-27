import NavBar from './components/NavBar/NavBar'
import CartWidget from './components/CartWidget/CartWidget'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Contacto from './components/Contacto/Contacto'
import Productos from './components/Productos/Productos'
import Comprar from './components/Comprar/Comprar'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Servicios from './components/Servicios/Servicios'
import Producto from './components/Producto/Producto'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Footer from './components/Footer/Footer.jsx'
import Button from './components/Button/Button.jsx'
import Panel from './components/Panel/Panel.jsx'

function App() {

    return (
        <ThemeProvider>
            <CartProvider>
                <BrowserRouter>
                    <NavBar className={'navegacion'} title={'Lashee'}/>
                    <CartWidget label={'🛒'}/>
                    
                    <Routes>
                        <Route path='/contacto' element={<Contacto/>}/>
                        <Route path='/comprar' element={<Comprar />} />
                        <Route path='/servicios' element={<Servicios/>}/>
                        <Route path='/productos/' element={<Productos/>}/>
                        <Route path='/productos/:id' element={<Producto/>} />
                        <Route path='/admin' element={<Panel/>}/>
                        <Route path='/' element={<ItemListContainer greeting={'¡Bienvenido a Lashee!'}/>}/>
                        <Route path='*' element={
                            <div>
                                <h2>Error 404</h2>
                                <p>La página que buscás no existe.</p>
                                <Link className='link' to={'/'}>Volver al Inicio</Link>
                            </div>
                        }/>
                    </Routes>

                    <Footer />
                </BrowserRouter>
            </CartProvider>
        </ThemeProvider>
    )
}

export default App
