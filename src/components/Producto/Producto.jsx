import { useParams } from "react-router-dom";
import ItemDetailContainer from "../ItemDetailContainer/ItemDetailContainer";
import './Producto.css'
import { CountProvider } from "../../context/CountContext";

export default function Producto() {

    const params=useParams();

    return (
        <CountProvider>
            <div>
                <ItemDetailContainer itemId={params.id}/>
            </div>
        </CountProvider>
    );
}