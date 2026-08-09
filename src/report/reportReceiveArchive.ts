import { request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Response from the receive archive report API
 */
export interface ReportReceiveArchiveResponse {
  receiveReturnId: number;
  messageText: string;
  number: number;
  mobile: number;
  receivedDateTime: number;
}

/**
 * Creates a ReportReceiveArchive function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to retrieve archived received messages
 */
export const createReportReceiveArchive = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  /**
   * Retrieves archived received SMS messages within a date range
   *
   * @param fromDate - Start date (Unix timestamp)
   * @param toDate - End date (Unix timestamp)
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of archived received messages
   */
  return async function reportReceiveArchive(
    fromDate?: number,
    toDate?: number,
    pageNumber?: number,
    pageSize?: number
  ): Promise<ResponseModel<ReportReceiveArchiveResponse[]>> {
    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate.toString());
    if (toDate) params.append("toDate", toDate.toString());
    if (pageNumber) params.append("pageNumber", pageNumber.toString());
    if (pageSize) params.append("pageSize", pageSize.toString());

    const queryString = params.toString();
    const url = queryString
      ? `/v1/receive/archive?${queryString}`
      : `/v1/receive/archive`;

    return request<ReportReceiveArchiveResponse[]>({
      input: url,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

