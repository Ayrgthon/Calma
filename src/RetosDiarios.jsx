import React, { useState } from "react";
import ChatBot from "./ChatBot";
import Refugio from "./Refugio";
import CalendarioEmocional from "./CalendarioEmocional";
import { motion } from "framer-motion";

// Iconos SVG
const icons = {
  home: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
      />
    </svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
      />
    </svg>
  ),
  diary: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
      />
    </svg>
  ),
  paw: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  ),
  heart: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  user: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  plus: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  minus: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  ),
  edit: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
      />
    </svg>
  ),
  back: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  trash: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
      />
    </svg>
  ),
};

const habitosIniciales = [
  { id: 1, titulo: "Agradecer tres cosas cada día", descripcion: "Hábito 1", contador: 4 },
  { id: 2, titulo: "Despertarse temprano sin alarma", descripcion: "Hábito 2", contador: 2 },
  { id: 3, titulo: "Leer libros todas las noches", descripcion: "Hábito 3", contador: 6 },
];

const tareasIniciales = [
  { id: 1, texto: "Un día gris", completada: false },
  { id: 2, texto: "grimas Escondidas", completada: false },
  { id: 3, texto: "Un día gris", completada: false },
];

const entradasIniciales = [
  {
    id: 1,
    titulo: "Recuerdos de infancia",
    contenido: "Querido diario, hoy recor...",
    fecha: "Sunday, May 4"
  }
];

const truncateText = (text, maxLength = 35) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= 5) return text;
  return words.slice(0, 5).join(' ') + '...';
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

