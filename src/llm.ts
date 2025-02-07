import OpenAI from "openai";
import { addMessagesToDB } from "./db";
import { startSpinner, stopSpinner } from "./spinner";
import { zodFunction } from "openai/helpers/zod";
import type { Message, Tool } from "./types";


export const runLLM = async (messages: Message[], tools?: Tool[]) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.log("API key needed.");
        process.exit(1);
    }
    const openai = new OpenAI({
        apiKey,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });

    const formattedTools = tools?.map((tool) => zodFunction(tool))

    startSpinner();
    const response = await openai.chat.completions.create({
        model: "gemini-1.5-flash",
        messages: messages,
        stream: false,
        tools: formattedTools,
        tool_choice: 'auto',
        parallel_tool_calls: false,
    });
    await addMessagesToDB([response.choices[0].message]);
    stopSpinner();

    const content = response.choices[0].message.content;
    console.log(content);
};
