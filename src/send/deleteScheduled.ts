import { PackId, request, SmsConfig } from "../utils/index.js";

/**
 * Response from the delete scheduled SMS API
 */
export interface DeleteScheduledResponse {
  returnedCreditCount: number;
  smsCount: number;
}

/**
 * Creates a DeleteScheduled function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to delete scheduled SMS packs
 */
export const createDeleteScheduled = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  /**
   * Deletes a scheduled SMS pack and returns credits to your account
   *
   * @param packId - The pack identifier to delete
   * @returns Promise with returned credit count and SMS count
   */
  return async function deleteScheduled(packId: PackId) {
    return request<DeleteScheduledResponse>({
      input: `/v1/send/scheduled/${packId}`,
      init: {
        method: "DELETE",
      },
      apiKey,
    });
  };
};

