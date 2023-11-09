import React, { useState, useEffect } from 'react';
import './detallepasajero.css';
import './pasajeroTable.css';

import { GrGroup } from 'react-icons/gr';


const DetallePasajero = ({ onConfirmarPasajeros, numPasajeros }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pasajeros, setPasajeros] = useState(new Array(numPasajeros).fill({}));

    const [nombres, setNombres] = useState(new Array(numPasajeros).fill(''));
    const [apellidos, setApellidos] = useState(new Array(numPasajeros).fill(''));
    const [rut, setRut] = useState(new Array(numPasajeros).fill(''));
    const [correo, setCorreo] = useState(new Array(numPasajeros).fill(''));
    const [numero, setNumero] = useState(new Array(numPasajeros).fill(''));

    const [isConfirmed, setIsConfirmed] = useState(false);

    const [isChecked, setIsChecked] = useState(false);




    useEffect(() => {
        if (isConfirmed) {
            //console.log('Pasajeros confirmados:', pasajeros, 'desde el componente DetallePasajero');

            if (onConfirmarPasajeros) {
                onConfirmarPasajeros(pasajeros);
            }
        }
    }, [isConfirmed, pasajeros, onConfirmarPasajeros]);



    const handleNextPage = () => {
        if (currentPage <= numPasajeros) {
            setPasajeros((prevPasajeros) => {
                const newPasajeros = [...prevPasajeros];
                newPasajeros[currentPage - 1] = {
                    nombres: nombres[currentPage - 1],
                    apellidos: apellidos[currentPage - 1],
                    rut: rut[currentPage - 1],
                    correo: correo[currentPage - 1],
                    numero: numero[currentPage - 1],
                };
                return newPasajeros;
            });

            setCurrentPage(currentPage + 1);
        }
    };


    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleChange = (e, index, setter) => {
        setter(prevState => {
            const newValues = [...prevState];
            newValues[index] = e.target.value;
            return newValues;
        });
    };

    const handleSubmit = () => {
        setPasajeros((prevPasajeros) => {
            const newPasajeros = [...prevPasajeros];
            newPasajeros[currentPage - 1] = {
                nombres: nombres[currentPage - 1],
                apellidos: apellidos[currentPage - 1],
                rut: rut[currentPage - 1],
                correo: correo[currentPage - 1],
                numero: numero[currentPage - 1],
            };
            return newPasajeros;
        });

        if (currentPage === numPasajeros) {
            // Marcar como confirmado
            setIsConfirmed(true);
        }
    };

    const handleEdit = () => {
        setIsChecked(false);
        setIsConfirmed(false);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const Formulario = () => {
        return (
            <>
                <div className="d-flex flex-row gap-1 align-items-center detallePasajeroTitle mt-2">
                    <GrGroup className="mx-3" style={{ width: '3em', height: '3em' }} />
                    <p>{`Ingrese los detalles del Pasajero ${currentPage}`}</p>
                </div>


                <div className="detallePasajeroContent">
                    <form onSubmit={handleSubmit}>
                        {[...Array(numPasajeros)].map((_, index) => (
                            <div
                                key={index}
                                className={`cardPasajero ${index}`}
                                style={{
                                    display: index + 1 === currentPage ? '' : 'none',
                                }}
                            >
                                <label htmlFor={`nombres-${index}`}>Nombres</label>
                                <input
                                    type="text"
                                    id={`nombres-${index}`}
                                    name={`nombres-${index}`}
                                    onChange={(e) => handleChange(e, index, setNombres)}
                                    value={nombres[index]}
                                    autoComplete='off'

                                />

                                <label htmlFor={`apellidos-${index}`}>Apellidos</label>
                                <input
                                    type="text"
                                    id={`apellidos-${index}`}
                                    name={`apellidos-${index}`}
                                    onChange={(e) => handleChange(e, index, setApellidos)}
                                    value={apellidos[index]}
                                    autoComplete='off'
                                />

                                <label htmlFor={`rut-${index}`}>Rut</label>
                                <input
                                    type="text"
                                    id={`rut-${index}`}
                                    name={`rut-${index}`}
                                    onChange={(e) => handleChange(e, index, setRut)}
                                    value={rut[index]}
                                    autoComplete='off'
                                />

                                <label htmlFor={`correo-${index}`}>Correo</label>
                                <input
                                    type="text"
                                    id={`correo-${index}`}
                                    name={`correo-${index}`}
                                    onChange={(e) => handleChange(e, index, setCorreo)}
                                    value={correo[index]}
                                    autoComplete='off'
                                />

                                <label htmlFor={`numero-${index}`}>Número</label>
                                <input
                                    type="text"
                                    id={`numero-${index}`}
                                    name={`numero-${index}`}
                                    onChange={(e) => handleChange(e, index, setNumero)}
                                    value={numero[index]}
                                    autoComplete='off'
                                />
                            </div>
                        ))}

                        <div className="botones">
                            <button type="button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                Anterior Pasajero
                            </button>
                            <span>Pasajero {currentPage}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    if (currentPage === numPasajeros) {
                                        // Lógica específica para la última página
                                        // Puedes llamar a la función handleSubmit o cualquier otra acción que desees
                                        handleSubmit();
                                    } else {
                                        handleNextPage();
                                    }
                                }}
                                className={currentPage === numPasajeros ? 'confirmButton' : ''}
                            >
                                {currentPage === numPasajeros ? 'Confirmar Pasajeros' : 'Siguiente Pasajero'}
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    };

    const TablaResumen = ({ pasajeros }) => {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            {Object.keys(pasajeros[0]).filter(key => key !== 'nombres' && key !== 'apellidos').map((key, index) => (
                                <th key={index}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pasajeros.map((pasajero, index) => (
                            <tr key={index}>
                                <td title={`${pasajero.nombres} ${pasajero.apellidos}`}>{`${pasajero.nombres} ${pasajero.apellidos}`}</td>
                                {Object.keys(pasajero).filter(key => key !== 'nombres' && key !== 'apellidos').map((key, index) => (
                                    <td key={index} title={pasajero[key]}>{pasajero[key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
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
                        <div className="d-flex flex-row gap-1 align-items-center detallePasajeroTitle mt-2">
                            <img className="img-fluid" src="/suitcase.svg" alt="Suitcase" />
                            <p>Pasajeros confirmados</p>
                        </div>
                        <div className="PasajeroResume d-flex flex-column">
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
                // Renderizar el formulario
                Formulario()
            )}
        </div>
    );




};

export default DetallePasajero;
