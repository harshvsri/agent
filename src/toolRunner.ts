import type OpenAI from "openai";

const runTool = async (toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall, userMessage: string) => {
    const input = {
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments),
    }

    switch (toolCall.function.name) {
        case 'weather':
            return getWeather()

        default:
            throw new Error(`Unknown tool: ${toolCall.function.name}`)
    }
}

const getWeather = () => "Too cold, 10 degree celcius."
