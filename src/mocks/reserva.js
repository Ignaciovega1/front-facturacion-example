const reserva = {
    "id": 5,
    "detalles_json": {
        "DetalleHotel": {
            "NombreHotel": "Buenos Aires Grand Hotel",
            "SitioWebHotel": "www.buenosairesgrandhotel.com",
            "TelefonoHotel": "+567890123",
            "DireccionHotel": "Av. Corrientes 789",
            "ServiciosHotel": "Piscina, Spa, Restaurante gourmet, Sala de Conferencias",
            "ValoracionHotel": 4.7,
            "DescripcionHotel": "Un hotel de lujo en Buenos Aires",
            "CorreoElectronicoHotel": "info@buenosairesgrandhotel.com"
        },
        "DetallePaquete": {
            "FechaFin": "2023-09-15",
            "FechaInicio": "2023-09-10",
            "OfertaVuelo": 0,
            "PrecioVuelo": 420,
            "NombrePaquete": "Paquete Lima a Cusco",
            "TotalPersonas": 3,
            "DetallesPaquete": "Incluye vuelo y estancia en el Cusco Heritage Boutique",
            "DescripcionPaquete": "Viaje desde Lima a Cusco",
            "NombreCiudadOrigen": "Buenos Aires",
            "NombreCiudadDestino": "Puerto Iguazú",
            "NombreAeropuertoOrigen": "Aeropuerto Jorge Newbery",
            "NombreAeropuertoDestino": "Aeropuerto Internacional Cataratas del Iguazú"

        },
        "DetalleReserva": {
            "IdUsuario": "snaranjo@utem.cl",
            "Pasajeros": [
                {
                    "nombre": "Laura",
                    "apellidos": "González",
                    "rut": "18903456-4",
                    "correo": "laura@example.com",
                    "numero": "567890123"
                }
            ],
            "EstadoReserva": "P",
            "ServiciosAdicionales": {
                "servicios": [
                    "auto"
                ]
            }
        },
        "DetalleHabitacion": {
            "PrecioNoche": 200,
            "NombreOpcionHotel": "Habitación Individual",
            "ServiciosHabitacion": "Wi-Fi, TV de pantalla plana, Baño de mármol, Desayuno gourmet",
            "DescripcionHabitacion": "Habitación individual de lujo en el corazón de Buenos Aires."
        }
    }
}

export default reserva;