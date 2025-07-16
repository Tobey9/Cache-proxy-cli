#!/usr/bin/env node

const { Command } = require("commander");
const { startServer } = require("./server");
const { clearCache } = require("./cache");

const program = new Command();

program
  .option("--port <number>", "Port to run the proxy server", parseInt)
  .option("--origin <url>", "Origin server URL")
  .option("--clear-cache", "Clear the cache");

program.parse(process.argv);
const options = program.opts();

if (options.clearCache) {
  clearCache();
  console.log("✅ Cache cleared.");
} else if (options.port && options.origin) {
  startServer(options.port, options.origin);
} else {
  console.log("❌ Invalid usage.");
  console.log("Example:");
  console.log("  caching-proxy --port 3000 --origin http://dummyjson.com");
  console.log("  caching-proxy --clear-cache");
}
