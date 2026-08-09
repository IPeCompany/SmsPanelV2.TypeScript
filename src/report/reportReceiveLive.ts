import { request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Response from the receive live report API
 */
export interface ReportReceiveLiveResponse {
  messageText: string;
  number: number;
  mobile: number;
  receivedDateTime: number;
}

/**
 * Creates a ReportReceiveLive function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to retrieve live received messages
 */
export const createReportReceiveLive = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  /**
   * Retrieves live received SMS messages with pagination and sorting
   *
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @param sortByNewest - Sort by newest messages first
   * @returns Promise with array of live received messages
   */
  return async function reportReceiveLive(
    pageNumber?: number,
    pageSize?: number,
    sortByNewest?: boolean
  ): Promise<ResponseModel<ReportReceiveLiveResponse[]>> {
    const params = new URLSearchParams();
    if (pageNumber) params.append("pageNumber", pageNumber.toString());
    if (pageSize) params.append("pageSize", pageSize.toString());
    if (sortByNewest !== undefined)
      params.append("sortByNewest", sortByNewest.toString());

    const queryString = params.toString();
    const url = queryString
      ? `/v1/receive/live?${queryString}`
      : `/v1/receive/live`;

    return request<ReportReceiveLiveResponse[]>({
      input: url,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

