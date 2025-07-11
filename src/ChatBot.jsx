import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import ReactMarkdown from 'react-markdown'; // <-- Revertido
import { getUserData, updateUserData } from './api';

// Componente para renderizar texto con negritas
const FormattedText = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
    </>
  );
};

const Message = ({ isUser, text, avatar }) => {
  // Procesar el texto para separar párrafos y listas
  const content = String(text || '');
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');

  return (
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
          isUser ? 'bg-teal-500 text-white' : 'bg-white text-gray-800'
        }`}
        initial={{ x: isUser ? 20 : -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-sm">
          {paragraphs.map((p, index) => {
            if (/^\d+\.\s/.test(p)) {
              // Si es el comienzo de una lista, o si el elemento anterior no era de lista
              if (index === 0 || !/^\d+\.\s/.test(paragraphs[index - 1])) {
                // Encontrar todos los elementos de la lista consecutivos
                const listItems = [];
                for (let j = index; j < paragraphs.length; j++) {
                  if (/^\d+\.\s/.test(paragraphs[j])) {
                    listItems.push(paragraphs[j].replace(/^\d+\.\s/, ''));
                  } else {
                    break;
                  }
                }
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 my-2">
                    {listItems.map((item, itemIndex) => (
                      <li key={itemIndex}><FormattedText text={item} /></li>
                    ))}
                  </ol>
                );
              }
              // Si ya estamos dentro de una lista, no renderizar nada (ya fue procesado)
              return null;
            } else {
              return (
                <p key={index} className="mb-2 last:mb-0">
                  <FormattedText text={p} />
                </p>
              );
            }
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SENSEI_RESPONSE = "Soy Capybara Sensei, tu guía de bienestar emocional. Estoy aquí para escucharte con empatía, ofrecerte consejos prácticos y acompañarte en tu camino de autocuidado. Cuéntame cómo te sientes o qué te preocupa, y juntos buscaremos estrategias sencillas para que te sientas mejor";

const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentGeneratingText, setCurrentGeneratingText] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentGeneratingText]);

  useEffect(() => {
    getUserData()
      .then(data => {
        if (data.chatHistory && data.chatHistory.length) {
          setMessages(data.chatHistory);
        } else {
          setMessages([
            {
              isUser: false,
              text: SENSEI_RESPONSE,
              avatar: "/sensei-D.png"
            }
          ]);
        }
      })
      .catch(() => {
        setMessages([
          {
            isUser: false,
            text: SENSEI_RESPONSE,
            avatar: "/sensei-D.png"
          }
        ]);
      });
  }, []);

  const LoadingDots = () => (
    <motion.div className="flex space-x-1 items-center p-2">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-teal-500 rounded-full"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: dot * 0.2,
          }}
        />
      ))}
    </motion.div>
  );

  const simulateTokenGeneration = async (fullText) => {
    const words = fullText.split(' ');
    setIsTyping(true);
    
    // Primero mostramos los puntos de carga por 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Luego generamos el texto palabra por palabra
    for (let i = 0; i <= words.length; i++) {
      setCurrentGeneratingText(words.slice(0, i).join(' '));
      // Tiempo aleatorio entre 50ms y 150ms para cada palabra
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
    }
    
    setCurrentGeneratingText('');
    setIsTyping(false);
    return fullText;
  };

  const generateResponse = async (prompt) => {
    try {
      const response = await fetch('/api-model/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: "c",
          input: prompt
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error al generar respuesta:', error);
      return 'Lo siento, hubo un error al procesar tu mensaje. ¿Podrías intentarlo de nuevo?';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      isUser: true,
      text: inputText,
      avatar: "/ropa7-D.png",
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Obtener respuesta del servidor
      const response = await generateResponse(inputText);
      
      // Simular la generación de tokens con la respuesta
      const generatedText = await simulateTokenGeneration(response);

      // Añadir la respuesta del bot
      const botMsg = {
        isUser: false,
        text: generatedText,
        avatar: "/sensei-D.png",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMsg]);

      // Actualizar historial del usuario
      updateUserData({ chatHistory: [...messages, userMessage, botMsg] });
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        isUser: false,
        text: 'Lo siento, hubo un error al procesar tu mensaje. ¿Podrías intentarlo de nuevo?',
        avatar: "/sensei-D.png"
      }]);
    }
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
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-white rounded-2xl p-2 rounded-bl-none">
                  {currentGeneratingText ? (
                    <div className="p-2">{currentGeneratingText}</div>
                  ) : (
                    <LoadingDots />
                  )}
                </div>
              </motion.div>
            )}
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