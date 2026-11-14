import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PREGUNTAS_QUIZ = [
  {
    id: 'p1',
    enunciado: '1. ¿Qué es un delito informático?',
    opciones: ['Usurpación de identidad', 'Robo común', 'Trata de personas'],
    correcta: 0, // Índice de la respuesta correcta
  },
  {
    id: 'p2',
    enunciado: '2. ¿Cuántos años de pena un funcionario público que comete un delito informático?',
    opciones: ['1-3 años', '2-8 años', '5-10 años'],
    correcta: 1, // Índice de la respuesta correcta
  },
  {
    id: 'p3',
    enunciado: '3. ¿Qué manera tienen los delincuentes actualmente, para robar información personal?',
    opciones: ['Escaneo de código URL', 'Fotografías digitales', 'Facebook'],
    correcta: 0, // Índice de la respuesta correcta
  },
];

export function EvaluacionForm({ onEnviar }) {
  const [nombre, setNombre] = useState('');
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);

  const seleccionarOpcion = (preguntaId, indiceOpcion) => {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: indiceOpcion }));
  };

  const calificarExamen = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    let aciertos = 0;
    PREGUNTAS_QUIZ.forEach((p) => {
      if (respuestas[p.id] === p.correcta) aciertos++;
    });

    const notaFinal = Math.round((aciertos / PREGUNTAS_QUIZ.length) * 100);
    const totalPreguntas = PREGUNTAS_QUIZ.length;
    const notaCalculada = Math.round((aciertos / totalPreguntas) * 100);
    const datosEvaluacion = { nombre, aciertos, total: totalPreguntas, notaFinal: notaCalculada };

    setResultado(datosEvaluacion);
    onEnviar(datosEvaluacion);
  };

  const reiniciar = () => {
    setRespuestas({});
    setResultado(null);
  };

  return (
    <form className="evaluacion-form" onSubmit={calificarExamen}>
      <div className="form-grupo">
        <label htmlFor="estudiante">Nombre del estudiante:</label>
        <input
          id="estudiante"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribe tu nombre completo"
          required
        />
      </div>

      {PREGUNTAS_QUIZ.map((pregunta) => (
        <fieldset key={pregunta.id} className="pregunta-fieldset">
          <legend>{pregunta.enunciado}</legend>
          <div className="radio-grupo">
            {pregunta.opciones.map((opcion, idx) => (
              <label key={idx} className="radio-label">
                <input
                  type="radio"
                  name={pregunta.id}
                  checked={respuestas[pregunta.id] === idx}
                  onChange={() => seleccionarOpcion(pregunta.id, idx)}
                  required
                />
                <span>{opcion}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="acciones-form">
        <motion.button
          type="submit"
          className="btn-enviar"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          Calificar Evaluación
        </motion.button>

        {resultado && (
          <motion.button
            type="button"
            onClick={reiniciar}
            className="btn-secundario"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            Reintentar
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {resultado && (
          <motion.div
            key="caja-nota"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className={`caja-resultado ${resultado.notaFinal >= 60 ? 'aprobado' : 'reprobado'}`}
            role="status"
          >
            <h4>Resultado de {resultado.nombre}</h4>
            <p>
              Aciertos: <strong>{resultado.aciertos} de {resultado.total}</strong> — Nota:{' '}
              <strong>{resultado.notaFinal}/100</strong>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}