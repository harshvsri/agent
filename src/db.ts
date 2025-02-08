import { randomUUIDv7 } from "bun";
import { JSONFilePreset } from "lowdb/node";
import { metaPrompt, type History, type Message, type MessageWithMetadata } from "./types";

export const getDB = async () => {
    const defaultData: History = {
        messages: []
    }

    const db = await JSONFilePreset<History>("db.json", defaultData);
    return db;
}

export const resetDB = async () => {
    const db = await getDB();
    db.data.messages = [];

    const systemMessage: Message = {
        role: "system",
        content: metaPrompt
    }
    db.data.messages.push(addMetadata(systemMessage));
    await db.write();
}

export const addMessagesToDB = async (messages: Message[]) => {
    const db = await getDB();

    let messagesWithMetada = messages.map(addMetadata);
    db.data.messages.push(...messagesWithMetada);
    await db.write();
}

export const getMessagesFromDB = async (): Promise<Message[]> => {
    const db = await getDB();

    const messages = db.data.messages.map(removeMetadata);
    return messages;
}

// Metadata methods.
const addMetadata = (message: Message): MessageWithMetadata => ({
    ...message,
    id: randomUUIDv7(),
    createdAt: new Date().toISOString(),
});

const removeMetadata = (message: MessageWithMetadata): Message => {
    const { id, createdAt, ...aiMessage } = message;
    return aiMessage;
};
