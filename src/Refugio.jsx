import React from 'react';

const EmotionalCard = ({ title, imagePath }) => (
  <div 
    className="relative h-24 mb-4 rounded-3xl overflow-hidden shadow-md"
    style={{
      backgroundImage: `url(${imagePath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'right center'
    }}
  >
    <div className="absolute inset-0 flex items-center">
      <h2 className="text-xl font-semibold text-gray-800 px-6">{title}</h2>
    </div>
  </div>
);

const Refugio = () => {
  const cards = [
    { title: "Estrés", image: "/estres.png" },
    { title: "Depresión", image: "/depresion.png" },
    { title: "Miedo", image: "/miedo.png" },
    { title: "Ansiedad", image: "/ansiedad.png" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Necesito ayuda para...
        </h1>
        <div className="space-y-4">
          {cards.map((card, index) => (
            <EmotionalCard
              key={index}
              title={card.title}
              imagePath={card.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Refugio; 