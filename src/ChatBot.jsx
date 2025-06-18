import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Message = ({ isUser, text, avatar }) => (
  <motion.div 
    className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <motion.img 
      src={avatar} 
      alt="Avatar" 
      className="w-8 h-8 object-contain"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    />
    <motion.div 
      className={`max-w-[80%] p-3 rounded-2xl ${
        isUser ? 'bg-teal-500 text-white' : 'bg-white'
      }`}
      initial={{ x: isUser ? 20 : -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <p className="text-sm">{text}</p>
    </motion.div>
  </motion.div>
);

const SENSEI_RESPONSE = "Soy Capybara Sensei, tu guía de bienestar emocional. Estoy aquí para escucharte con empatía, ofrecerte consejos prácticos y acompañarte en tu camino de autocuidado. Cuéntame cómo te sientes o qué te preocupa, y juntos buscaremos estrategias sencillas para que te sientas mejor";

const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      isUser: false,
      text: SENSEI_RESPONSE,
      avatar: "/sensei-D.png"
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      isUser: true,
      text: inputText,
      avatar: "/ropa7-D.png"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const senseiResponse = {
        isUser: false,
        text: SENSEI_RESPONSE,
        avatar: "/sensei-D.png"
      };
      setMessages(prev => [...prev, senseiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <motion.header 
        className="bg-white px-4 py-3 text-center border-b shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center justify-center gap-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img src="/sensei-D.png" alt="Sensei" className="w-8 h-8 object-contain" />
          <h1 className="text-xl font-bold">Capibara Sensei</h1>
        </motion.div>
      </motion.header>

      {/* Chat Container */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{
          backgroundImage: 'url(/Fondo-D.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-2xl mx-auto p-4 pb-16">
          <AnimatePresence>
            {messages.map((message, index) => (
              <Message
                key={index}
                isUser={message.isUser}
                text={message.text}
                avatar={message.avatar}
              />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t py-2 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.form 
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="flex-1 bg-gray-100 rounded-full overflow-hidden flex items-center"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tus pensamientos..."
                className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700"
              />
            </motion.div>
            <motion.button
              type="submit"
              className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white"
              whileHover={{ scale: 1.05, backgroundColor: "#0D9488" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot; 