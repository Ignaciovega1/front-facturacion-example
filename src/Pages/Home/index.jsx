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
import TablaResumen from '../../Components/Home/DetallePasajero/TablaResumen';

import reserva from '../../mocks/reserva'
import ModalComponent from '../../utils/ModalComponent';

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
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isMethod, setIsMethod] = useState(false);
    const [total, setTotal] = useState(0);

    const [showModal, setShowModal] = useState(false); // Mostrar u ocultar modal
    const [modalBody, setModalBody] = useState(null); // Contenido del modal


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
    }, [selectedServices]);

    const handleConfirmarPasajeros = (pasajeros) => {
        console.log('Confirmar pasajeros: ', pasajeros);
        setConfirmados(pasajeros);
    };

    const handleMetodoChange = (metodo) => {
        setIsMethod(true);
        setMetodoDePagoSeleccionado(metodo);
    };

    const handleCuponSubmit = (cuponCode) => {
        setCuponCode(cuponCode);
    };

    const handleServiceSelection = (newSelectedServices) => {
        setSelectedServices(newSelectedServices);
    };

    const handleTotalPriceChange = (newTotalPrice) => {
        setTotal(newTotalPrice);
    };

    const handleCheckboxChange = (value) => {
        setIsConfirmed(value);
    }

    useEffect(() => {
        console.log('isConfirmed: ', isConfirmed);
    }, [isConfirmed]);



    const handleConfirmed = () => {
        if (isConfirmed && isMethod) {
            const data = [
                {
                    "id": id,
                    "id_usuario": detalles_json.DetalleReserva.IdUsuario,
                    "id_fechapaquete": detalles_json.DetalleReserva.IdFechaPaquete,
                    "pasajeros": confirmados,
                    "servicios_adicionales": selectedServices,
                    "estado": "in progress",
                    "metodo_pago": metodoDePagoSeleccionado,
                    "cupon": cuponCode,
                    "total": total,
                }
            ];
            console.log("Debo tener un método POST que actualiza: ", data);
            ModalSuccessBoth();
        } else if (!isConfirmed && isMethod) {
            console.log('No se puede confirmar la compra falta confirmar pasajeros');
            ModalErrorPasajeros();
        } else if (!isMethod && isConfirmed) {
            console.log('No se puede confirmar la compra falta seleccionar método de pago');
            ModalErrorPayment();
        } else {
            console.log('No se puede confirmar la compra falta seleccionar método de pago y confirmar pasajeros');
            ModalErrorBoth();
        }
    };

    const ModalErrorPayment = () => {

        const MethodModalBody = isMethod ? (
            <div className="d-flex flex-column gap-3 w-100 px-5">
                <h5 className="text-center">Método de pago seleccionado: {metodoDePagoSeleccionado}</h5>
                <h5 className="text-center">Total a pagar: {total}</h5>
            </div>
        ) : (
            <div className="d-flex">
                <h5 className="">Seleccione un método de pago</h5>
            </div>
        );
        setModalBody(MethodModalBody);
        setShowModal(true);
    };

    const ModalErrorPasajeros = () => {
        const PasajerosModalBody = isConfirmed ? (
            <div className="d-flex flex-column gap-3 w-100 px-5">
                <h5 className="text-center">Pasajeros confirmados: {confirmados.length}</h5>
            </div>
        ) : (
            <div className="d-flex">
                <h5 className="">Confirme los pasajeros</h5>
            </div>
        );
        setModalBody(PasajerosModalBody);
        setShowModal(true);
    };

    const ModalErrorBoth = () => {
        const BothModalBody = (
            <div className="d-flex flex-column gap-3 w-100 px-5">
                <h5 className="text-center">Seleccione un método de pago</h5>
                <h5 className="text-center">Confirme los pasajeros</h5>
            </div>
        );
        setModalBody(BothModalBody);
        setShowModal(true);
    };

    const ModalSuccessBoth = () => {
        const BothModalBody = (
            <>
                <div className="d-flex flex-column gap-3 w-100 px-5">
                    <h5 className="text-center">Método de pago seleccionado: {metodoDePagoSeleccionado}</h5>
                    <h5 className="text-center">Total a pagar: {total}</h5>
                </div>
                <div className="d-flex flex-column gap-3 w-100 px-5">
                    <TablaResumen pasajeros={confirmados} />
                </div>
            </>
        );
        setModalBody(BothModalBody);
        setShowModal(true);
    };



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
                            onCheckBoxChange={handleCheckboxChange}
                        />

                        <DetalleHospedaje detalleJson={detalles_json} />

                    </div>
                    <div className="d-flex flex-column gap-3 w-50 px-5">

                        <TotalDeVuelo
                            detalleJson={detalles_json}
                            selectedServices={selectedServices}
                            onTotalPriceChange={handleTotalPriceChange}
                        />
                        <DetalleCompra detalleJson={detalles_json} />
                        <SelectServicio
                            onToggleService={onToggleService}
                            selectedServices={selectedServices}
                        />
                        <div className="d-flex flex-row gap-4">
                            <Button
                                variant="primary"
                                className="w-50 mx-auto"
                                onClick={handleConfirmed}
                            >
                                Confirmar
                            </Button>
                            <Button variant="primary" className="w-50 mx-auto">Ir a pagar</Button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalComponent
                title={"Error"}
                show={showModal}
                handleClose={() => setShowModal(false)}
                bodyContent={modalBody || ''}
                closeButtonVariant="danger"
                acceptButtonVariant="success"
                handleAccept={ModalErrorPayment}
                error={!isMethod}
            />
            <ModalComponent
                title={"Confirmando..."}
                show={showModal}
                handleClose={() => setShowModal(false)}
                bodyContent={modalBody || ''}
                closeButtonVariant="danger"
                acceptButtonVariant="success"
                handleAccept={ModalErrorPasajeros}
                error={!isConfirmed}
            />
        </>
    )
}