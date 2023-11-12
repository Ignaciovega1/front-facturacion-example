import React, { useState, useEffect } from 'react';
import './metodoscard.css';

export default function MetodosCard({ onMetodoChange }) {
    const [selectedMetodo, setSelectedMetodo] = useState(null);

    const handleClick = (event, metodo) => {
        setSelectedMetodo((prevSelected) => (prevSelected === metodo ? null : metodo));
        // Llama a la función proporcionada por el componente padre
        onMetodoChange(metodo);
    }


    return (
        <>

            <div className="metodoDePago__container">

                <div className={`method paypal ${selectedMetodo === 'paypal' ? 'selected' : 'not-selected'}`} onClick={(e) => handleClick(e, 'paypal')}>
                    <img src="paypal.svg" alt="" />
                </div>
                <div className={`method webpay ${selectedMetodo === 'webpay' ? 'selected' : 'not-selected'}`} onClick={(e) => handleClick(e, 'webpay')}>
                    <img src="/webpay.svg" alt="" />
                </div>
            </div>

        </>
    )
}
