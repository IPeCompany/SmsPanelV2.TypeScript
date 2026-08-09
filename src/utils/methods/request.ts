import { ENDPOINT } from "./constant.js";
import { ApiKey, ResponseModel } from "../models/index.js";

type RequestProps = {
  apiKey: ApiKey;
  input: string | URL | Request;
  init?: Omit<RequestInit, 'body'> & {
    body?: any;
  };
};

export async function request<TResult>(
  props: RequestProps
): Promise<ResponseModel<TResult>> {
  const response = await fetch(`${ENDPOINT}${props.input}`, {
    ...props.init,
    headers: {
      "X-API-KEY": props.apiKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...(props.init?.body && { 
      body: typeof props.init.body === 'string' 
        ? props.init.body 
        : JSON.stringify(props.init.body) 
    }),
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorBody = await response.json();
      if (errorBody.message) {
        errorMessage += ` - ${errorBody.message}`;
      }
    } catch {
      // If response body is not JSON, use the status text
      errorMessage += ` - ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<ResponseModel<TResult>>;
}

