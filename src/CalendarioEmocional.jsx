import React from 'react';
import { motion } from 'framer-motion';

const EMOTION_COLORS = {
  // Colores para emociones
  feliz: 'bg-teal-500 hover:bg-teal-600',
  triste: 'bg-purple-500 hover:bg-purple-600',
  enojado: 'bg-red-500 hover:bg-red-600',
  emocionado: 'bg-sky-400 hover:bg-sky-500',
  ansioso: 'bg-yellow-400 hover:bg-yellow-500',
  estresado: 'bg-orange-500 hover:bg-orange-600',
  
  // Estados por defecto
  noOcurrido: 'bg-gray-200 hover:bg-gray-300 text-gray-600', // Días futuros
  sinRegistro: 'bg-gray-400 hover:bg-gray-500' // Días pasados sin entrada
};

export default function CalendarioEmocional({ calendarioData = {} }) {
  const ahora = new Date();
  const diasDelMes = Array.from({ length: new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0).getDate() }, (_, i) => i + 1);
  const nombreMes = ahora.toLocaleString('es-ES', { month: 'long' });
  const diaActual = ahora.getDate();
  const mesAnioClave = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}`;

  const getEstadoDia = (dia) => {
    if (dia > diaActual) return 'noOcurrido';
    
    const emocionesMes = calendarioData[mesAnioClave] || {};
    const diaStr = String(dia).padStart(2, '0');

    return emocionesMes[diaStr] || 'sinRegistro';
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-sky-100 p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="max-w-2xl mx-auto"
        variants={headerVariants}
      >
        <motion.h2 
          className="text-3xl font-bold text-gray-800 capitalize mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {nombreMes}
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Esto es un tracking emocional, es para ver el comportamiento a lo largo del mes
        </motion.p>

        <motion.div 
          className="bg-white rounded-3xl p-6 shadow-lg"
          variants={containerVariants}
        >
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((dia, index) => (
              <motion.div
                key={index}
                className="text-center text-gray-500 font-medium"
                variants={itemVariants}
              >
                {dia}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="grid grid-cols-7 gap-2"
            variants={containerVariants}
          >
            {/* Espacios vacíos para alinear los días correctamente */}
            {Array(3).fill(null).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {diasDelMes.map((dia) => (
              <motion.div
                key={dia}
                className="aspect-square"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  className={`w-full h-full rounded-full flex items-center justify-center font-medium transition-colors ${EMOTION_COLORS[getEstadoDia(dia)]}`}
                >
                  {dia}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Leyenda de colores */}
          <motion.div 
            className="mt-8 grid grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {Object.entries(EMOTION_COLORS).map(([emotion, color]) => (
              <motion.div 
                key={emotion}
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <div className={`w-4 h-4 rounded-full ${color.split(' ')[0]}`} />
                <span className="text-sm text-gray-600 capitalize">
                  {emotion === 'noOcurrido' ? 'Día futuro' : 
                   emotion === 'sinRegistro' ? 'Sin registro' : 
                   emotion}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 