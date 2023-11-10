import React, { useState, useEffect } from 'react';
import './detallepasajero.css';
import { GrGroup } from 'react-icons/gr';

import TablaResumen from './TablaResumen';
import PasajeroFormulario from './PasajeroFormulario';


const DetallePasajero = ({ onConfirmarPasajeros, numPasajeros, onCheckBoxChange }) => {
    const [pasajeros, setPasajeros] = useState(new Array(numPasajeros).fill({}));


    const [isConfirmed, setIsConfirmed] = useState(false);

    const [isChecked, setIsChecked] = useState(false);




    useEffect(() => {
        if (isChecked) {
            //console.log('Pasajeros confirmados:', pasajeros, 'desde el componente DetallePasajero');

            if (onConfirmarPasajeros) {
                onConfirmarPasajeros(pasajeros);
            }
        }
    }, [isChecked, pasajeros, onConfirmarPasajeros]);

    const handleEdit = () => {
        setIsChecked(false);
        setIsConfirmed(false);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onCheckBoxChange(!isChecked);
    };

    const handleFinalSubmit = (pasajeros) => {
        setPasajeros(pasajeros);
        setIsConfirmed(true);
        // Aquí podrías enviar los datos a un servidor o manejarlos como necesites
    };


    const PasajerosMock = [
        {
            "nombres": "Juan",
            "apellidos": "PerezPerezPerezPerezPerezPerezPerez",
            "rut": "12323223232323232323232332323232323-4",
            "correo": "mleivamleivamleiva@utem.cl",
            "numero": "+569123912391239123"
        },
        {
            "nombres": "Nicolás",
            "apellidos": "XD",
            "rut": "20993-3",
            "correo": "mleiva@utem.cl",
            "numero": "+569323"
        },
        {
            "nombres": "Lolaso",
            "apellidos": "XP",
            "rut": "23-333",
            "correo": "mleiva@utem.cl",
            "numero": "+569933"
        },
        {
            "nombres": "Lolaso",
            "apellidos": "XP",
            "rut": "23-333",
            "correo": "mleiva@utem.cl",
            "numero": "+569933"
        },
        {
            "nombres": "Lolaso",
            "apellidos": "XP",
            "rut": "23-333",
            "correo": "mleiva@utem.cl",
            "numero": "+569933"
        },
        {
            "nombres": "Lolaso",
            "apellidos": "XP",
            "rut": "23-333",
            "correo": "mleiva@utem.cl",
            "numero": "+569933"
        },
        {
            "nombres": "Lolaso",
            "apellidos": "XP",
            "rut": "23-333",
            "correo": "mleiva@utem.cl",
            "numero": "+569933"
        },
        {
            "nombres": "Lolaso",
            "apellidos": "XP",
            "rut": "23-333",
            "correo": "mleiva@utem.cl",
            "numero": "+569933"
        },
        {
            "nombres": "Lolaso",
            "apellidos": "XP",
            "rut": "23-333",
            "correo": "mleiva@utem.cl",
            "numero": "+569933"
        }
    ];

    return (
        <div className={`box detallePasajero ${isChecked ? 'boxReady' : ''}`}>
            {isConfirmed ? (
                <div>
                    <div className="checked">
                        <img src="/checked.svg" alt="" />
                    </div>
                    <div className="pasajeroConfirmed">
                        <div className="d-flex flex-row gap-1 align-items-center detallePasajeroTitle my-2 mx-2">
                            <img className="img-fluid" src="/suitcase.svg" alt="Suitcase" />
                            <p className='title-text my-auto'>Pasajeros confirmados</p>
                        </div>
                        <div className="PasajeroResume d-flex flex-column mt-4">
                            <TablaResumen pasajeros={pasajeros} />
                            <div className="d-flex flex-column gap-1 mx-auto">
                                <div className="pasajero__check_terms">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        id="terms"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />                                    <label htmlFor="terms">Acepto los términos y condiciones</label>
                                </div>
                                <div className="pasajero__check_crear_cuenta mb-1">
                                    <input type="checkbox" name="crear_cuenta" id="crear_cuenta" />
                                    <label htmlFor="crear_cuenta">Crear cuenta</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="edit" onClick={() => handleEdit()}>
                        <img src="/edit.svg" alt="" />
                    </div>
                </div>
            ) : (
                <PasajeroFormulario
                    numPasajeros={numPasajeros}
                    onFinalSubmit={handleFinalSubmit} />

            )}
        </div>
    );




};

export default DetallePasajero;
