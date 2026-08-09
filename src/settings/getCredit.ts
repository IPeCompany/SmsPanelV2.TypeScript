import { request, SmsConfig } from "../utils/index.js";

/**
 * Response from the credit API
 */
export interface GetCreditResponse {
  credit: number;
}

/**
 * Creates a GetCredit function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to retrieve account credit balance
 */
export const createGetCredit = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  /**
   * Retrieves the current account credit balance
   *
   * @returns Promise with the credit amount
   */
  return async function getCredit() {
    return request<number>({
      input: `/v1/credit`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

