import React, { useState, useEffect, useReft } from 'react';

import Header from '../../utils/Header';
import { Button } from 'react-bootstrap';

import './home.css';
import MetodosDePago from '../../Components/Home/MetodosDePago';
import DetallePasajero from '../../Components/Home/DetallePasajero';
import DetalleHospedaje from '../../Components/Home/DetalleHospedaje';
import TotalDeVuelo from '../../Components/Home/TotalDeVuelo';
import DetalleCompra from '../../Components/Home/DetalleVuelo';
import SelectServicio from '../../Components/Home/SelectServicio';

import reserva from '../../mocks/reserva'

export default function HomePage() {

    const {
        id,
        detalles_json
    } = reserva;

    const [confirmados, setConfirmados] = useState([]);
    const [metodoDePagoSeleccionado, setMetodoDePagoSeleccionado] = useState('');
    const [cuponCode, setCuponCode] = useState('');
    const numPasajeros = reserva.detalles_json.DetallePaquete.TotalPersonas;
    const [selectedServices, setSelectedServices] = useState([]);

    // Toggle service selection based on the entire object
    const onToggleService = (service) => {
        setSelectedServices(prevSelectedServices => {
            // Check if the service is already selected by looking at the id property
            const isServiceSelected = prevSelectedServices.some(selectedService => selectedService.id === service.id);
            if (isServiceSelected) {
                // Remove the service from the array
                return prevSelectedServices.filter(selectedService => selectedService.id !== service.id);
            } else {
                // Add the service to the array
                return [...prevSelectedServices, service];
            }
        });
    };

    useEffect(() => {
        console.log('Servicios seleccionados en el padre:', selectedServices);
    }, [selectedServices]);

    const handleConfirmarPasajeros = (pasajeros) => {
        console.log('Pasajeros confirmados en el padre:', pasajeros);
        setConfirmados(pasajeros);
    };

    const handleMetodoChange = (metodo) => {
        setMetodoDePagoSeleccionado(metodo);
        console.log(`Método de pago seleccionado en el padre: ${metodo}`);
    };

    const handleCuponSubmit = (cuponCode) => {
        setCuponCode(cuponCode);
        console.log(`Código de cupón enviado desde el padre: ${cuponCode}`);
    };

    const handleServiceSelection = (newSelectedServices) => {
        setSelectedServices(newSelectedServices);
    };

    useEffect(() => {
        // This will log the state every time `selectedServices` changes in the parent
        console.log('Servicios seleccionados en el padre:', selectedServices);
    }, [selectedServices]);


    return (
        <>
            <Header title="Home" />
            <div className="HomeBody w-100 h-100 d-flex flex-column">
                <div className="HomeContent d-flex flex-row w-85 mx-auto my-4">
                    <div className="d-flex flex-column gap-3 w-50 px-5">
                        <MetodosDePago
                            onMetodoChange={handleMetodoChange}
                            onCuponSubmit={handleCuponSubmit}

                        >
                        </MetodosDePago>

                        <DetallePasajero
                            onConfirmarPasajeros={handleConfirmarPasajeros}
                            numPasajeros={numPasajeros}
                        />

                        <DetalleHospedaje detalleJson={detalles_json} />

                    </div>
                    <div className="d-flex flex-column gap-3 w-50 px-5">

                        <TotalDeVuelo
                            detalleJson={detalles_json}
                            selectedServices={selectedServices}
                        />
                        <DetalleCompra detalleJson={detalles_json} />
                        <SelectServicio
                            onToggleService={onToggleService}
                            selectedServices={selectedServices}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}