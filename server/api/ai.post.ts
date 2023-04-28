import { Configuration, OpenAIApi } from "openai";
import { companionAgent } from "~~/agents";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // const { OPENAI_API_KEY } = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: process.env.NUXT_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: body.messages || [],
    temperature: body.temperature || 1,
    ...companionAgent(body),
  });
  return completion.data;
});
