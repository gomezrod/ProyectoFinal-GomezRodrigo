import './Counter.css'
import Button from '../Button/Button.jsx'
import { useContext } from 'react'
import { CountContext } from '../../context/CountContext.jsx'

export default function Counter({className}) {

    const {count, decrementCounter, incrementCounter} = useContext(CountContext);

    const clickUp = () => {
        incrementCounter()
    }

    const clickDown = () => {
        decrementCounter()
    }

    return (
        <div className={className}>
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
    
                            