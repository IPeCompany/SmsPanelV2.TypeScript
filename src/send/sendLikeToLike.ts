import { PackId, request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Request body for sending like-to-like SMS messages
 */
export interface SendLikeToLikeBody {
  lineNumber: number;
  messageTexts: Array<string>;
  mobiles: Array<string>;
  sendDateTime?: number;
}

/**
 * Response from the like-to-like SMS send API
 */
export interface SendLikeToLikeResponse {
  packId: PackId;
  messageIds: Array<number>;
  cost: number;
}

/**
 * Creates a SendLikeToLike function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @param lineNumber - Default line number for sending messages
 * @returns A function to send paired SMS messages
 */
export const createSendLikeToLike = ({ apiKey, lineNumber }: SmsConfig) => {
  /**
   * Sends multiple different messages to multiple recipients in pairs (1-to-1 mapping)
   *
   * First message goes to first mobile, second to second mobile, etc.
   *
   * @param messageTexts - Array of messages (must match length of mobiles array)
   * @param mobiles - Array of mobile numbers (must match length of messageTexts array)
   * @param sendDateTime - Optional Unix timestamp for scheduled sending
   * @param customLineNumber - Optional custom line number to override the default
   * @returns Promise with packId, messageIds, and cost
   */
  return async function sendLikeToLike(
    messageTexts: string[],
    mobiles: string[],
    sendDateTime?: number,
    customLineNumber?: number
  ): Promise<ResponseModel<SendLikeToLikeResponse>> {
    return request<SendLikeToLikeResponse>({
      input: "/v1/send/liketolike",
      init: {
        method: "POST",
        body: {
          lineNumber: customLineNumber ?? lineNumber,
          messageTexts,
          mobiles,
          ...(sendDateTime && { sendDateTime }),
        } as SendLikeToLikeBody,
      },
      apiKey,
    });
  };
};

