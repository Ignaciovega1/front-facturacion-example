import React from 'react';
import { useReactToPrint } from 'react-to-print';
import Invoice from '../../Components/Factura/ReservaPDF';

import reserva from '../../mocks/reserva';

const Factura = () => {
    const componentRef = React.useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {
            document.querySelector('.footer').style.visibility = 'hidden';
            return Promise.resolve();
        },
        onAfterPrint: () => {
            document.querySelector('.footer').style.visibility = 'visible';
        }
    });

    return (
        <div className="d-flex flex-column gap-4 mx-auto my-auto">
            <div ref={componentRef}>
                <Invoice reserva={reserva} />
            </div>
            <div className="footer">
                <button type="button" onClick={handlePrint} className="btn btn-primary">
                    Imprimir Documento PDF
                </button>
            </div>
        </div>
    );
};

export default Factura;
