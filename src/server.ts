import "dotenv/config";
import express from "express";
import axios from "axios";

const app = express();

const PORT = Number(process.env.PORT) || 3001;
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const RIOT_API_REGION = process.env.RIOT_API_REGION;
const RIOT_API_PLATFORM = process.env.RIOT_API_PLATFORM;

// Mostrar que nossa API está funcionando
app.get("/", (req, res) => {
  res.json({
    message: "League of Legends API funcionando!",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
