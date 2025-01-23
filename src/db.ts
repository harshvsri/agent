import { JSONFilePreset } from "lowdb/node";
import { addMetadata, removeMetadata, } from "./metadata";
import type { History, Message } from "../types";

export const getDB = async () => {
  const defaultData: History = {
    messages: []
  }

  const db = await JSONFilePreset<History>("db.json", defaultData);
  return db;
}

export const addMessages = async (messages: Message[]) => {
  const db = await getDB();

  let messagesWithMetada = messages.map(addMetadata);
  db.data.messages.push(...messagesWithMetada);
  await db.write();
}

export const getMessages = async (): Promise<Message[]> => {
  const db = await getDB();

  const messages = db.data.messages.map(removeMetadata);
  return messages;
}
