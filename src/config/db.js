import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb+srv://ayrgthons:LbXeouVtApziidDn@aurainitcluster.kxjf8y8.mongodb.net/?retryWrites=true&w=majority&appName=AuraInitCluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const connectDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("¡Conexión exitosa a MongoDB!");
    return client;
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
};

export const getDB = () => client.db();

export const closeDB = async () => {
  await client.close();
  console.log("Conexión a MongoDB cerrada");
}; 