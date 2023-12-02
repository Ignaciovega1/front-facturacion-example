import React, { useEffect, useState } from 'react';
import './SelectServicio.css';
import { BsBagPlus, BsShieldLock } from 'react-icons/bs';
import { IoCarOutline } from 'react-icons/io5';

const SelectServicio = ({ onToggleService, selectedServices }) => {


    const handleServiceClick = (service) => {
        onToggleService(service); // call the passed function with the entire service object
    };


    const serviciosAdicionales = [
        {
            id: 1,
            nombre: 'Carga Extra',
            icono: <BsBagPlus />,
            precio: 500
        },
        {
            id: 2,
            nombre: 'Seguro de Viaje',
            icono: <BsShieldLock />,
            precio: 300
        },
        {
            id: 3,
            nombre: 'Embarque de Vehículo',
            icono: <IoCarOutline />,
            precio: 600
        }
        // ... otros servicios que puedas tener
    ];


    return (
        <div className="box">
            <div className="d-flex flex-row gap-1 detallePasajeroTitle mt-2 mx-3">
                <BsBagPlus className="" style={{ width: '3em', height: '3em' }} />
                <p className='text-center d-flex justify-content-center align-items-center'>Servicios Adicionales</p>
            </div>
            <div className="detalleHotelContent d-flex flex-column mx-3 text-light">
                {serviciosAdicionales.map(servicio => (
                    <div
                        key={servicio.id}
                        onClick={() => handleServiceClick(servicio)}
                        className={`mx-2 h3 d-flex align-items-center my-2 cursor-pointer ${selectedServices.includes(servicio.id) ? 'selected' : ''}`}
                    >
                        {servicio.icono}
                        <span className="serviceNombre mx-2 hover-effect">
                            {`$${servicio.precio}`}
                            {` - ${servicio.nombre}`}
                            {selectedServices.some(selectedService => selectedService.id === servicio.id) && <span className="ms-2">&#10003;</span>} {/* Unicode check mark */}
                        </span>
                    </div>
                ))}

            </div>
        </div>

    );
}

export default SelectServicio;
