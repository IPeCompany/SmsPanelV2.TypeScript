import { request, SmsConfig } from "../utils/index.js";

/**
 * Creates a GetLineNumbers function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to retrieve available line numbers
 */
export const createGetLineNumbers = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  /**
   * Retrieves all available line numbers for the account
   *
   * @returns Promise with array of line numbers
   */
  return async function getLineNumbers() {
    return request<number[]>({
      input: `/v1/line`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

