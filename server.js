import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'cache', 'usuarios.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper para leer y escribir la "base de datos" JSON
const loadDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const saveDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Obtener datos de un usuario
app.get('/usuarios/:id', (req, res) => {
  const db = loadDB();
  const usuario = db[req.params.id];
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
});

// Actualizar (mezclar) datos de un usuario
app.put('/usuarios/:id', (req, res) => {
  const db = loadDB();
  const id = req.params.id;
  const existente = db[id] || {};
  db[id] = { ...existente, ...req.body, updatedAt: new Date().toISOString() };
  saveDB(db);
  res.json(db[id]);
});

app.listen(PORT, () => {
  console.log(`⚡ Mock API escuchando en http://localhost:${PORT}`);
}); 