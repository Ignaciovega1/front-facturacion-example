import React from 'react';
import './factura.css';

const getNightsFromDates = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return Math.round((checkOutDate - checkInDate) / (1000 * 3600 * 24));
};

const Invoice = ({ reserva }) => {
    const { DetalleHotel, DetallePaquete, DetalleHabitacion, DetalleReserva, DetalleUsuario } = reserva.detalles_json;
    const nights = getNightsFromDates(DetallePaquete.FechaInicio, DetallePaquete.FechaFin);

    // Calculate the net prices
    const netPriceFlight = DetallePaquete.PrecioVuelo / 1.19;
    const netPriceHotel = (DetalleHabitacion.PrecioNoche * nights) / 1.19;

    // Calculate the totals
    const netTotal = netPriceFlight + netPriceHotel;
    const IVA = netTotal * 0.19; // Assuming a tax rate of 19%
    const totalWithIVA = netTotal + IVA;
    return (
        <div>
            <div className="content-wrapper">
                <div className="content-image">
                    <img src="/logo.png" alt="Logo" style={{ width: '135px', height: '135px' }} />
                </div>
                <div className="vertical-line"></div>
                <div className="content-text">
                    <h5>Agencia de Viajes</h5>
                    <p>Utem Travels Ltda</p>
                    <p>Casa XX, LAS PALMERAS N°133</p>
                    <p>SANTIAGO, CHILE</p>
                    <p>Tel: XXXXXXXXXX</p>
                    <p>Email: info@utemtravels.cl</p>
                </div>
            </div>

            <div className="additional-info">
                <h6>R.U.T: XX.XXX.XXX-X</h6>
                <h6>FACTURA ELECTRONICA</h6>
                <h6>N°123</h6>
            </div>

            <div className="cliente">
                <p>Señor(a): {DetalleUsuario.Nombre}</p>
                <p>RUT: {DetalleUsuario.Rut}</p>
                <p>Fecha de Compra: {DetalleReserva.FechaCompra}</p>
            </div>
            <table className="table-factura">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio Neto</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Flight details */}
                    <tr>
                        <td>FLIGHT</td>
                        <td>{DetallePaquete.NombrePaquete}</td>
                        <td>1</td>
                        <td>${netPriceFlight.toFixed(2)}</td>
                    </tr>
                    {/* Hotel details */}
                    <tr>
                        <td>HOTEL</td>
                        <td>{DetalleHotel.NombreHotel}</td>
                        <td>{nights}</td>
                        <td>${netPriceHotel.toFixed(2)}</td>
                    </tr>
                    {/* Additional services would go here */}
                </tbody>
            </table>

            <div className="invoice-summary">
                {/* Summary section for net total, IVA, and total with IVA */}
                <div className="invoice-totals">
                    <div className="net-total">
                        <p>Monto Neto</p>
                        <p>${netTotal.toFixed(2)}</p>
                    </div>
                    <div className="iva-total">
                        <p>I.V.A. 19%</p>
                        <p>${IVA.toFixed(2)}</p>
                    </div>
                    <div className="total-iva">
                        <p>Total</p>
                        <p>${totalWithIVA.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Invoice;
