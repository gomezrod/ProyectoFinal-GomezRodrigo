import { useParams } from "react-router-dom";
import ItemDetailContainer from "../ItemDetailContainer/ItemDetailContainer";
import './Producto.css'

export default function Producto() {

    const params=useParams();

    return (
        <div>
            <h2>Detalle del Producto</h2>
            <ItemDetailContainer itemId={params.id}/>
        </div>
    );
}