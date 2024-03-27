import { NextResponse } from "next/server";
import { z } from "zod";

import { client } from "@/lib/weaviate";

export const schema = z.object({
  query: z.string(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { query } = schema.parse(json);

    const res = await client.graphql
      .get()
      .withClassName("Repo")
      .withFields("name description topics")
      .withNearText({ concepts: [query] })
      .withGenerate({
        singlePrompt: "Explain why the repository {answer} could be interesting to the user.",
      })
      .withLimit(5)
      .do();

    const repos = res.data.Get.Repo;

    return NextResponse.json(repos);
  } catch (error) {
    console.error("Error: ", error);

    return NextResponse.json(null, { status: 500 });
  }
}
