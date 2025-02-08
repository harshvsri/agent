import OpenAI from "openai";
import { addMessagesToDB, getMessagesFromDB } from "./db";
import { startSpinner, stopSpinner } from "./spinner";
import { zodFunction } from "openai/helpers/zod";
import { getToolCallContent } from "./tools/tools";
import type { Message, Tool } from "./types";

export const runLLM = async (tools?: Tool[]) => {
    const apiKey = process.env.FLASH_API_KEY;
    if (!apiKey) {
        console.log("API key needed.");
        process.exit(1);
    }

    const openai = new OpenAI({
        apiKey,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
    const formattedTools = tools?.map((tool) => zodFunction(tool))

    startSpinner("Thinking...");
    const response = await getLLMResponce(openai, formattedTools);
    await addMessagesToDB([response.choices[0].message]);
    stopSpinner();

    const toolCall = response.choices[0].message.tool_calls?.[0];
    if (toolCall) {
        const toolCallMessage: Message = {
            role: "tool",
            tool_call_id: toolCall.id,
            content: await getToolCallContent(toolCall)
        }
        await addMessagesToDB([toolCallMessage]);

        startSpinner(`Calling ${toolCall.function.name}`)
        const responseAfterToolCall = await getLLMResponce(openai, formattedTools);
        await addMessagesToDB([responseAfterToolCall.choices[0].message]);
        stopSpinner();

        const content = responseAfterToolCall.choices[0].message.content;
        console.log(content);
        return;
    }

    const content = response.choices[0].message.content;
    console.log(content);
};

const getLLMResponce = async (openai: OpenAI, formattedTools: any) => {
    return openai.chat.completions.create({
        model: "gemini-1.5-flash",
        messages: await getMessagesFromDB(),
        stream: false,
        tools: formattedTools,
        tool_choice: 'auto',
        parallel_tool_calls: false,
    });
}
