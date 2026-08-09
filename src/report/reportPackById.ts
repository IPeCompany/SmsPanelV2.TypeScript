import { PackId, request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Response from the pack report API
 */
export interface ReportPackByIdResponse {
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
 * Creates a ReportPackById function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to retrieve messages from a specific pack
 */
export const createReportPackById = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  /**
   * Retrieves all messages in a specific SMS pack
   *
   * @param packId - The pack identifier to retrieve messages for
   * @returns Promise with array of messages in the pack
   */
  return async function reportPackById(
    packId: PackId
  ): Promise<ResponseModel<ReportPackByIdResponse[]>> {
    return request<ReportPackByIdResponse[]>({
      input: `/v1/send/pack/${packId}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

