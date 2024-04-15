require('dotenv').config();
import Redis from "ioredis";

// Apenas cria uma nova instância do redis com o arquivo .env e exporta
const redis = new Redis({
  host: process.env.REDIS_HOST, 
  port: Number(process.env.REDIS_PORT),
});



export default  redis ;