import { client } from "../src/lib/weaviate";

async function main() {
  try {
    const res = await client.graphql
      .get()
      .withClassName("Question")
      .withFields("question answer category")
      .withNearText({ concepts: ["space"] })
      .withGenerate({ singlePrompt: "Explain {answer} as you might to a five-year-old." })
      .withLimit(2)
      .do();

    console.log(JSON.stringify(res, null, 2));
    return res;
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
