import './CartWidget.css';
import Button from '../Button/Button.jsx';
import Counter from '../Counter/Counter.jsx';

export default function CartWidget({label}) {

    return (
        <div className="cart-widget">
            <span>{label}</span>
            <Counter className="cart-counter"/>
        </div>
    );
}