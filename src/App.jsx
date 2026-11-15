import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderClase } from './components/HeaderClase';
import { ObjetivoCard } from './components/ObjetivoCard';
import { ActividadItem } from './components/ActividadItem';
import { EvaluacionForm } from './components/EvaluacionForm';
import './App.css';
import { Lista } from './components/Lista';



const TEMAS_CONTENIDO = [
  {
    id: 'consecuencias',
    titulo: '1. Consecuencias de delitos informáticos',
    resumen: 'Los delitos informáticos pueden tener graves consecuencias legales y éticas.',
    ejemplo:
      '• Apropiación de identidad: 2 a 4 años de prisión\n• Crear códigos maliciosos: 3 a 6 años de prisión\n• Hackeos: 4 a 10 años de prisión',
  },
  {
    id: 'tipos',
    titulo: '2. Tipos de delitos informáticos',
    resumen: 'Contra el Patrimonio - Fraude económico - Hackeos.',
    ejemplo:
      '• Cometidos por funcionarios alterando la ciberseguridad\n• Estafas\n• Alteración de documentos\n• Daño a la reputación',
  },
  {
    id: 'clasificacion',
    titulo: '3. Clasificación de delincuentes informáticos',
    resumen: 'Según su naturaleza y grado de culpabilidad.',
    ejemplo:
      '• Delitos de acción\n• Delito de omisión\n• Delitos dolosos\n• Delito culposo',
  },
];

// AQUÍ MODIFICAS TUS 2 BLOQUES DE ACTIVIDADES
const ACTIVIDADES_INICIALES = [
  {
    id: 1,
    titulo: 'Delito o no delito',
    instrucciones: 'Recuerde cuál de estas acciones constituye un delito informático.',
    pregunta: '¿Cuál de las siguientes acciones constituye un delito informático?',
    opciones: ['Secuestros', 'Crear códigos maliciosos', 'Robo a mano armada'],
    respuestaCorrecta: 1, // 0 = Secuestros, 1 = Crear códigos maliciosos, 2 = Robo a mano armada
    pista: 'Analice cuidadosamente cuál de estas acciones requiere el uso de tecnología o software.',
    completada: false,
  },
  {
    id: 2,
    titulo: 'Sector más afectado',
    instrucciones: 'Lea correctamente el texto.',
    pregunta: '¿En Guatemala quién es el sector más afectado por los delitos informáticos?',
    opciones: ['Gobierno', 'Empresas', 'Individuos'],
    respuestaCorrecta: 1, // 0 = Gobierno, 1 = Empresas, 2 = Individuos
    pista: 'Es el sector que maneja la mayoría de los datos sensibles y transacciones.',
    completada: false,
  },
];

// Cambiamos el nombre de la clave para limpiar los datos antiguos de HTML/CSS
const STORAGE_KEY = 'progreso_delitos_informaticos_v1';

export default function App() {
  const [temaActivo, setTemaActivo] = useState(TEMAS_CONTENIDO[0]);
  const [actividades, setActividades] = useState(() => {
    const guardado = localStorage.getItem(STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : ACTIVIDADES_INICIALES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actividades));
  }, [actividades]);

  const toggleActividad = (id) => {
    setActividades((prev) =>
      prev.map((act) => (act.id === id ? { ...act, completada: true } : act))
    );
  };

  // Función opcional por si quieres reiniciar las actividades al editarlas
  const reiniciarProgreso = () => {
    localStorage.removeItem(STORAGE_KEY);
    setActividades(ACTIVIDADES_INICIALES);
  };

  const completadas = actividades.filter((a) => a.completada).length;
  const progreso = Math.round((completadas / actividades.length) * 100);

  return (
    <div className="app-layout">
      <HeaderClase
        titulo="DELITOS INFORMÁTICOS"
        curso="Tecnología de la Información y la Comunicación"
        profesora="María Antonieta Beatriz Cux Morales"
        progreso={progreso}
      />
<section className="seccion-bloque">
  <h2>Resultados en Línea (NocoDB)</h2>
  <Lista />
</section>

      <main className="contenedor-principal">
        <section id="objetivos" className="seccion-bloque">
          <h2>Objetivos de Aprendizaje</h2>
          <div className="flex-objetivos">
            <ObjetivoCard numero={1} descripcion="Desarrollar actitudes críticas ante conductas ilícitas." />
            <ObjetivoCard numero={2} descripcion="Analizar las consecuencias legales de las acciones ilegales." />
            <ObjetivoCard numero={3} descripcion="Aplicar conocimientos sobre legislación informática." />
          </div>
        </section>

        <section id="contenido" className="seccion-bloque">
          <h2>Contenido</h2>
          <div className="tabs-contenedor">
            {TEMAS_CONTENIDO.map((tema) => (
              <motion.button
                key={tema.id}
                type="button"
                whileTap={{ scale: 0.95 }}
                className={`tab-btn ${temaActivo.id === tema.id ? 'activa' : ''}`}
                onClick={() => setTemaActivo(tema)}
              >
                {tema.titulo}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={temaActivo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="panel-contenido"
            >
              <h3>{temaActivo.titulo}</h3>
              <p>{temaActivo.resumen}</p>
              <pre className="bloque-codigo">
                <code>{temaActivo.ejemplo}</code>
              </pre>
            </motion.article>
          </AnimatePresence>
        </section>

        <section id="actividades" className="seccion-bloque">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, border: 'none' }}>Actividades</h2>
            <button type="button" onClick={reiniciarProgreso} className="btn-pista-toggle">
              ↻ Reiniciar actividades
            </button>
          </div>
          <div className="flex-actividades">
            {actividades.map((act) => (
              <ActividadItem key={act.id} actividad={act} onToggle={toggleActividad} />
            ))}
          </div>
        </section>



        <section id="evaluacion" className="seccion-bloque">
          <h2>Evaluación Final</h2>
          <EvaluacionForm onEnviar={(res) => console.log('Evaluación guardada:', res)} />
        </section>
      </main>

      <footer className="footer-clase">
        <p>Delitos informaticos en Guatemala,2026</p>
      </footer>
    </div>
  );
}