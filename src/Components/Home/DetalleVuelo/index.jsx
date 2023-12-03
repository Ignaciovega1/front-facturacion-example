import React, { useState } from 'react';
import './DetalleVuelo.css';
import { CiAirportSign1 } from 'react-icons/ci';
import { GiAirplaneDeparture, GiAirplaneArrival } from 'react-icons/gi';
import { MdOutlineConnectingAirports } from 'react-icons/md';

import { renderStars, renderServiceIcons, formatearFecha, calcularDiasEntreFechas } from '../../utils';


export default function DetalleCompra({ detalleJson }) {

    const {
        DetalleHotel,
        DetallePaquete,
        DetalleReserva,
        DetalleHabitacion
    } = detalleJson;


    const cantDias = calcularDiasEntreFechas(DetallePaquete.FechaInicio, DetallePaquete.FechaFin);
    const cantNoches = cantDias - 1;

    return (
        <div className="box">
            <div className="d-flex flex-row gap-1 detallePasajeroTitle mt-2 my-4">
                <CiAirportSign1 className="mx-2 text-light" style={{ width: '4em', height: '4em' }} />
                <p> Detalle del vuelo </p>
            </div>
            <div className="detalleHotelContent h4 d-flex flex-column mx-3 text-center align-content-center text-light">
                <div className="mb-4">
                    <div className="row align-items-center">
                        <div className="col-auto text-center">
                            <GiAirplaneDeparture className="mx-2" style={{ width: '2em', height: '2em' }} />
                            <p className="fw-bold " style={{ maxWidth: '100px' }}>{DetallePaquete.NombreCiudadOrigen}</p>
                        </div>
                        <div className="col text-center">
                            <p className="fw-bold">IDA</p>
                        </div>
                        <div className="col text-center">
                            <p className="fw-bold">{formatearFecha(DetallePaquete.FechaInicio)}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="row align-items-center">
                        <div className="col-auto text-center">
                            <GiAirplaneArrival className="mx-2" style={{ width: '2em', height: '2em' }} />
                            <p className="fw-bold " style={{ maxWidth: '100px' }}>{DetallePaquete.NombreCiudadDestino}</p>
                        </div>
                        <div className="col text-center">
                            <p className="fw-bold">FIN</p>
                        </div>
                        <div className="col text-center">
                            <p className="fw-bold">{formatearFecha(DetallePaquete.FechaFin)}</p>
                        </div>
                    </div>
                </div>



                <div className="d-flex h4 flex-row align-items-center">
                    <MdOutlineConnectingAirports className="mx-2" style={{ width: '4em', height: '4em' }} />
                    <div className="CompraText d-flex flex-column w-100" >
                        <div className="d-flex flex-row justify-content-between align-items-center gap-4">
                            <p className="fw-bold m-0" style={{ width: '100px' }}>Origen:</p>
                            <p className='fw-bolder text-start' style={{ maxWidth: '250px' }}>
                                {DetallePaquete.NombreAeropuertoOrigen}
                            </p>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center gap-4">
                            <p className="fw-bold m-0" style={{ width: '100px' }}>Destino:</p>
                            <p className='fw-bolder text-start' style={{ maxWidth: '250px' }}>
                                {DetallePaquete.NombreAeropuertoDestino} {/* Aquí debe ser NombreAeropuertoDestino */}
                            </p>
                        </div>
                    </div>

                </div>

            </div >
        </div >
    )
}