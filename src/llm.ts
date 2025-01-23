import OpenAI from "openai";
import type { Message } from "../types";
import { addMessages } from "./db";

export const runLLM = async (messages: Message[]) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const openai = new OpenAI({
    apiKey,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
  });

  const response = await openai.chat.completions.create({
    model: "gemini-1.5-flash",
    messages: messages,
    stream: false,
  });

  await addMessages([response.choices[0].message])
  console.log(response.choices[0].message.content);
}
