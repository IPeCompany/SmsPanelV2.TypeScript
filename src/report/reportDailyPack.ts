import { PackId, request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Response from the daily pack report API
 */
export interface ReportDailyPackResponse {
  packId: PackId;
  recipientCount: number;
  creationDateTime: number;
}

/**
 * Creates a ReportDailyPack function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to retrieve daily SMS pack reports
 */
export const createReportDailyPack = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  /**
   * Retrieves daily SMS pack reports with pagination
   *
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of daily pack reports
   */
  return async function reportDailyPack(
    pageNumber?: number,
    pageSize?: number
  ): Promise<ResponseModel<ReportDailyPackResponse[]>> {
    const params = new URLSearchParams();
    if (pageNumber) params.append("pageNumber", pageNumber.toString());
    if (pageSize) params.append("pageSize", pageSize.toString());

    const queryString = params.toString();
    const url = queryString ? `/v1/send/pack?${queryString}` : `/v1/send/pack`;

    return request<ReportDailyPackResponse[]>({
      input: url,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

