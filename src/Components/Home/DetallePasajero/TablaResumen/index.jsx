import React from 'react';
import './pasajeroTable.css';


const TablaResumen = ({ pasajeros }) => {
    if (!pasajeros || pasajeros.length === 0) {
        return <div>No hay datos de pasajeros para mostrar.</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombres</th>
                    {Object.keys(pasajeros[0]).filter(key => key !== 'nombres' && key !== 'apellidos').map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {pasajeros.map((pasajero, index) => (
                    <tr key={index}>
                        <td title={`${pasajero.nombres} ${pasajero.apellidos}`}>{`${pasajero.nombres} ${pasajero.apellidos}`}</td>
                        {Object.keys(pasajero).filter(key => key !== 'nombres' && key !== 'apellidos').map((key, innerIndex) => (
                            <td key={innerIndex} title={pasajero[key]}>{pasajero[key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TablaResumen;