export default function RetosDiarios() {
  const [tab, setTab] = useState("retos");
  const [tareas, setTareas] = useState(tareasIniciales);
  const [habitos, setHabitos] = useState(habitosIniciales);
  const [nuevoHabito, setNuevoHabito] = useState("");
  const [vistaActual, setVistaActual] = useState("inicio");
  const [entradas, setEntradas] = useState(entradasIniciales);
  const [mostrarNuevaEntrada, setMostrarNuevaEntrada] = useState(false);
  const [nuevaEntrada, setNuevaEntrada] = useState({ titulo: "", contenido: "" });
  const [entradaEnEdicion, setEntradaEnEdicion] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const toggleTarea = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    ));
  };

  const ajustarContador = (id, incremento) => {
    setHabitos(habitos.map(habito => 
      habito.id === id 
        ? { ...habito, contador: Math.max(0, habito.contador + incremento) }
        : habito
    ));
  };

  const agregarHabito = () => {
    if (nuevoHabito.trim()) {
      const nuevoId = Math.max(...habitos.map(h => h.id)) + 1;
      setHabitos([...habitos, {
        id: nuevoId,
        titulo: nuevoHabito,
        descripcion: `Hábito ${nuevoId}`,
        contador: 0
      }]);
      setNuevoHabito("");
    }
  };

  const guardarNuevaEntrada = () => {
    if (nuevaEntrada.titulo.trim() && nuevaEntrada.contenido.trim()) {
      const fecha = new Date();
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const fechaFormateada = fecha.toLocaleDateString('es-ES', options);
      
      if (modoEdicion && entradaEnEdicion) {
        setEntradas(entradas.map(entrada => 
          entrada.id === entradaEnEdicion.id 
            ? {
                ...entrada,
                titulo: nuevaEntrada.titulo,
                contenido: nuevaEntrada.contenido
              }
            : entrada
        ));
      } else {
        setEntradas([...entradas, {
          id: Date.now(),
          titulo: nuevaEntrada.titulo,
          contenido: nuevaEntrada.contenido,
          fecha: fechaFormateada
        }]);
      }
      
      setNuevaEntrada({ titulo: "", contenido: "" });
      setMostrarNuevaEntrada(false);
      setModoEdicion(false);
      setEntradaEnEdicion(null);
    }
  };

  const iniciarEdicion = (entrada) => {
    setEntradaEnEdicion(entrada);
    setNuevaEntrada({
      titulo: entrada.titulo,
      contenido: entrada.contenido
    });
    setModoEdicion(true);
    setMostrarNuevaEntrada(true);
  };

  const borrarEntrada = (id) => {
    if (window.confirm('¿Estás seguro de que quieres borrar esta entrada?')) {
      setEntradas(entradas.filter(entrada => entrada.id !== id));
    }
  };

  const renderDiario = () => {
    if (mostrarNuevaEntrada) {
      return (
        <motion.div 
          className="min-h-screen bg-[#FFF8E7] flex flex-col pb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.header 
            className="px-6 py-4 flex items-center justify-between border-b border-[#E6DFD0] bg-[#FFF8E7] sticky top-0 z-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <motion.button 
                onClick={() => {
                  setMostrarNuevaEntrada(false);
                  setModoEdicion(false);
                  setEntradaEnEdicion(null);
                  setNuevaEntrada({ titulo: "", contenido: "" });
                }}
                className="text-gray-600 hover:text-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {icons.back}
              </motion.button>
              <motion.h1 
                className="ml-4 text-xl font-semibold text-gray-800"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {modoEdicion ? "Editar Entrada" : "Nueva Entrada"}
              </motion.h1>
            </div>
          </motion.header>

          <motion.div 
            className="flex-1 px-6 py-4 overflow-y-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col gap-4 mb-24">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="text"
                  value={nuevaEntrada.titulo}
                  onChange={(e) => setNuevaEntrada({...nuevaEntrada, titulo: e.target.value})}
                  placeholder="Título"
                  className="w-full px-4 py-3 text-lg font-medium bg-transparent border-b-2 border-[#E6DFD0] focus:outline-none focus:border-teal-500 transition-colors placeholder-gray-400"
                />
              </motion.div>
              
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex-1"
              >
                <textarea
                  value={nuevaEntrada.contenido}
                  onChange={(e) => setNuevaEntrada({...nuevaEntrada, contenido: e.target.value})}
                  placeholder="¿Qué hay en tu mente hoy?"
                  className="w-full h-[400px] p-4 text-gray-700 bg-white rounded-2xl border-2 border-[#E6DFD0] focus:outline-none focus:border-teal-500 resize-none transition-colors placeholder-gray-400 shadow-sm"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="fixed bottom-24 left-0 right-0 p-4 bg-[#FFF8E7] border-t border-[#E6DFD0] z-10"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="max-w-md mx-auto">
              <motion.button
                onClick={guardarNuevaEntrada}
                className="w-full py-3 bg-teal-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02, backgroundColor: "#0D9488" }}
                whileTap={{ scale: 0.98 }}
              >
                {modoEdicion ? "Guardar Cambios" : "Crear Entrada"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        className="min-h-screen bg-[#FFF8E7] flex flex-col pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.header 
          className="px-6 py-4 flex items-center justify-between border-b border-[#E6DFD0] bg-[#FFF8E7] sticky top-0 z-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-semibold text-gray-800">Mi Diario</h1>
        </motion.header>

        <motion.div 
          className="flex-1 px-6 py-4 overflow-y-auto mb-24"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {entradas.map((entrada, index) => (
            <motion.div
              key={index}
              className="bg-[#FFE4C4] rounded-2xl p-6 mb-4 shadow-sm cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => iniciarEdicion(entrada)}
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{entrada.titulo}</h2>
              <p className="text-gray-600 mb-2">{truncateText(entrada.contenido)}</p>
              <p className="text-sm text-gray-500 italic">{entrada.fecha}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="fixed right-6 bottom-24 w-14 h-14 bg-teal-500 rounded-full shadow-lg flex items-center justify-center text-white z-20"
          whileHover={{ scale: 1.1, backgroundColor: "#0D9488" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMostrarNuevaEntrada(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.button>
      </motion.div>
    );
  };

  const renderContenido = () => {
    switch (vistaActual) {
      case "inicio":
        return (
          <motion.div 
            className="min-h-screen bg-sky-100 flex flex-col pb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.header 
              className="px-6 pt-8 pb-4 bg-sky-100 sticky top-0 z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    Hola, Luna
                  </h1>
                  <p className="text-gray-600">Capi</p>
                </motion.div>
                <motion.div 
                  className="w-16 h-16 relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={springTransition}
                >
                  <img 
                    src="/ropa7-D.png" 
                    alt="Capi" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>
            </motion.header>

            <motion.div 
              className="flex-1 overflow-y-auto"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
            >
              <div className="px-6 py-4">
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6"
                  whileHover={{ y: -2 }}
                  transition={springTransition}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        7
                      </motion.div>
                      <div>
                        <p className="text-gray-600">Racha actual</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                          días
                        </p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setVistaActual("calendario")}
                      className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-teal-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {icons.calendar}
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex gap-4 mb-6"
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.4 }}
                >
                  <button
                    className={`flex-1 text-center py-3 border-b-2 transition-all duration-300 ${
                      tab === "retos"
                        ? "border-teal-500 text-teal-600 font-medium"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setTab("retos")}
                  >
                    Retos Diarios
                  </button>
                  <button
                    className={`flex-1 text-center py-3 border-b-2 transition-all duration-300 ${
                      tab === "habitos"
                        ? "border-teal-500 text-teal-600 font-medium"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setTab("habitos")}
                  >
                    Hábitos
                  </button>
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.5 }}
                  className="space-y-3 mb-24"
                >
                  {tab === "retos" ? (
                    <div className="space-y-3">
                      {tareas.map((tarea, index) => (
                        <motion.div
                          key={tarea.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="group"
                        >
                          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <motion.div
                              whileTap={{ scale: 0.9 }}
                              transition={springTransition}
                            >
                              <input
                                type="checkbox"
                                checked={tarea.completada}
                                onChange={() => toggleTarea(tarea.id)}
                                className="w-5 h-5 rounded border-gray-300 text-teal-500 focus:ring-teal-500 cursor-pointer"
                              />
                            </motion.div>
                            <span
                              className={`flex-1 transition-all duration-300 ${
                                tarea.completada 
                                  ? "line-through text-gray-400" 
                                  : "text-gray-700 group-hover:text-gray-900"
                              }`}
                            >
                              {tarea.texto}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {habitos.map((habito, index) => (
                        <motion.div
                          key={habito.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">{habito.titulo}</span>
                            <div className="flex items-center gap-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={springTransition}
                                onClick={() => ajustarContador(habito.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                              >
                                {icons.minus}
                              </motion.button>
                              <span className="w-8 text-center font-medium text-gray-700">
                                {habito.contador}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={springTransition}
                                onClick={() => ajustarContador(habito.id, 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                              >
                                {icons.plus}
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-4"
                      >
                        <input
                          type="text"
                          value={nuevoHabito}
                          onChange={(e) => setNuevoHabito(e.target.value)}
                          placeholder="Añadir nuevo hábito"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && nuevoHabito.trim()) {
                              agregarHabito();
                            }
                          }}
                        />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        );
      case "diario":
        return renderDiario();
      case "chat":
        return <ChatBot />;
      case "refugio":
        return <Refugio />;
      case "calendario":
        return <CalendarioEmocional />;
      default:
        return <div>Vista no encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col">
      {renderContenido()}

      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={springTransition}
            onClick={() => {
              setVistaActual("inicio");
              setMostrarNuevaEntrada(false);
            }}
            className={`text-gray-400 hover:text-teal-500 transition-colors ${
              vistaActual === "inicio" ? "text-teal-500" : ""
            }`}
          >
            {icons.home}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={springTransition}
            onClick={() => {
              setVistaActual("diario");
              setMostrarNuevaEntrada(false);
            }}
            className={`text-gray-400 hover:text-teal-500 transition-colors ${
              vistaActual === "diario" ? "text-teal-500" : ""
            }`}
          >
            {icons.diary}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
            onClick={() => setVistaActual("chat")}
            className={`text-teal-500 -mt-6 bg-white p-4 rounded-full shadow-lg border-4 transition-all duration-300 ${
              vistaActual === "chat" 
                ? "border-teal-500 shadow-teal-200" 
                : "border-sky-100 hover:border-teal-200"
            }`}
          >
            {icons.paw}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={springTransition}
            onClick={() => setVistaActual("refugio")}
            className={`text-gray-400 hover:text-teal-500 transition-colors ${
              vistaActual === "refugio" ? "text-teal-500" : ""
            }`}
          >
            {icons.heart}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={springTransition}
            className="text-gray-400 hover:text-teal-500 transition-colors"
          >
            {icons.user}
          </motion.button>
        </div>
      </motion.nav>
    </div>
  );
} 