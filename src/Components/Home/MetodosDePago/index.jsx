import React, { useState } from 'react';

import './metodosdepago.css'

import MetodosCard from '../MetodosCard';
import CuponDescuento from '../CuponDescuento';
import CheckedIcon from '/checked.svg'; // Assume you have a checked.svg in your project

import { BsCreditCard } from 'react-icons/bs';

export default function MetodosDePago({ onMetodoChange, onCuponSubmit }) {
    const [selectedMetodo, setSelectedMetodo] = useState(null);

    const handleMetodoChange = (metodo) => {
        setSelectedMetodo((prevSelectedMetodo) => (prevSelectedMetodo === metodo ? null : metodo));

        // Notificar al padre sobre el cambio en el método de pago
        if (onMetodoChange) {
            onMetodoChange(metodo);
        }
    };

    const handleCuponSubmit = (cuponCode) => {
        // Notificar al padre sobre el código de cupón enviado
        if (onCuponSubmit) {
            onCuponSubmit(cuponCode);
        }
    };

    return (
        <div className={`box ${selectedMetodo ? 'boxReady' : ''}`}>
            <div className="checked">
                <img src="/checked.svg" alt="" />
            </div>
            <div className="h6 fw-bold mb-5 d-flex flex-row align-items-center">
                <BsCreditCard className="mx-4" style={{ width: '3em', height: '3em' }} />
                {!selectedMetodo ? (
                    <p className='m-0'>{"Seleccione un método de pago"}</p>
                ) : (
                    <p className='m-0'>{`Ha seleccionado ${selectedMetodo.toUpperCase()}`}</p>
                )}
            </div>


            <div className="metodoPagoContent mb-1">
                <div className="metodoDePago__container">
                    <MetodosCard onMetodoChange={handleMetodoChange} />
                </div>
                <CuponDescuento onCuponSubmit={handleCuponSubmit} />
            </div>
        </div>
    )

}
