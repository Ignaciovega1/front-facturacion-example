import React, { useState, useEffect } from 'react';
import './totalDeVuelo.css';
import { GiCommercialAirplane } from 'react-icons/gi';
import { FaFileInvoiceDollar } from 'react-icons/fa'; // Assuming this is the correct import

export default function TotalDeVuelo({ detalleJson, selectedServices, onTotalPriceChange }) {
    const {
        DetalleHotel,
        DetallePaquete,
        DetalleReserva,
        DetalleHabitacion
    } = detalleJson;

    const initialTotalServicios = selectedServices.reduce((acc, service) => acc + service.precio, 0);
    const basePrice = DetallePaquete.OfertaVuelo > 0 ? DetallePaquete.PrecioOferta : DetallePaquete.PrecioVuelo;

    // State for total price
    const [totalPrice, setTotalPrice] = useState(basePrice + initialTotalServicios);

    useEffect(() => {
        // Calcula el nuevo total y luego invoca la función del padre
        const newTotalServicios = selectedServices.reduce((acc, service) => acc + service.precio, 0);
        const newTotalPrice = basePrice + newTotalServicios;
        setTotalPrice(newTotalPrice);

        // Aquí invocas la función pasada por el padre para actualizar el precio total
        onTotalPriceChange(newTotalPrice);
    }, [selectedServices, basePrice, onTotalPriceChange]);

    return (
        <div className="box">

            <div className="mx-3 my-2 d-flex flex-row justify-content-between">
                <p className='title-text txt-color'>Paquete para {DetallePaquete.TotalPersonas} personas</p>
                <p className='h3 fw-bold'>${basePrice.toLocaleString()}</p>
            </div>
            <div className="serviciosAdicionales text-start px-3 h4 d-flex flex-column"
                style={{ visibility: selectedServices.length > 0 ? 'visible' : 'hidden' }}>
                <p className='h5 fw-bold text-nowrap text-truncate'>Servicios adicionales:</p>
                {selectedServices.map((servicio) => (
                    <div key={servicio.id} className="d-flex text-start flex-row justify-content-between align-items-center">
                        <ul>
                            <li className='h5'>{servicio.nombre}</li>
                        </ul>
                        <p className='fw-bold'>${servicio.precio.toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <div className="mx-3 my-2 d-flex flex-row justify-content-between"
                style={{ visibility: selectedServices.length > 0 ? 'visible' : 'hidden' }}>
                <p className='h6 fw-bold text-nowrap text-truncate'>Total Servicios Adicionales</p>
                <p className='h3 fw-bold'>$ {initialTotalServicios.toLocaleString()}</p>
            </div>

            {/* Placeholder text is always rendered, but its visibility is toggled */}
            <div className="mx-3 my-2" style={{ visibility: selectedServices.length === 0 ? 'visible' : 'hidden' }}>
                <p className='h6 text-muted'>No se han agregado servicios adicionales.</p>
            </div>
            <div className="d-flex flex-row gap-1 totalVueloTitulo px-2 py-2 justify-content-between">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <FaFileInvoiceDollar className="mx-2" style={{ width: '2em', height: '2em' }} />
                        <p className='txt select h2 fw-bold'>Total de Vuelo</p>
                    </div>
                    <p className='h3 fw-bold mx-4'>${totalPrice.toLocaleString()}</p>
                </div>
                <GiCommercialAirplane size={48} />
            </div>

        </div>
    );
}
