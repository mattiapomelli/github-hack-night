import OpenAI from "openai";

import { env } from "@/env.mjs";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

interface Message {
  role: "system" | "user";
  content: string;
}

interface CompletionOptions {
  systemMessage?: string;
  prompt: string;
}

export async function getCompletion({ systemMessage, prompt }: CompletionOptions) {
  const messages: Message[] = [];

  if (systemMessage) {
    messages.push({ role: "system", content: systemMessage });
  }

  messages.push({ role: "user", content: prompt });

  const res = await openai.chat.completions.create({
    messages,
    model: "gpt-4",
    temperature: 0,
    // response_format: { type: "json_object" },
  });

  return res.choices[0].message.content;
}
1;
