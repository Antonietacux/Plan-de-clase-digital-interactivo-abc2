import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ActividadItem({ actividad, onToggle }) {
  const [mostrarPista, setMostrarPista] = useState(false);
  const [opcionElegida, setOpcionElegida] = useState(null);
  const [feedback, setFeedback] = useState('');

  const verificarRespuesta = (indice) => {
    setOpcionElegida(indice);
    if (indice === actividad.respuestaCorrecta) {
      setFeedback('¡Correcto! ');
      if (!actividad.completada) {
        onToggle(actividad.id);
      }
    } else {
      setFeedback('Hazlo de nuevo. Mira la pista si lo necesitas.');
    }
  };

  return (
    <motion.article
      layout
      className={`actividad-item ${actividad.completada ? 'completada' : ''}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="actividad-header">
        <div>
          <h3>{actividad.titulo}</h3>
          <p>{actividad.instrucciones}</p>
        </div>
        <motion.span
          key={actividad.completada ? 'done' : 'pending'}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="estado-badge"
        >
          {actividad.completada ? '✓ Logrado' : 'Pendiente'}
        </motion.span>
      </div>

      <div className="zona-interactiva">
        <p className="pregunta-reto">
          <strong>Reto:</strong> {actividad.pregunta}
        </p>

        <div className="opciones-flex">
          {actividad.opciones.map((opcion, idx) => (
            <motion.button
              key={idx}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => verificarRespuesta(idx)}
              className={`btn-opcion ${
                opcionElegida === idx
                  ? idx === actividad.respuestaCorrecta
                    ? 'opcion-correcta'
                    : 'opcion-incorrecta'
                  : ''
              }`}
            >
              {opcion}
            </motion.button>
          ))}
        </div>

        <div className="acciones-actividad">
          <button
            type="button"
            className="btn-pista-toggle"
            onClick={() => setMostrarPista(!mostrarPista)}
          >
            {mostrarPista ? 'Ocultar pista' : '💡 Ver pista'}
          </button>
        </div>

        <AnimatePresence>
          {mostrarPista && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="texto-pista"
            >
              {actividad.pista}
            </motion.p>
          )}
        </AnimatePresence>

        {feedback && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`feedback-texto ${opcionElegida === actividad.respuestaCorrecta ? 'exito' : 'error'}`}
          >
            {feedback}
          </motion.p>
        )}
      </div>
    </motion.article>
  );
}
           