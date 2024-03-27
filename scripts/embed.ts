import { ObjectsBatcher } from "weaviate-ts-client";

import { prisma } from "../src/lib/prisma";
import { client } from "../src/lib/weaviate";

// async function getJsonData() {
//   const file = await fetch(
//     "https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json",
//   );
//   return file.json();
// }

async function main() {
  console.log("process.env.WEAVIATE_API_KEY: ", process.env.WEAVIATE_API_KEY);

  try {
    // Get the questions directly from the URL
    // const data = await getJsonData();
    const repos = await prisma.repository.findMany();

    console.log("Repos: ", repos);
    // return;

    // Prepare a batcher
    let batcher: ObjectsBatcher = client.batch.objectsBatcher();
    let counter = 0;
    const batchSize = 300;

    for (const repo of repos) {
      // Construct an object with a class and properties 'answer' and 'question'
      const obj = {
        class: "Repo",
        // class: "Question",
        properties: {
          name: repo.name,
          description: repo.description,
          topics: repo.topics.split(","),
          // answer: question.Answer,
          // question: question.Question,
          // category: question.Category,
        },
      };

      // add the object to the batch queue
      batcher = batcher.withObject(obj);

      // When the batch counter reaches batchSize, push the objects to Weaviate
      if (counter++ == batchSize) {
        // flush the batch queue
        const res = await batcher.do();
        console.log("Response: ", res);

        // restart the batch queue
        counter = 0;
        batcher = client.batch.objectsBatcher();
      }
    }

    // Flush the remaining objects
    const response = await batcher.do();

    console.log("Final response: ", response);
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
