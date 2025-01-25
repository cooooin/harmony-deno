import { Client, Response } from "client";

interface PersonClaimPayload {
  nickname: string;
  password: string;
}

interface PersonClaimResponse {
  claim: string;
  expire: number;
}

export class Person {
  constructor(private readonly client: Client) {}

  async claim(
    payload: PersonClaimPayload,
  ): Promise<Response<PersonClaimResponse>> {
    const response = await this.client.post(
      `/person/claim`,
      this.client.defaultHeader(),
      JSON.stringify(payload),
    );

    return await response.json();
  }
}
