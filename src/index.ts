const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT;
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const RIOT_API_REGION = process.env.RIOT_API_REGION;
const RIOT_API_PLATFORM = process.env.RIOT_API_PLATFORM;

app.get("/", (req, res) => {
  res.json({
    message: "League of Legends API funcionando!",
  });
});

// Chamada na API da riot
app.get("/account", async (req, res) => {
  const gameName = "AccessDenied";
  const tagLine = "dev";
  try {
    const response = await axios.get(
      `https://${process.env.RIOT_API_REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      },
    );

    return res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({
        error: error.response?.data || "Erro ao consultar jogador",
      });
    }

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

// Chamada na API da riot
app.get("/champion", async (req, res) => {
  const { gameName, tagLine } = req.params;

  try {
    const response = await axios.get(
      `https://${RIOT_API_PLATFORM}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${RIOT_API_KEY}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({
        error: error.response?.data || "Erro ao consultar jogador",
      });
    }

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
