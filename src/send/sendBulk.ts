import { PackId, request, ResponseModel } from "../utils/index.js";
import { SmsConfig } from "../utils/models/smsConfig.js";

/**
 * Request body for sending bulk SMS messages
 */
export interface SendBulkBody {
  lineNumber: number;
  messageText: string;
  mobiles: Array<string>;
  sendDateTime?: number;
}

/**
 * Response from the bulk SMS send API
 */
export interface SendBulkResponse {
  packId: PackId;
  messageIds: Array<number>;
  cost: number;
}

/**
 * Creates a SendBulk function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @param lineNumber - Default line number for sending messages
 * @returns A function to send bulk SMS messages
 */
export const createSendBulk = ({ apiKey, lineNumber }: SmsConfig) => {
  /**
   * Sends a bulk SMS message to multiple recipients
   *
   * @param messageText - The text message to send
   * @param mobiles - Array of mobile numbers (e.g., ["09123456789"])
   * @param sendDateTime - Optional Unix timestamp for scheduled sending
   * @param customLineNumber - Optional custom line number to override the default
   * @returns Promise with packId, messageIds, and cost
   */
  return async function sendBulk(
    messageText: string,
    mobiles: string[],
    sendDateTime?: number,
    customLineNumber?: number
  ): Promise<ResponseModel<SendBulkResponse>> {
    
    const body = {
      lineNumber: customLineNumber ?? lineNumber,
      messageText,
      mobiles,
      ...(sendDateTime && { sendDateTime }),
    } as SendBulkBody;

    return request<SendBulkResponse>({
      input: `/v1/send/bulk`,
      init: {
        method: "POST",
        body,
      },
      apiKey,
    });
  };
};

