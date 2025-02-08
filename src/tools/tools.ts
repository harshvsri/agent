import type OpenAI from "openai/index.mjs";
import type { Tool } from "../types";
import { dadJoke, dadJokeToolDefinition } from "./dadJoke";
import { getWeather, getWeatherToolDefinition } from "./getWeather";

export const tools: Tool[] = [
    dadJokeToolDefinition,
    getWeatherToolDefinition
]

type ToolCallType = OpenAI.Chat.Completions.ChatCompletionMessageToolCall;

export const getToolCallContent = async (toolCall: ToolCallType): Promise<string> => {
    const fnName = toolCall.function.name
    const args = JSON.parse(toolCall.function.arguments);

    switch (fnName) {
        case "get_weather":
            return await getWeather(args);
        case "dad_joke":
            return await dadJoke(args);
        default:
            return "Function not found";
    }
}
