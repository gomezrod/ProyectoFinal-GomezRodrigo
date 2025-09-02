import ItemListContainer from "../ItemListContainer/ItemListContainer";

export default function Productos() {
    return (
        <div>
            <h2>Productos</h2>
            <p>Listado de productos disponibles.</p>
            <ItemListContainer greeting={'¡Bienvenido a Lashee!'}/>
        </div>
    );
}