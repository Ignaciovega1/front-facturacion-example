import React, { useState } from 'react';
import { GrGroup } from 'react-icons/gr';

const PasajeroFormulario = ({ numPasajeros, onFinalSubmit }) => {
    // Estados para cada campo de los pasajeros
    const [pasajeros, setPasajeros] = useState(
        Array.from({ length: numPasajeros }, () => ({
            nombres: '',
            apellidos: '',
            rut: '',
            correo: '',
            numero: ''
        }))
    );
    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (index, campo, valor) => {
        const nuevosPasajeros = [...pasajeros];
        nuevosPasajeros[index][campo] = valor;
        setPasajeros(nuevosPasajeros);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, numPasajeros));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFinalSubmit(pasajeros);
    };

    return (
        <>
            <div className="d-flex flex-row gap-1 align-items-center detallePasajeroTitle mt-2">
                <GrGroup className="mx-3" style={{ width: '3em', height: '3em' }} />
                <p className='title-text txt-color'>
                    {`Ingrese los detalles del Pasajero ${currentPage}`}
                </p>
            </div>

            <div className="detallePasajeroContent">
                <form onSubmit={handleSubmit}>
                    {pasajeros.map((pasajero, index) => (
                        <div
                            key={index}
                            className={`cardPasajero ${index}`}
                            style={{ display: index + 1 === currentPage ? 'block' : 'none' }}
                        >
                            <label htmlFor={`nombres-${index}`}>Nombres</label>
                            <input
                                type="text"
                                id={`nombres-${index}`}
                                name={`nombres-${index}`}
                                onChange={(e) => handleChange(index, 'nombres', e.target.value)}
                                value={pasajero.nombres}
                                autoComplete="off"
                                required
                            />

                            <label htmlFor={`apellidos-${index}`}>Apellidos</label>
                            <input
                                type="text"
                                id={`apellidos-${index}`}
                                name={`apellidos-${index}`}
                                onChange={(e) => handleChange(index, 'apellidos', e.target.value)}
                                value={pasajero.apellidos}
                                autoComplete="off"
                                required
                            />

                            <label htmlFor={`rut-${index}`}>RUT</label>
                            <input
                                type="text"
                                id={`rut-${index}`}
                                name={`rut-${index}`}
                                onChange={(e) => handleChange(index, 'rut', e.target.value)}
                                value={pasajero.rut}
                                autoComplete="off"
                                required
                            />

                            <label htmlFor={`correo-${index}`}>Correo</label>
                            <input
                                type="email"
                                id={`correo-${index}`}
                                name={`correo-${index}`}
                                onChange={(e) => handleChange(index, 'correo', e.target.value)}
                                value={pasajero.correo}
                                autoComplete="off"
                                required
                            />

                            <label htmlFor={`numero-${index}`}>Número</label>
                            <input
                                type="text"
                                id={`numero-${index}`}
                                name={`numero-${index}`}
                                onChange={(e) => handleChange(index, 'numero', e.target.value)}
                                value={pasajero.numero}
                                autoComplete="off"
                                required
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
                            onClick={currentPage === numPasajeros ? handleSubmit : handleNextPage}
                            className={currentPage === numPasajeros ? 'confirmButton' : ''}
                        >
                            {currentPage === numPasajeros ? 'Confirmar Pasajeros' : 'Siguiente Pasajero'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PasajeroFormulario;

