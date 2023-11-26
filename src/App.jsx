import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './utils/styles/fonts.css';
import ModalComponent from './Components/ModalComponent';
import { routes } from './routes/routes';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState(null);
  const [showInactivityModal, setShowInactivityModal] = useState(false);

  const inactivityTimeout = 5 * 60 * 1000; // 5 minutos
  const inactivityTimerRef = useRef(null);

  const handleActivity = () => {
    clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const modalBodyContent = (
        <div>
          <i className="bi bi-hourglass-split d-flex justify-content-center fs-1"></i>
          <div>
            <p>Parece que has estado mucho tiempo inactivo.</p>
            <div className="modalContent">
              <p>Recuerda que hay más pasajeros esperando por sus viajes</p>
            </div>
          </div>
        </div>
      );
      setModalBody(modalBodyContent);
      setShowInactivityModal(true);
    }, inactivityTimeout);
  };

  useEffect(() => {
    const handleMouseMove = () => handleActivity();
    const handleKeyDown = () => handleActivity();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    // Inicializar el temporizador de inactividad
    handleActivity();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(inactivityTimerRef.current); // Limpiar el temporizador en la limpieza del efecto
    };
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowInactivityModal(false);
    handleActivity(); // Reiniciar el temporizador cuando se cierra el modal
  };

  return (
    <Router>
      <ModalComponent
        title="Inactividad"
        show={showInactivityModal}
        handleClose={handleCloseModal}
        bodyContent={modalBody || ''}
        closeButtonVariant="danger"
        acceptButtonVariant="success"
        handleAccept={handleCloseModal}
        error
      />

      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
