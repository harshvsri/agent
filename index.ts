import { addMessagesToDB, getMessagesFromDB, resetDB } from "./src/db";
import { runLLM } from "./src/llm";

const userPrompt = process.argv.slice(2).join(" ");
if (!userPrompt) {
    console.log("No prompt given.\nUsage <tool> <prompt>");
    process.exit(1);
}


await resetDB();
await addMessagesToDB([{ role: "user", content: userPrompt }]);
const history = await getMessagesFromDB();

await runLLM(history);
