import { client } from "../src/lib/weaviate";

const classObj = {
  class: "Question",
  vectorizer: "text2vec-openai", // If set to "none" you must always provide vectors yourself. Could be any other "text2vec-*" also.
  moduleConfig: {
    "text2vec-openai": {},
    "generative-openai": {}, // Ensure the `generative-openai` module is used for generative queries
  },
};

async function main() {
  console.log("process.env.WEAVIATE_API_KEY: ", process.env.WEAVIATE_API_KEY);

  try {
    const response = await client.schema.classCreator().withClass(classObj).do();
    console.log("Response: ", response);
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
