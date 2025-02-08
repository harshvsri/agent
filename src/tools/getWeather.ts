import { z } from 'zod'
import type { Tool } from '../types'

export const getWeatherToolDefinition: Tool = {
    name: 'get_weather',
    description: "fetches weather by taking city name as params.",
    parameters: z.object({
        city: z.string()
    }).strict(),
}

type Args = z.infer<typeof getWeatherToolDefinition.parameters>

export const getWeather = async (args: Args) => {
    const baseURL = "https://api.weatherstack.com/current";
    const url = new URL(baseURL);
    const params = new URLSearchParams({
        access_key: process.env.WEATHERSTACK_API_KEY ?? "",
        query: args.city ?? "Lucknow"
    });
    url.search = params.toString();

    const response = await fetch(url);
    const result = await response.text();
    return result;
}
