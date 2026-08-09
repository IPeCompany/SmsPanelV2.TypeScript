import { request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Response from the message report API
 */
export interface ReportMessageResponse {
  messageId: number;
  mobile: number;
  messageText: string;
  sendDateTime: number;
  lineNumber: number;
  cost: number;
  deliveryState: number;
  deliveryDateTime: number;
}

/**
 * Creates a ReportMessage function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to retrieve message delivery status and details
 */
export const createReportMessage = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  /**
   * Gets the delivery status and details of a sent message
   *
   * @param messageId - The message ID to get report for
   * @returns Promise with message details including delivery state, cost, and timestamps
   */
  return async function reportMessage(
    messageId: number
  ): Promise<ResponseModel<ReportMessageResponse>> {
    return request<ReportMessageResponse>({
      input: `/v1/send/${messageId}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

