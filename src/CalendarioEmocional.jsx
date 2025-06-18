import React from 'react';
import { motion } from 'framer-motion';

const CalendarioEmocional = () => {
  // Obtener el mes actual
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const mesActual = meses[new Date().getMonth()];
  const año = new Date().getFullYear();

  // Generar días del mes actual
  const diasEnMes = new Date(año, new Date().getMonth() + 1, 0).getDate();
  const primerDia = new Date(año, new Date().getMonth(), 1).getDay();
  
  const dias = Array.from({ length: diasEnMes }, (_, i) => i + 1);
  const diasAnteriores = Array.from({ length: primerDia }, (_, i) => null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md mx-auto"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent mb-2">
            {mesActual} {año}
          </h1>
          <p className="text-gray-600 text-sm px-4">
            Esto es un tracking emocional, es para ver el comportamiento a lo largo del mes
          </p>
        </motion.div>

        {/* Calendario */}
        <motion.div 
          className="bg-white rounded-3xl p-6 shadow-lg"
          variants={itemVariants}
        >
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-2 mb-4 text-center">
            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((dia, index) => (
              <motion.div
                key={index}
                className="text-sm font-medium text-gray-400"
                variants={itemVariants}
              >
                {dia}
              </motion.div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-2">
            {[...diasAnteriores, ...dias].map((dia, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={dia ? { scale: 1.1 } : {}}
                whileTap={dia ? { scale: 0.95 } : {}}
                className={`aspect-square flex items-center justify-center ${
                  dia
                    ? "cursor-pointer"
                    : "pointer-events-none"
                }`}
              >
                {dia && (
                  <motion.div
                    className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                    initial={false}
                    whileHover={{
                      backgroundColor: "#0D9488",
                      scale: 1.05
                    }}
                  >
                    {dia}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leyenda */}
        <motion.div 
          className="mt-6 bg-white rounded-2xl p-4 shadow-md"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-teal-500" />
              <span className="text-sm text-gray-600">Día registrado</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CalendarioEmocional; 