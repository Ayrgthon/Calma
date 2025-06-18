import React from 'react';

const TecnicaCard = ({ titulo, subtitulo }) => (
  <div className="relative pl-6 pr-4 py-3 flex items-center justify-between">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-300 rounded-full" />
    <div>
      <p className="text-sm text-gray-500 mb-0.5">{subtitulo}</p>
      <h3 className="text-[15px] text-gray-700">{titulo}</h3>
    </div>
    <div className="text-gray-400 ml-4">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
);

const EstresDetalle = ({ onBack }) => {
  const tecnicas = [
    {
      subtitulo: "Volver a lo interno",
      titulo: "Técnica de respiración calmada"
    },
    {
      subtitulo: "De adentro hacia afuera",
      titulo: "Técnica de escaneo corporal"
    },
    {
      subtitulo: "Estructura dentro del caos",
      titulo: "Técnica de priorización mental"
    },
    {
      subtitulo: "La belleza detrás del espejo",
      titulo: "Técnica de afirmacion compasiva"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white px-6 pt-8 pb-6">
        <h1 className="text-[28px] font-bold text-gray-800 mb-3">
          Tu cuerpo te está hablando
        </h1>
        <p className="text-[15px] leading-relaxed text-gray-600">
          El estrés es una respuesta física y emocional a una demanda o amenaza percibida, ya sea interna o externa.
        </p>
      </div>

      <div className="flex-1 bg-[#fff5f5] px-6 pt-8 pb-20">
        <div className="bg-white rounded-[32px] p-6 shadow-sm">
          <h2 className="text-[17px] font-semibold text-gray-800 mb-1">
            Ruta de cuidado
          </h2>
          <p className="text-[15px] text-gray-600 mb-8">
            ¡Tú puedes lograrlo!
          </p>

          <div className="divide-y divide-gray-50">
            {tecnicas.map((tecnica, index) => (
              <TecnicaCard
                key={index}
                subtitulo={tecnica.subtitulo}
                titulo={tecnica.titulo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstresDetalle; 