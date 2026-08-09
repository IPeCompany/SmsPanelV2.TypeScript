import { ApiKey } from "./apiKey.js";

export interface SmsConfig {
  apiKey: ApiKey;
  lineNumber: number;
}

