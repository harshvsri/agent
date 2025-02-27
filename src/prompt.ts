import { sleep } from 'bun';
import * as readline from 'readline';

export const getUserPrompt = async (): Promise<string> => {
    let prompt = "";
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(">>> ", (answer) => {
        prompt = answer
        rl.close();
    });
    while (prompt == "") { await sleep(100) }

    return prompt;
}
