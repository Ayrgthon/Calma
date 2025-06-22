import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMongo } from './MongoContext';
import { UserService } from '../services/userService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { db } = useMongo();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userService = new UserService(db());

  useEffect(() => {
    // Aquí podrías verificar si hay un usuario en localStorage
    const checkUser = async () => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        try {
          const userData = await userService.getUserById(storedUserId);
          if (userData) {
            setUser(userData);
          }
        } catch (error) {
          console.error('Error al cargar usuario:', error);
        }
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (email) => {
    try {
      let userData = await userService.getUserByEmail(email);
      
      if (!userData) {
        // Si el usuario no existe, lo creamos
        userData = await userService.createUser({
          email,
          username: email.split('@')[0],
        });
      }

      setUser(userData);
      localStorage.setItem('userId', userData._id.toString());
      return userData;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  const updateProgress = async (progressData) => {
    if (!user?._id) return;
    
    try {
      const success = await userService.updateUserProgress(user._id, progressData);
      if (success) {
        setUser(prev => ({ ...prev, progress: progressData }));
      }
    } catch (error) {
      console.error('Error al actualizar progreso:', error);
      throw error;
    }
  };

  const completeChallenge = async (challengeId) => {
    if (!user?._id) return;

    try {
      const success = await userService.addCompletedChallenge(user._id, challengeId);
      if (success) {
        const updatedUser = await userService.getUserById(user._id);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error al completar reto:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      loading,
      login,
      logout,
      updateProgress,
      completeChallenge
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
}; 