import React, { useState } from 'react';
import './cupondescuento.css';

export default function CuponDescuento({ onCuponSubmit }) {
    const [cuponInputVisible, setCuponInputVisible] = useState(false);
    const [cuponCode, setCuponCode] = useState("");

    const toggleCuponInput = () => {
        setCuponInputVisible(!cuponInputVisible);
    };

    const handleCuponCodeChange = (event) => {
        setCuponCode(event.target.value);
    };

    const handleSubmitCuponCode = () => {
        onCuponSubmit(cuponCode);
    };

    // Define una función para obtener la clase correcta basada en si el input debe ser visible o no.
    const getCuponInputClassName = () => {
        return cuponInputVisible ? "cupon-input visible" : "cupon-input hidden";
    };

    return (
        <div className="d-flex flex-column mx-4">
            <p className="">
                ¿Tienes cupón de descuento?{" "}
                <span
                    className="cupon-link"
                    onClick={toggleCuponInput}
                    style={{
                        color: "#01374E",
                        cursor: "pointer",
                        textDecoration: "underline",
                    }}
                >
                    Ingrésalo Aquí
                </span>
            </p>
            <div className="mt-2 mb-2">
                <div className={getCuponInputClassName()}>
                    <input
                        type="text"
                        placeholder="Ingresa tu código de cupón"
                        value={cuponCode}
                        onChange={handleCuponCodeChange}
                    />
                    <button
                        className='btnGuardarCupon'
                        onClick={handleSubmitCuponCode}
                        style={{ backgroundColor: "#FB8500", color: "#fff", borderRadius: "5px" }}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};


