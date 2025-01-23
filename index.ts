import { addMessages, getMessages } from "./src/db";
import { runLLM } from "./src/llm";

const userPrompt = process.argv[2];
if (!userPrompt) {
  console.log("No prompt given.\nUsage <tool> <prompt>");
  process.exit(1);
}

addMessages([{ role: "user", content: userPrompt }]);
const history = await getMessages();

await runLLM(history);
