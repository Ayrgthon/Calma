import React, { useState } from "react";

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
      
      setEntradas([...entradas, {
        id: Date.now(),
        titulo: nuevaEntrada.titulo,
        contenido: nuevaEntrada.contenido,
        fecha: fechaFormateada
      }]);
      setNuevaEntrada({ titulo: "", contenido: "" });
      setMostrarNuevaEntrada(false);
    }
  };

  const iniciarEdicion = (entrada) => {
    setEntradaEnEdicion({
      ...entrada,
      tituloTemp: entrada.titulo,
      contenidoTemp: entrada.contenido
    });
  };

  const guardarEdicion = () => {
    if (entradaEnEdicion.tituloTemp.trim() && entradaEnEdicion.contenidoTemp.trim()) {
      setEntradas(entradas.map(entrada => 
        entrada.id === entradaEnEdicion.id 
          ? {
              ...entrada,
              titulo: entradaEnEdicion.tituloTemp,
              contenido: entradaEnEdicion.contenidoTemp
            }
          : entrada
      ));
      setEntradaEnEdicion(null);
    }
  };

  const cancelarEdicion = () => {
    setEntradaEnEdicion(null);
  };

  const renderDiario = () => {
    if (mostrarNuevaEntrada) {
      return (
        <div className="min-h-screen bg-[#FFF8E7] flex flex-col">
          <header className="px-6 py-4 flex items-center border-b border-gray-200">
            <button 
              onClick={() => setMostrarNuevaEntrada(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              {icons.back}
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-800">Añadir Entrada</h1>
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
              Añadir
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
              {entradaEnEdicion?.id === entrada.id ? (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <input
                      type="text"
                      value={entradaEnEdicion.tituloTemp}
                      onChange={(e) => setEntradaEnEdicion({
                        ...entradaEnEdicion,
                        tituloTemp: e.target.value
                      })}
                      className="flex-1 px-2 py-1 text-lg font-bold bg-white rounded border border-gray-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <textarea
                    value={entradaEnEdicion.contenidoTemp}
                    onChange={(e) => setEntradaEnEdicion({
                      ...entradaEnEdicion,
                      contenidoTemp: e.target.value
                    })}
                    className="w-full p-2 text-gray-700 bg-white rounded border border-gray-200 focus:outline-none focus:border-teal-500 resize-none min-h-[100px]"
                  />
                  <div className="flex gap-2 justify-end mt-2">
                    <button
                      onClick={cancelarEdicion}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={guardarEdicion}
                      className="px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <h2 className="font-bold text-gray-800">{entrada.titulo}</h2>
                    <button 
                      onClick={() => iniciarEdicion(entrada)}
                      className="text-gray-600 p-1 hover:text-teal-500 transition-colors"
                    >
                      {icons.edit}
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{entrada.contenido}</p>
                  <p className="text-gray-500 text-xs mt-2">{entrada.fecha}</p>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setMostrarNuevaEntrada(true)}
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
            {/* Header */}
            <header className="px-6 pt-8 pb-4">
              <div className="flex justify-between items-start">
                <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                  Hola,<br />Luna
                </h1>
                <div className="w-16 h-16 bg-yellow-200/80 rounded-xl border-2 border-yellow-300 flex items-center justify-center shadow-sm">
                  <span className="text-yellow-800 font-medium">Capi</span>
                </div>
              </div>
            </header>

            {/* Streak Card */}
            <div className="px-6 mt-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Racha</span>
                  <span className="text-gray-800 font-semibold">7 días</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 bg-white mt-6 rounded-t-[32px] px-6 pt-6 pb-24">
              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setTab("retos")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    tab === "retos"
                      ? "bg-teal-50 text-teal-600 border border-teal-200"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  Retos Diarios
                </button>
                <button
                  onClick={() => setTab("habitos")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    tab === "habitos"
                      ? "bg-teal-50 text-teal-600 border border-teal-200"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  Hábitos
                </button>
              </div>

              {/* Tasks or Habits */}
              {tab === "retos" && (
                <ul className="mt-8 space-y-4">
                  {tareas.map((tarea) => (
                    <li key={tarea.id} className="flex items-center">
                      <button
                        onClick={() => toggleTarea(tarea.id)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                          tarea.completada
                            ? "bg-teal-500 border-teal-500 text-white"
                            : "border-gray-300 hover:border-teal-500"
                        }`}
                      >
                        {tarea.completada && icons.check}
                      </button>
                      <span className={`ml-4 text-gray-700 ${tarea.completada ? "line-through text-gray-400" : ""}`}>
                        {tarea.texto}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "habitos" && (
                <div className="mt-8 space-y-4">
                  {/* Lista de hábitos */}
                  {habitos.map((habito) => (
                    <div key={habito.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{habito.titulo}</h3>
                          <p className="text-sm text-gray-500">{habito.descripcion}</p>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <button
                            onClick={() => ajustarContador(habito.id, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            {icons.minus}
                          </button>
                          <span className="w-6 text-center font-medium text-gray-700">
                            {habito.contador}
                          </span>
                          <button
                            onClick={() => ajustarContador(habito.id, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors"
                          >
                            {icons.plus}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Formulario para agregar nuevo hábito */}
                  <div className="mt-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={nuevoHabito}
                        onChange={(e) => setNuevoHabito(e.target.value)}
                        placeholder="Nuevo hábito..."
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500"
                      />
                      <button
                        onClick={agregarHabito}
                        className="px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </>
        );
      case "diario":
        return renderDiario();
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
          <button className="text-teal-500 -mt-6 bg-white p-4 rounded-full shadow-lg border-4 border-sky-100">
            {icons.paw}
          </button>
          <button className="text-gray-400">{icons.heart}</button>
          <button className="text-gray-400">{icons.user}</button>
        </div>
      </nav>
    </div>
  );
} 