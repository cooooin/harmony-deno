import { Person } from "api/person.ts";
import { Health } from "api/health.ts";

export abstract class HTTPClient {
  constructor(public api: string) {}

  protected request = (
    method: string,
    path: string,
    headers?: HeadersInit,
    body?: BodyInit,
  ) => {
    return fetch(`${this.api}${path}`, {
      method: method,
      headers: headers,
      body: body,
    });
  };
}

export interface Response<T> {
  ok: boolean;
  code: number;
  message: string | null;
  data: T;
}

export interface Options {
  api?: string;
}

export class Client extends HTTPClient {
  #claim?: string;

  public set claim(value: string) {
    this.#claim = value;
  }

  constructor(options?: Options) {
    super(options?.api ?? "https://api.ioaths.com");
  }

  public defaultHeader() {
    return {
      ...{ "Content-Type": "application/json" },
    };
  }

  public accesstHeader() {
    return {
      ...{ "X-Access-Claim": this.#claim ?? "" },
      ...{ "Content-Type": "application/json" },
    };
  }

  public get = (path: string, headers?: HeadersInit, body?: BodyInit) => {
    return this.request("GET", path, headers, body);
  };

  public post = (path: string, headers?: HeadersInit, body?: BodyInit) => {
    return this.request("POST", path, headers, body);
  };

  health = new Health(this);
  person = new Person(this);
}
