
const corsOptions = {
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:5173",
      "http://localhost:4173",
    ],
    credentials: true,
  }
  const CHAT_TOKEN = 'chat-token';

export { corsOptions, CHAT_TOKEN};