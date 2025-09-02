import './Counter.css'
import { useState } from 'react'
import Button from '../Button/Button.jsx'

export default function Counter() {

    const [count, setCount] = useState(0);

    const clickUp = () => {
        setCount(count + 1)
    }

    const clickDown = () => {
        setCount(count <= 0 ? 0 : count - 1)
    }

    return (
        <div className="counter">
            <span>{count}</span>
             <Button className='boton-counter' onClick={clickDown}
                              children="-"
                            />
                        
            <Button className='boton-counter' onClick={clickUp}
                    children="+"
                    />
        </div>
    );
}
    
                            