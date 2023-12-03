import React, { useEffect, useState } from 'react';

import './metodosdepago.css'

import MetodosCard from '../MetodosCard';
import CuponDescuento from '../CuponDescuento';
import CheckedIcon from '/checked.svg'; // Assume you have a checked.svg in your project

import { BsCreditCard } from 'react-icons/bs';

export default function MetodosDePago({ onMetodoChange, onCuponSubmit }) {
    const [selectedMetodo, setSelectedMetodo] = useState(null);

    const handleMetodoChange = (metodo) => {
        setSelectedMetodo((prevSelectedMetodo) => (prevSelectedMetodo === metodo ? null : metodo));
    };

    useEffect(() => {
        if (onMetodoChange) {
            onMetodoChange(selectedMetodo);
        }
    }, [selectedMetodo, onMetodoChange]);


    const handleCuponSubmit = (cuponCode) => {
        // Notificar al padre sobre el código de cupón enviado
        if (onCuponSubmit) {
            onCuponSubmit(cuponCode);
        }
    };

    return (
        <div className={`box ${selectedMetodo ? 'boxReady' : ''}`}>
            <div className="d-flex">
                <div className="checked">
                    <img src="/checked.svg" alt="" />
                </div>
                <div className="d-flex flex-row gap-1 align-items-center detallePasajeroTitle my-2 mx-2">
                    <BsCreditCard className="mx-1 mb-4" style={{ width: '3em', height: '3em' }} />
                    {!selectedMetodo ? (
                        <span className='d-flex flex-row title-text '>
                            <p className='txt-color'>{"Seleccione un método de pago"}</p>
                        </span>
                    ) : (
                        <span className='d-flex flex-row title-text'>
                            <p className=''>{`Ha seleccionado`}</p>
                            <p className='txt-white'>{`${selectedMetodo.toUpperCase()}`} </p>
                        </span>
                    )}
                </div>
            </div>
            <div className="metodoPagoContent mb-1">
                <div className="metodoDePago__container">
                    <MetodosCard onMetodoChange={handleMetodoChange} />
                </div>
                <div className={` ${selectedMetodo ? 'hidden' : ''}`}>
                    <CuponDescuento onCuponSubmit={handleCuponSubmit} />
                </div>

            </div>
        </div>
    )

}
