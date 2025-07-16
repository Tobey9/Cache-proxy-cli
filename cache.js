const cache = new Map();

function getCache(key) {
  return cache.get(key);
}

function setCache(key, value) {
  cache.set(key, value);
}

function clearCache() {
  cache.clear();
}

module.exports = { getCache, setCache, clearCache };
