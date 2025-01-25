import { assertEquals } from "@std/assert";
import { Health } from "api/health.ts";
import { Client } from "client";

Deno.test("Health#ping should return timestamp", async () => {
  const client = new Client();
  const health = new Health(client);

  const response = await health.ping();

  assertEquals(response.data.timestamp > 0, true);
});
