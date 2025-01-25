import { Client, Response } from "client";

interface PingResponse {
  timestamp: number;
}

export class Health {
  constructor(private readonly client: Client) {}

  async ping(): Promise<Response<PingResponse>> {
    const response = await this.client.get(
      `/ping`,
      this.client.defaultHeader(),
    );

    return await response.json();
  }
}
