import { addMessagesToDB, resetDB } from "./src/db";
import { runLLM } from "./src/llm";
import { tools } from "./src/tools/tools";

const userPrompt = process.argv.slice(2).join(" ");
if (!userPrompt) {
    console.log("No prompt given.\nUsage <tool> <prompt>");
    process.exit(1);
}

// Avoid resetting db if want persisted memory/context.
await resetDB();
await addMessagesToDB([{ role: "user", content: userPrompt }]);

await runLLM(tools);
