import { request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Response from the archive report API
 */
export interface ReportArchiveResponse {
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
 * Creates a ReportArchive function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to retrieve archived message reports
 */
export const createReportArchive = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  /**
   * Retrieves archived SMS messages within a date range
   *
   * @param fromDate - Start date (Unix timestamp)
   * @param toDate - End date (Unix timestamp)
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of archived message reports
   */
  return async function reportArchive(
    fromDate?: number,
    toDate?: number,
    pageNumber?: number,
    pageSize?: number
  ): Promise<ResponseModel<ReportArchiveResponse[]>> {
    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate.toString());
    if (toDate) params.append("toDate", toDate.toString());
    if (pageNumber) params.append("pageNumber", pageNumber.toString());
    if (pageSize) params.append("pageSize", pageSize.toString());

    const queryString = params.toString();
    const url = queryString
      ? `/v1/send/archive?${queryString}`
      : `/v1/send/archive`;

    return request<ReportArchiveResponse[]>({
      input: url,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

