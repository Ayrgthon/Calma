import React, { useState } from 'react';

const Message = ({ isUser, text, avatar }) => (
  <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
    <img src={avatar} alt="Avatar" className="w-8 h-8 object-contain" />
    <div className={`max-w-[80%] p-3 rounded-2xl ${
      isUser ? 'bg-teal-500 text-white' : 'bg-white'
    }`}>
      <p className="text-sm">{text}</p>
    </div>
  </div>
);

const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [messages] = useState([
    {
      isUser: false,
      text: "Soy Capybara Sensei, tu guía de bienestar emocional. Estoy aquí para escucharte con empatía, ofrecerte consejos prácticos y acompañarte en tu camino de autocuidado. Cuéntame cómo te sientes o qué te preocupa, y juntos buscaremos estrategias sencillas para que te sientas mejor.",
      avatar: "/sensei-D.png"
    },
    {
      isUser: true,
      text: "Hoy perdí 3 parciales por estrés y ansiedad",
      avatar: "/ropa7-D.png"
    },
    {
      isUser: false,
      text: "Gracias por compartirlo conmigo. Entiendo lo frustrante que puede ser fallar exámenes mientras el sueño y la ansiedad se combinan. Primero, reconoce que tu cuerpo necesita descansar para rendir. Esta noche intenta acostarte 30 minutos antes, aleja los pantallas y haz tres respiraciones profundas (4 segundos inhala, 4 mantén, 6 exhala). ¿Crees que podrías probarlo?",
      avatar: "/sensei-D.png"
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    // Aquí iría la lógica para enviar el mensaje
    setInputText('');
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 py-3 text-center border-b">
        <h1 className="text-xl font-bold">Capibara Sensei</h1>
      </header>

      {/* Chat Container */}
      <div 
        className="flex-1 p-4 overflow-y-auto"
        style={{
          backgroundImage: 'url(/Fondo-D.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <Message
              key={index}
              isUser={message.isUser}
              text={message.text}
              avatar={message.avatar}
            />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-4 border-t"
      >
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe tus pensamientos!"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-teal-500"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot; 