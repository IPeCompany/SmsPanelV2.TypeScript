import { request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Response from the latest receive report API
 */
export interface ReportLatestReceiveResponse {
  receiveReturnId: number;
  messageText: string;
  number: number;
  mobile: number;
  receivedDateTime: number;
}

/**
 * Creates a ReportLatestReceive function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to retrieve latest received messages
 */
export const createReportLatestReceive = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  /**
   * Retrieves the latest received SMS messages
   *
   * @param count - Number of messages to retrieve
   * @returns Promise with array of latest received messages
   */
  return async function reportLatestReceive(
    count?: number
  ): Promise<ResponseModel<ReportLatestReceiveResponse[]>> {
    const params = new URLSearchParams();
    if (count) params.append("count", count.toString());

    const queryString = params.toString();
    const url = queryString
      ? `/v1/receive/latest?${queryString}`
      : `/v1/receive/latest`;

    return request<ReportLatestReceiveResponse[]>({
      input: url,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

