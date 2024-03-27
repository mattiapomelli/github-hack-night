"use client";

import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [query, setQuery] = useState("");

  const { data: repos, mutate } = useMutation({
    mutationFn: async () => {
      return await ky
        .post("/api/search", { json: { query } })
        .json<{ name: string; description: string; topics: string[] }[]>();
    },
  });

  console.log("Repos: ", repos);

  return (
    <div className="mx-auto max-w-xl pt-20">
      <div className="flex items-center gap-2">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={() => mutate()}>Search</Button>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        {repos?.map((repo) => (
          <div key={repo.name} className="rounded-md border p-3">
            <h2 className="font-bold">{repo.name}</h2>
            <p>{repo.description}</p>
            <p className="mt-2">{repo.topics.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
