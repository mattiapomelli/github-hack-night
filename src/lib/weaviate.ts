import weaviate, { WeaviateClient, ApiKey } from "weaviate-ts-client";

export const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: "github-hack-night-kxtvqi3q.weaviate.network",
  apiKey: new ApiKey(process.env.WEAVIATE_API_KEY || ""),
  headers: { "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY || "" },
});
