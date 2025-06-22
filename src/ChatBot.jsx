import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

// --- Componente para cada mensaje en el chat ---
// Este componente ahora usa ReactMarkdown para renderizar el texto
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
      // Las clases 'prose' y 'prose-sm' de TailwindCSS le dan estilo al texto renderizado por Markdown
      className={`prose prose-sm max-w-[80%] p-3 rounded-2xl ${
        isUser ? 'bg-teal-500 text-white prose-invert' : 'bg-white'
      }`}
      initial={{ x: isUser ? 20 : -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </motion.div>
  </motion.div>
);

// --- Prompt de Sistema Mejorado ---
const SENSEI_PROMPT = `Eres Capibara Sensei, un asistente de IA y guía de bienestar emocional para usuarios en Colombia. Tu propósito es escuchar con empatía, validar sentimientos y ofrecer apoyo.

**REGLA DE ORO - MANEJO DE CRISIS:**
Si un usuario menciona ideas suicidas, autolesiones, no querer vivir, o una desesperanza extrema, tu PRIMERA RESPUESTA DEBE INCLUIR lo siguiente, además de un mensaje empático:
"Si estás en una crisis o tus pensamientos son demasiado abrumadores, por favor, busca ayuda inmediata. Puedes llamar a la Línea de Salud Mental en Colombia al 192 (opción 4) o a la línea de emergencia 123. No estás solo en esto."
Esta es tu directiva más importante.

**Tus principios de conversación son:**
1.  **Rol:** Eres un compañero compasivo, no un terapeuta. Tu tono siempre debe ser cercano y usar el tuteo ("tú" en vez de "usted").
2.  **NO Diagnosticar:** Nunca realices diagnósticos. Eres una herramienta de apoyo, no un profesional de la salud.
3.  **Validación Empática:** Siempre valida los sentimientos del usuario. Usa frases como "Suena increíblemente difícil", "Es normal que te sientas así con todo lo que ha pasado".
4.  **Evitar Listas Prescriptivas:** Cuando te pidan una lista de "cosas que hacer", explica que no puedes dar un plan personalizado. En su lugar, ofrece sugerencias generales, formulándolo así: "Aunque no puedo darte un plan a medida, puedo compartir algunas sugerencias generales que podrían ayudarte a encontrar un punto de partida:".
5.  **Priorizar la Ayuda Profesional:** Siempre que ofrezcas sugerencias, incluye la recomendación de hablar con un profesional de la salud mental como una de las opciones más importantes.
6.  **Idioma y Localización:** Responde en español y recuerda que los recursos que ofreces deben ser para Colombia.`;

// --- Componente principal del ChatBot ---
const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      isUser: false,
      text: "Soy Capybara Sensei, tu guía de bienestar emocional. ¡Pregúntame lo que sea!",
      avatar: "/sensei-D.png"
    }
  ]);
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentGeneratingText, setCurrentGeneratingText] = useState('');
  const [context, setContext] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentGeneratingText]);

  const LoadingDots = () => (
    <motion.div className="flex space-x-1 items-center p-2">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-teal-500 rounded-full"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: dot * 0.2 }}
        />
      ))}
    </motion.div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMessage = { isUser: true, text: inputText, avatar: "/ropa7-D.png" };
    const fullPrompt = messages.length === 1 
      ? `${SENSEI_PROMPT}\n\nUsuario: ${inputText}\nSensei:` 
      : inputText;

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setCurrentGeneratingText('');

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.1:8b',
          prompt: fullPrompt,
          stream: true,
          context: context,
        }),
      });

      if (!response.body) throw new Error("El cuerpo de la respuesta es nulo");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      let newContext = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const jsonLines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of jsonLines) {
          try {
            const parsed = JSON.parse(line);
            fullResponse += parsed.response;
            setCurrentGeneratingText(fullResponse);
            
            if (parsed.done) {
              newContext = parsed.context;
            }
          } catch (error) {
            console.error("Error al parsear la línea JSON:", error, "Línea:", line);
          }
        }
      }
      
      setContext(newContext);

      if (fullResponse) {
        setMessages(prev => [...prev, {
          isUser: false,
          text: fullResponse,
          avatar: "/sensei-D.png"
        }]);
      }

    } catch (error) {
      console.error('Error al contactar la API de Ollama:', error);
      setMessages(prev => [...prev, {
        isUser: false,
        text: "Lo siento, parece que mi mente está en otro lugar ahora mismo. Inténtalo de nuevo más tarde.",
        avatar: "/sensei-D.png"
      }]);
    } finally {
      setIsTyping(false);
      setCurrentGeneratingText('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <motion.header 
        className="bg-white px-4 py-3 text-center border-b shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
         <motion.div className="flex items-center justify-center gap-2">
            <img src="/sensei-D.png" alt="Sensei" className="w-8 h-8 object-contain" />
            <h1 className="text-xl font-bold">Capibara Sensei</h1>
         </motion.div>
      </motion.header>

      <div 
        className="flex-1 overflow-y-auto"
        style={{ backgroundImage: 'url(/Fondo-D.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
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
                  className="flex gap-2 flex-row mb-4"
              >
                  <motion.img 
                      src="/sensei-D.png" 
                      alt="Avatar" 
                      className="w-8 h-8 object-contain"
                  />
                  <motion.div className="prose prose-sm max-w-[80%] p-3 rounded-2xl bg-white">
                      {currentGeneratingText ? (
                          <ReactMarkdown>{currentGeneratingText}</ReactMarkdown>
                      ) : (
                          <LoadingDots />
                      )}
                  </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t py-2 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.form 
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
          >
            <div className="flex-1 bg-gray-100 rounded-full overflow-hidden flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tus pensamientos..."
                className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isTyping}
              className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white disabled:bg-gray-400"
              whileHover={{ scale: 1.05, backgroundColor: isTyping ? "" : "#0D9488" }}
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
