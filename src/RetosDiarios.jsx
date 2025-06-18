import React, { useState } from "react";
import ChatBot from "./ChatBot";
import Refugio from "./Refugio";

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

const truncateText = (text, maxLength = 25) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
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
        <div className="min-h-screen bg-[#FFF8E7] flex flex-col">
          <header className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center">
              <button 
                onClick={() => {
                  setMostrarNuevaEntrada(false);
                  setModoEdicion(false);
                  setEntradaEnEdicion(null);
                  setNuevaEntrada({ titulo: "", contenido: "" });
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                {icons.back}
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800">
                {modoEdicion ? "Editar Entrada" : "Añadir Entrada"}
              </h1>
            </div>
          </header>

          <div className="flex-1 p-6 flex flex-col gap-4">
            <input
              type="text"
              value={nuevaEntrada.titulo}
              onChange={(e) => setNuevaEntrada({...nuevaEntrada, titulo: e.target.value})}
              placeholder="Título"
              className="w-full px-4 py-2 text-lg font-medium bg-transparent border-b border-gray-300 focus:outline-none focus:border-teal-500"
            />
            <textarea
              value={nuevaEntrada.contenido}
              onChange={(e) => setNuevaEntrada({...nuevaEntrada, contenido: e.target.value})}
              placeholder="Ingresa tu entrada"
              className="flex-1 w-full p-4 text-gray-700 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500 resize-none"
            />
            <button
              onClick={guardarNuevaEntrada}
              className="w-full py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors"
            >
              {modoEdicion ? "Guardar Cambios" : "Añadir"}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#FFF8E7] flex flex-col">
        <header className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Diario</h1>
        </header>

        <div className="flex-1 p-6">
          {entradas.map(entrada => (
            <div 
              key={entrada.id} 
              className="bg-[#FFE4BC] rounded-xl p-4 mb-4 shadow-sm relative"
            >
              <div className="flex justify-between items-start">
                <h2 className="font-bold text-gray-800">{entrada.titulo}</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => iniciarEdicion(entrada)}
                    className="text-gray-600 p-1 hover:text-teal-500 transition-colors"
                  >
                    {icons.edit}
                  </button>
                  <button 
                    onClick={() => borrarEntrada(entrada.id)}
                    className="text-gray-600 p-1 hover:text-red-500 transition-colors"
                  >
                    {icons.trash}
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">{truncateText(entrada.contenido)}</p>
              <p className="text-gray-500 text-xs mt-2">{entrada.fecha}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setMostrarNuevaEntrada(true);
            setModoEdicion(false);
            setNuevaEntrada({ titulo: "", contenido: "" });
          }}
          className="fixed right-6 bottom-24 w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-teal-600 transition-colors"
        >
          {icons.plus}
        </button>
      </div>
    );
  };

  const renderContenido = () => {
    switch (vistaActual) {
      case "inicio":
        return (
          <>
            <header className="px-6 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Hola, Luna</h1>
                <p className="text-gray-600">Capi</p>
              </div>
              <div className="w-16 h-16 relative">
                <img 
                  src="/ropa7-D.png" 
                  alt="Capi" 
                  className="w-full h-full object-contain"
                />
              </div>
            </header>

            <div className="px-6 py-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    7
                  </div>
                  <div>
                    <p className="text-gray-600">Racha actual</p>
                    <p className="text-xl font-bold text-gray-800">días</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6">
              <div className="flex gap-4 mb-4">
                <button
                  className={`flex-1 text-center py-2 border-b-2 ${
                    tab === "retos"
                      ? "border-teal-500 text-teal-500"
                      : "border-transparent text-gray-500"
                  }`}
                  onClick={() => setTab("retos")}
                >
                  Retos Diarios
                </button>
                <button
                  className={`flex-1 text-center py-2 border-b-2 ${
                    tab === "habitos"
                      ? "border-teal-500 text-teal-500"
                      : "border-transparent text-gray-500"
                  }`}
                  onClick={() => setTab("habitos")}
                >
                  Hábitos
                </button>
              </div>

              {tab === "retos" ? (
                <div className="space-y-3">
                  {tareas.map((tarea) => (
                    <div
                      key={tarea.id}
                      className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"
                    >
                      <input
                        type="checkbox"
                        checked={tarea.completada}
                        onChange={() => toggleTarea(tarea.id)}
                        className="w-5 h-5 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
                      />
                      <span
                        className={`flex-1 ${
                          tarea.completada ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {tarea.texto}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {habitos.map((habito) => (
                    <div
                      key={habito.id}
                      className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm"
                    >
                      <span className="flex-1">{habito.titulo}</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => ajustarContador(habito.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{habito.contador}</span>
                        <button
                          onClick={() => ajustarContador(habito.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <input
                      type="text"
                      value={nuevoHabito}
                      onChange={(e) => setNuevoHabito(e.target.value)}
                      placeholder="Añadir nuevo hábito"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && nuevoHabito.trim()) {
                          agregarHabito();
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case "diario":
        return renderDiario();
      case "chat":
        return <ChatBot />;
      case "refugio":
        return <Refugio />;
      default:
        return <div>Vista no encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col">
      {renderContenido()}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => {
              setVistaActual("inicio");
              setMostrarNuevaEntrada(false);
            }}
            className={`text-gray-400 hover:text-teal-500 transition-colors ${
              vistaActual === "inicio" ? "text-teal-500" : ""
            }`}
          >
            {icons.home}
          </button>
          <button 
            onClick={() => {
              setVistaActual("diario");
              setMostrarNuevaEntrada(false);
            }}
            className={`text-gray-400 hover:text-teal-500 transition-colors ${
              vistaActual === "diario" ? "text-teal-500" : ""
            }`}
          >
            {icons.calendar}
          </button>
          <button 
            onClick={() => setVistaActual("chat")}
            className={`text-teal-500 -mt-6 bg-white p-4 rounded-full shadow-lg border-4 border-sky-100 ${
              vistaActual === "chat" ? "border-teal-500" : ""
            }`}
          >
            {icons.paw}
          </button>
          <button 
            onClick={() => setVistaActual("refugio")}
            className={`text-gray-400 hover:text-teal-500 transition-colors ${
              vistaActual === "refugio" ? "text-teal-500" : ""
            }`}
          >
            {icons.heart}
          </button>
          <button className="text-gray-400">{icons.user}</button>
        </div>
      </nav>
    </div>
  );
} 