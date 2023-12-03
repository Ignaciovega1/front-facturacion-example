import React, { useState } from 'react';
import './detalleHospedaje.css';
import { LuHotel } from 'react-icons/lu';

import { renderStars, renderServiceIcons, formatearFecha, calcularDiasEntreFechas } from '../../utils';


export default function DetalleHospedaje({ detalleJson }) {
    const {
        DetalleHotel,
        DetallePaquete,
        DetalleReserva,
        DetalleHabitacion
    } = detalleJson;

    const cantDias = calcularDiasEntreFechas(DetallePaquete.FechaInicio, DetallePaquete.FechaFin);
    const cantNoches = cantDias - 1;

    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className={`box ${isChecked ? 'boxReady' : ''}`}>
            <div className="checked">
                <img src="/checked.svg" alt="" />
            </div>
            <div className="d-flex flex-row gap-1 detallePasajeroTitle mt-2 mx-3">
                <LuHotel className="" style={{ width: '3em', height: '3em' }} />
                <p className='text-center d-flex justify-content-center align-items-center'> Detalles del hospedaje </p>
            </div>
            <div className="detalleHotelContent d-flex flex-column mx-3 text-light">
                <p className='h3'>{DetalleHotel.NombreHotel} </p>
                <div className="Estrellas h2 d-flex justify-content-start">
                    {renderStars(DetalleHotel.ValoracionHotel)}
                </div>
                <div className="h2 d-flex justify-content-around -flex-row gap-2">
                    <p className='h3'> Servicios del Hotel</p>
                    {renderServiceIcons(DetalleHotel.ServiciosHotel)}
                </div>
                <div className="h3 d-flex flex-row gap-2 py-1 justify-content-between">
                    <p className='py-1'> Check-in </p>
                    <p className='text-dark hotel__field py-1 px-3'> {formatearFecha(DetallePaquete.FechaInicio)}</p>
                </div>
                <div className="h3 d-flex flex-row gap-2 py-1 justify-content-between">
                    <p className='py-1'> Check-out </p>
                    <p className='text-dark hotel__field py-1 px-3'> {formatearFecha(DetallePaquete.FechaFin)}</p>
                </div>
                <div className="text-dark hotel__field d-flex justify-content-center h3">
                    <p> {cantDias} días /</p>
                    <p> {cantNoches} noches</p>
                </div>
                <div className="text-dark hotel__field px-3 pt-3 h3 d-flex flex-row gap-2 py-1 justify-content-around">
                    <p> Cant. Personas </p>
                    <p> {DetallePaquete.TotalPersonas} </p>
                </div>

            </div>
        </div >
    )
}