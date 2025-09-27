import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    useEffect(() => {
        console.log('CartProvider montado');
        return () => {
            console.log('CartProvider desmontado');
        }
    }, []);

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item, qty) => {
        const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
        
        if(itemInCart) {
            console.log('Item repetido');
            
            const newProduct = {
                ...itemInCart,
                qty: itemInCart.qty + qty
            }
            setCartItems(cartItems.map(cartItem => cartItem.id === newProduct.id ? newProduct : cartItem))
            console.log('Item actualizado: ', newProduct, ' Cantidad: ', qty);
            return;
        }

        const itemActualizado = {...item, qty: qty};

        console.log('Item adicionado: ', itemActualizado, ' Cantidad: ', qty);
        console.log(cartItems);

        setCartItems([...cartItems, itemActualizado]);
        
    };

    const viewCart = () => {
        console.log(cartItems);
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    }

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ cartItems, viewCart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartProvider, CartContext };