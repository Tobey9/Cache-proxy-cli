# 🧠 Caching Proxy Server (CLI Tool)

This is a simple CLI-based caching proxy server built with Node.js and Express.  
It forwards incoming requests to an origin server, caches the responses, and returns cached data when the same request is made again — with helpful `X-Cache` headers to show if the response came from cache or not.

https://roadmap.sh/projects/caching-server

---

## 🚀 Features

- Start a caching proxy server from the terminal
- Forwards requests to any origin server (e.g., `dummyjson.com`)
- Caches responses in memory
- Sends `X-Cache: HIT` or `X-Cache: MISS` in headers
- Option to clear the cache using CLI flag

---

## 📦 Installation

```bash
git clone https://github.com/your-username/caching-proxy.git
cd caching-proxy
npm install
```

---

## 🧪 Usage

**Start the proxy server**

```bash
node index.js --port 3000 --origin http://dummyjson.com
```

**Then visit**

```bash
http://localhost:3000/products
```

✅ First request → X-Cache: MISS
✅ Repeat request → X-Cache: HIT (cached)

You can inspect the headers in:

- Browser DevTools → Network tab → Response Headers

- Or use curl:

```bash
curl -i http://localhost:3000/products
```

**Clear the cache**

```bash
node index.js --clear-cache
```

## 🔧 Code Structure

```bash
.
├── index.js       # CLI entry point using commander
├── server.js      # Starts Express server and handles proxy logic
├── cache.js       # Simple in-memory cache using Map
└── package.json
```

## 🧠 How It Works

- Uses Express to run a proxy server

- Uses Axios to fetch responses from origin server

- Caches responses in memory using a JavaScript Map

- Automatically includes original headers (like Content-Type)

- Adds custom header X-Cache to indicate cache status

## 📌 Example

```bash
node index.js --port 3000 --origin http://dummyjson.com
```

**Visit:**

```bash
http://localhost:3000/products
```

Response header will include:

```http
X-Cache: MISS
```

On second request:

```http
X-Cache: HIT
```
