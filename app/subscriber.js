const { createClient } = require("redis");

// Get the channel name from the environment variable or use the default
const CHANNEL_NAME = process.env.CHANNEL_NAME || "my_channel";

const REDIS_HOST = "redis";
const REDIS_PORT = 6379;
const REDIS_PASSWORD = "qwerty";

async function main() {
  // Create a Redis client
  const client = createClient({
    url: `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
    socket: {
      reconnectStrategy: (retries) => {
        console.log(`Reconnection attempt #${retries}...`);
        // Delay for 3 seconds before reconnecting
        return 3000; // 3000ms = 3 seconds
      },
    },
  });

  // Handle Redis client errors
  client.on("error", (err) => console.error("Redis Client Error", err));

  // Connect to Redis
  await client.connect();

  console.log(`Connected to Redis. Subscribing to channel: ${CHANNEL_NAME}`);

  // Subscribe to the channel
  await client.subscribe(CHANNEL_NAME, (message) => {
    console.log(`Message from channel ${CHANNEL_NAME}: ${message}`);
  });
}

// Execute the main function
main().catch((err) => console.error("Error:", err));
