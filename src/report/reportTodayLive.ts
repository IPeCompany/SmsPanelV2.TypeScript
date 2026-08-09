import { request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Response from the today live report API
 */
export interface ReportTodayLiveResponse {
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
 * Creates a ReportTodayLive function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to retrieve today's live message reports
 */
export const createReportTodayLive = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  /**
   * Retrieves today's sent SMS messages with live status
   *
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of today's sent messages
   */
  return async function reportTodayLive(
    pageNumber?: number,
    pageSize?: number
  ): Promise<ResponseModel<ReportTodayLiveResponse[]>> {
    const params = new URLSearchParams();
    if (pageNumber) params.append("pageNumber", pageNumber.toString());
    if (pageSize) params.append("pageSize", pageSize.toString());

    const queryString = params.toString();
    const url = queryString ? `/v1/send/live?${queryString}` : `/v1/send/live`;

    return request<ReportTodayLiveResponse[]>({
      input: url,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

