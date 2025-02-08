import { z } from 'zod'
import type { Tool, ToolFn } from '../types'

export const dadJokeToolDefinition: Tool = {
    name: 'dad_joke',
    description: "fetches a dad joke.",
    parameters: z.object({}).strict(),
}

type Args = z.infer<typeof dadJokeToolDefinition.parameters>

export const dadJoke: ToolFn<Args, string> = async ({ toolArgs }) => {
    const res = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            Accept: 'application/json',
        },
    })
    return (await res.json()).joke
}
