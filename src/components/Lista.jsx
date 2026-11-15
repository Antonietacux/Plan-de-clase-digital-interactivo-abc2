import React, { useState, useEffect } from 'react';

export function Lista() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Consultamos los datos guardados en tu tabla de NocoDB
    fetch('https://app.nocodb.com/api/v3/data/p4yfgh9xuiebhez/m2cjet84hrcg6p1/records?pageSize=25', {
      headers: {
        'xc-token': 'CREATE_YOUR_API_TOKEN_FROM_https://app.nocodb.com/account/tokens'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setEstudiantes(data.list || []);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al cargar datos:', err);
        setCargando(false);
      });
  }, []);

  return (
    <div className="panel-contenido">
      <h3>Registro de Evaluaciones de Estudiantes</h3>
      {cargando ? (
        <p>Cargando registros...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {estudiantes.map((item, idx) => (
            <li key={idx} style={{ padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <strong>{item.nombre}</strong> — Nota: <strong>{item.notaFinal}/100</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}