import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectDB, getDB } from '../config/db';

const MongoContext = createContext();

export const MongoProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeMongo = async () => {
      try {
        await connectDB();
        setIsConnected(true);
      } catch (err) {
        console.error('Error al conectar con MongoDB:', err);
        setError(err.message);
      }
    };

    initializeMongo();
  }, []);

  const value = {
    isConnected,
    error,
    db: getDB
  };

  if (error) {
    return <div>Error de conexión: {error}</div>;
  }

  if (!isConnected) {
    return <div>Conectando a la base de datos...</div>;
  }

  return (
    <MongoContext.Provider value={value}>
      {children}
    </MongoContext.Provider>
  );
};

export const useMongo = () => {
  const context = useContext(MongoContext);
  if (context === undefined) {
    throw new Error('useMongo debe ser usado dentro de un MongoProvider');
  }
  return context;
}; 