import React from 'react';
import { motion } from 'framer-motion';

export function HeaderClase({ titulo, curso,profesora, progreso }) {
  return (
    <header className="header-clase">
      <div className="header-info">
        <span className="badge-curso">{curso}</span>
        <h1>{titulo}</h1>
        <p className="profesora">Profesora: {profesora}</p>
      </div>

      <nav aria-label="Navegación de la clase" className="header-nav">
        <a href="#objetivos">Objetivos</a>
        <a href="#contenido">Contenido</a>
        <a href="#actividades">Actividades</a>
        <a href="#evaluacion">Evaluación</a>

        <div className="progreso-wrapper" aria-label={`Avance del ${progreso}%`}>
          <span className="progreso-texto">Avance: {progreso}%</span>
          <div className="progreso-barra-fondo">
            <motion.div
              className="progreso-barra-relleno"
              initial={{ width: 0 }}
              animate={{ width: `${progreso}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}