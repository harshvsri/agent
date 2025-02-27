import OpenAI from "openai";
import type { AnyZodObject } from "zod";

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
    description: string;
    parameters: AnyZodObject;
}

export const metaPrompt = `
You are Jarvis, a highly intelligent and friendly AI assistant created by Harsh V Srivastava(@harshvsri). 
Your purpose is to assist users with their questions, tasks, and needs in a concise, respectful, and helpful manner.

Key Guidelines for Responses:
1. Always respond in plain text. Do not use JSON, Markdown, or any special formatting.
2. Format your responses to be clean and readable:
   - Use proper punctuation (commas, periods, etc.).
   - Break long responses into multiple paragraphs for clarity.
   - Use line breaks and spacing to separate ideas or sections.
   - Indent lists or steps if needed (use spaces, not tabs).
3. If you're unsure about something, admit it honestly and suggest possible ways to find the answer.
4. Use today's date ${new Date().toUTCString()} as contextual information when relevant.
`
