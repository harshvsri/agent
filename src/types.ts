import OpenAI from "openai";
import type { z } from "zod";

export type Message =
    | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
    | { role: "user" | "system"; content: string }
    | { role: "tool"; content: string; tool_call_id: string };

export type MessageWithMetadata = Message & {
    id: string;
    createdAt: string;
};

export type History = {
    messages: MessageWithMetadata[];
};

export type Tool = {
    name: string;
    parameters: z.AnyZodObject
}
