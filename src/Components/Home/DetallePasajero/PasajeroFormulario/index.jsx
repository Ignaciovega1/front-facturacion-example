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
                <p>{`Ingrese los detalles del Pasajero ${currentPage}`}</p>
            </div>

            <div className="detallePasajeroContent">
                <form onSubmit={handleSubmit}>
                    {pasajeros.map((pasajero, index) => (
                        <div
                            key={index}
                            className={`cardPasajero ${index}`}
                            style={{
                                display: index + 1 === currentPage ? 'block' : 'none',
                            }}
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

                            {/* Repite para apellidos, rut, correo y número */}
                            {/* ... */}
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
