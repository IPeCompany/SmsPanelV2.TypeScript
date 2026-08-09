import { request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Response from the send by URL API
 */
export interface SendByURLResponse {
  messageId: number;
  cost: number;
}

/**
 * Creates a SendByURL function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @param lineNumber - Default line number for sending messages
 * @returns A function to send SMS via URL parameters (legacy method)
 */
export const createSendByURL = ({ apiKey, lineNumber }: SmsConfig) => {
  /**
   * Sends SMS using URL query parameters (legacy method)
   *
   * @param username - Your SMS.ir panel username
   * @param mobile - Recipient's mobile number
   * @param text - The message text to send
   * @param customLine - Optional custom line number
   * @returns Promise with messageId and cost
   */
  return async function sendByUrl(
    username: string,
    mobile: string,
    text: string,
    customLine?: number
  ): Promise<ResponseModel<SendByURLResponse>> {
    const params = new URLSearchParams({
      username,
      password: apiKey,
      line: String(customLine ?? lineNumber),
      mobile,
      text,
    });

    return request<SendByURLResponse>({
      input: `/v1/send?${params.toString()}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

