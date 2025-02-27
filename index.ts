import { addMessagesToDB, resetDB } from "./src/db";
import { runLLM } from "./src/llm";
import { getUserPrompt } from "./src/prompt";
import { tools } from "./src/tools/tools";

let running = true;

process.on("SIGINT", async () => {
    console.log(" Quitting...");
    running = false;
    await resetDB();
    process.exit();
});

while (running) {
    await addMessagesToDB([{ role: "user", content: await getUserPrompt() }]);
    await runLLM(tools);
}
