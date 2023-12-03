import React, { useState, useEffect, useReft } from 'react';

import Header from '../../utils/Header';
import { Button, Modal } from 'react-bootstrap';

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
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

    const [total, setTotal] = useState(0);

    const [showModal, setShowModal] = useState(false); // Mostrar u ocultar modal

    const [data, setData] = useState([]); // Data de la reserva

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = 'Se perderá toda la información ingresada y su reserva quedará en cancelada, ¿está seguro de que desea salir?';
            return e.returnValue;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

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
        if (isConfirmed && isMethod) {
            console.log('Se puede pagar!');
        }
    }, [isConfirmed, isMethod]);

    const handleConfirmarPasajeros = (pasajeros) => {
        setConfirmados(pasajeros);
    };

    const handleMetodoChange = (metodo) => {
        if (metodo === null) {
            setMetodoDePagoSeleccionado('');
            setIsMethod(false);

        } else {
            // Manejar el caso cuando hay un método seleccionado
            setIsMethod(true);
            setMetodoDePagoSeleccionado(metodo);
        }
    };

    const handleCuponSubmit = (cuponCode) => {
        setCuponCode(cuponCode);
    };

    const handleAcceptTerms = (e) => {

        setHasAcceptedTerms(e.target.checked);

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
            setData(data);
            setShowModal(true);
        } else if (!isConfirmed && isMethod) {
            console.log('No se puede confirmar la compra falta confirmar pasajeros', isConfirmed, isMethod);
            // ModalErrorPasajeros();
        } else if (!isMethod && isConfirmed) {
            console.log('No se puede confirmar la compra falta seleccionar método de pago');
            // ModalErrorPayment();
        } else {
            console.log('No se puede confirmar la compra falta seleccionar método de pago y confirmar pasajeros');
            // ModalErrorBoth();
        }
    };

    const modalContent = (
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

    const handleAcceptModal = () => {
        console.log("Botón Aceptar presionado");
        console.log("Debo tener un método POST que crea: ", data);
        if (metodoDePagoSeleccionado === 'webpay') {
            window.location.href = 'http://localhost:3000/webpay';
        } else if (metodoDePagoSeleccionado === 'paypal') {
            window.location.href = 'http://localhost:3000/paypal';
        }
    };

    const buttonText = !isMethod ? "Seleccione un método de pago" :
        !isConfirmed ? "Confirme los pasajeros" :
            !hasAcceptedTerms ? "Acepte los términos para continuar" :
                "Confirmar compra";
    return (
        <>
            <Header title="Home" />
            <div className="HomeBody w-100 h-100 d-flex flex-column">
                <div className="HomeContent d-flex flex-row w-90 mx-auto my-4">
                    {/* Primera Columna */}
                    <div className="HomeColumn d-flex flex-column w-33 px-5 gap-4">
                        <MetodosDePago
                            onMetodoChange={handleMetodoChange}
                            onCuponSubmit={handleCuponSubmit}
                        />
                        <DetallePasajero
                            onConfirmarPasajeros={handleConfirmarPasajeros}
                            numPasajeros={numPasajeros}
                            onCheckBoxChange={handleCheckboxChange}
                        />
                    </div>

                    {/* Segunda Columna */}
                    <div className="HomeColumn d-flex flex-column w-33 px-5 gap-4">
                        <DetalleHospedaje detalleJson={detalles_json} />
                        <DetalleCompra detalleJson={detalles_json} />
                    </div>

                    {/* Tercera Columna */}
                    <div className="HomeColumn d-flex flex-column w-33 px-5 gap-4">
                        <SelectServicio
                            onToggleService={onToggleService}
                            selectedServices={selectedServices}
                        />
                        <TotalDeVuelo
                            detalleJson={detalles_json}
                            selectedServices={selectedServices}
                            onTotalPriceChange={handleTotalPriceChange}
                        />
                        <div className="TermsAndConfirm d-flex w-100 mx-auto flex-column gap-2">
                            <div className="terms-confirmation">
                                <input type="checkbox" id="acceptTerms" checked={hasAcceptedTerms} onChange={handleAcceptTerms} />
                                <label htmlFor="acceptTerms">Acepto los términos y condiciones</label>
                            </div>
                            <Button
                                variant="primary"
                                className={`w-100 p-4 mx-auto ${!hasAcceptedTerms && isMethod && buttonText === "Confirmar compra" ? 'disabled' : ''}`}
                                onClick={handleConfirmed}
                                disabled={!hasAcceptedTerms || !isMethod || buttonText !== "Confirmar compra"}
                                style={{ backgroundColor: buttonText === "Confirmar compra" ? '#FB8500' : 'grey' }}
                            >
                                <p className='text-center d-flex justify-content-center my-auto h3 fw-bold'>
                                    {buttonText}
                                </p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalComponent
                title="Título del Modal"
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleAccept={handleAcceptModal}
                bodyContent={modalContent}
                closeButtonVariant="danger"
                acceptButtonVariant="success"
            />
        </>
    )

}