import OpenAI from 'openai'

export type Message =
  | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }

export type MessageWithMetadata = Message & {
  id: string,
  createdAt: string
};

export type History = {
  messages: MessageWithMetadata[]
}

