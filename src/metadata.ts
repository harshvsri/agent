import type { Message, MessageWithMetadata } from "../types";
import { randomUUIDv7 } from "bun";

export const addMetadata = (message: Message): MessageWithMetadata => ({
  ...message,
  id: randomUUIDv7(),
  createdAt: new Date().toISOString(),
});

export const removeMetadata = (message: MessageWithMetadata): Message => {
  const { id, createdAt, ...aiMessage } = message;
  return aiMessage;
};
