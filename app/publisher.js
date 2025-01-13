const { createClient } = require("redis");
const chalk = require("chalk");

// List of available channels and their corresponding colors
const CHANNELS = [
  { name: "my_channel", color: chalk.blue },
  { name: "weather_news", color: chalk.cyan },
  { name: "finance_news", color: chalk.green },
  { name: "education_news", color: chalk.yellow },
];

const REDIS_HOST = "redis";
const REDIS_PORT = 6379;
const REDIS_PASSWORD = "qwerty";

// Function to select a random channel
function getRandomChannel() {
  return CHANNELS[Math.floor(Math.random() * CHANNELS.length)];
}

// Function to generate a random interval (1-10 seconds)
function getRandomInterval() {
  return Math.floor(Math.random() * 500) + 1000;
}

// Function to generate a message
function generateMessage(channel) {
  return `Message for ${channel.name} at ${new Date().toISOString()}`;
}

// Function to publish messages to random channels
async function publishRandomMessage(client) {
  const randomChannel = getRandomChannel();
  const randomInterval = getRandomInterval();
  const message = generateMessage(randomChannel);

  client.publish(randomChannel.name, message);

  // Display the message in the channel's color
  console.log(
    randomChannel.color(`Published to ${randomChannel.name}: ${message}`)
  );

  // Schedule the next message
  setTimeout(() => publishRandomMessage(client), randomInterval);
}

async function main() {
  // Create a Redis client
  const client = createClient({
    url: `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
  });

  // Handle Redis client errors
  client.on("error", (err) =>
    console.error(chalk.red("Redis Client Error"), err)
  );

  // Connect to Redis
  await client.connect();

  console.log(
    chalk.green(
      `Connected to Redis. Publishing to channels: ${CHANNELS.map(
        (ch) => ch.name
      ).join(", ")}`
    )
  );

  // Start publishing messages
  publishRandomMessage(client);
}

// Execute the main function
main().catch((err) => console.error(chalk.red("Error:"), err));
