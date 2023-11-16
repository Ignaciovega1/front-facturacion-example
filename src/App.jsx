import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './utils/styles/fonts.css'
import ModalComponent from './Components/ModalComponent';

import { routes } from './routes/routes'

function App() {

  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState(null);
  const [showInactivityModal, setShowInactivityModal] = useState(false);

  const inactivityTimeout = 5 * 60 * 1000;

  let inactivityTimer;

  const handleActivity = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      const modalBody = (
        <div>
          <i className="bi bi-hourglass-split d-flex justify-content-center fs-1"></i>
          <div>
            <p>Parece que has estado mucho tiempo inactivo</p>
            <div className="modalContent">
              <p>Recuerda que hay más pasajeros esperando por sus viajes</p>
            </div>
          </div>
        </div>
      )
      setModalBody(modalBody);
      setShowInactivityModal(true);
    }, inactivityTimeout);
  };

  useEffect(() => {
    handleActivity(); // Inicializa el temporizador de inactividad
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowInactivityModal(false);
    handleActivity(); // Reinicia el temporizador cuando se cierra el modal
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
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Router>
  )
}

export default App
