// utils.js
import React from 'react';
import {
    FaConciergeBell,
    FaCocktail,
    FaBed,
    FaWifi,
    FaTv,
    FaCoffee,
    FaGlassMartini,
    FaSwimmer,
    FaHotTub,
    FaUtensils,
    FaChair,
    FaBriefcaseMedical,
    FaDumbbell,
    FaWineGlassAlt,
} from 'react-icons/fa';

export const serviceIcons = {
    'Restaurante': <FaUtensils />,
    'Bar': <FaCocktail />,
    'Servicio de Habitaciones': <FaConciergeBell />,
    'Wi-Fi': <FaWifi />,
    'TV de pantalla plana': <FaTv />,
    'Desayuno gourmet': <FaCoffee />,
    'Minibar': <FaGlassMartini />,
    'Piscina': <FaSwimmer />,
    'Spa': <FaHotTub />,
    'Sala de Conferencias': <FaBriefcaseMedical />,
    'Gimnasio': <FaDumbbell />,
    'Restaurante gourmet': <FaWineGlassAlt />,
};

export const renderStars = (valoracion) => {
    const totalStars = 5;
    let stars = [];

    for (let i = 0; i < valoracion; i++) {
        stars.push(<span key={`star_${i}`} className="star filled">★</span>);
    }

    for (let i = valoracion; i < totalStars; i++) {
        stars.push(<span key={`star_${i}`} className="star">☆</span>);
    }

    return stars;
};

export const renderServiceIcons = (services) => {
    return services.split(', ').map((service, index) => (
        <span key={`serviceIcon_${index}`}>
            {serviceIcons[service] || service}
        </span>
    ));
};

export const formatearFecha = (fecha) => {
    const meses = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'
    ];

    const partesFecha = fecha.split('-'); // Esto divide la fecha en un array [2023, 09, 10]

    const año = partesFecha[0];
    const mes = meses[parseInt(partesFecha[1], 10) - 1]; // Obtiene el mes como texto, y -1 porque el array es base 0
    const dia = parseInt(partesFecha[2], 10); // parseInt remueve los ceros iniciales

    return `${dia}/${mes}/${año}`;
}
export const calcularDiasEntreFechas = (fechaInicio, fechaFin) => {
    // Crear instancias de la fecha de inicio y fin utilizando el objeto Date
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = fin.getTime() - inicio.getTime();

    // Convertir la diferencia en milisegundos a días
    const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

    // Redondear el número al entero más cercano y retornar
    return Math.round(diferenciaDias);
}