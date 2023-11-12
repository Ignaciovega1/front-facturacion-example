// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import './Header.css';

export default function Header({ title, logo }) {

    return (
        <header>
            <div className="title">
                <a href="https://agendamiento.lumonidy.studio" rel="noopener noreferrer">
                    {logo ? (
                        <div className="img-logo">
                            <img src={logo} alt="Logo" />
                        </div>
                    ) : (
                        <div className="img-logo">
                            <img src="/logo.png" alt="Logo" />
                        </div>
                    )}
                    <h1>{title}</h1>
                </a>
            </div>

            {/* si yo quito el nav me quito las rutas de navegacion */}
            <nav>
                <ul>
                    {routes.slice(1).map((route, index) => (
                        <li key={index}>
                            <Link to={route.path}>{route.text}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>

    );
};


