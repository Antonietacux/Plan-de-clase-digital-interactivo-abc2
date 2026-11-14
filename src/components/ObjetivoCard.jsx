import React from 'react';
import { motion } from 'framer-motion';

export function ObjetivoCard({ numero, descripcion }) {
  return (
    <motion.article
      className="objetivo-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: numero * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}
    >
      <span className="objetivo-num">Objetivo {numero}</span>
      <p>{descripcion}</p>
    </motion.article>
  );
}