const express = require("express");
const axios = require("axios");
const { getCache, setCache } = require("./cache");

function startServer(port, origin) {
  const app = express();

  app.use(async (req, res) => {
    const cacheKey = req.originalUrl;

    const cached = getCache(cacheKey);
    if (cached) {
      res.set(cached.headers);
      res.set("X-Cache", "HIT");
      return res.status(cached.status).send(cached.data);
    }

    try {
      const target = origin.replace(/\+$/, "") + req.originalUrl;
      const response = await axios.get(target);

      const cacheEntry = {
        status: response.status,
        data: response.data,
        headers: { ...response.headers, "X-Cache": "MISS" },
      };

      setCache(cacheKey, cacheEntry);

      res.set(cacheEntry.headers);
      res.status(response.status).send(response.data);
    } catch (err) {
      res.status(err.response?.status || 500).send("Error: " + err.message);
    }
  });

  app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
  });
}

module.exports = { startServer };
