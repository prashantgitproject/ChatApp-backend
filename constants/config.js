
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }

  const CHAT_TOKEN = 'chat-token';

export { corsOptions, CHAT_TOKEN};