const BASE_URL = '/api-db';
const USER_ID = 1129504032;
const SENTIMENT_API_URL = '/api-model/api';

export const getUserData = async () => {
  const res = await fetch(`${BASE_URL}/usuarios/${USER_ID}`);
  if (!res.ok) throw new Error('Error obteniendo datos de usuario');
  return res.json();
};

export const updateUserData = async (partialData) => {
  const res = await fetch(`${BASE_URL}/usuarios/${USER_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(partialData)
  });
  if (!res.ok) throw new Error('Error actualizando datos de usuario');
  return res.json();
};

export const analyzeSentiment = async (text) => {
  const res = await fetch(SENTIMENT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mode: 'g',
      data: [{ text }]
    })
  });
  if (!res.ok) throw new Error('Error analizando el sentimiento');
  const data = await res.json();
  return data[0]; // Retornamos el primer resultado del array
}; 