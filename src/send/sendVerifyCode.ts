import { Parameters, request, ResponseModel, SmsConfig } from "../utils/index.js";

/**
 * Request body for sending verification code SMS
 */
export interface SendVerifyCodeBody {
  mobile: string;
  templateId: number;
  parameters: Array<Parameters>;
}

/**
 * Response from the send verification code API
 */
export interface SendVerifyCodeResponse {
  messageId: number;
  cost: number;
}

/**
 * Creates a SendVerifyCode function with pre-configured API credentials
 *
 * @param apiKey - SMS.ir API key for authentication
 * @returns A function to send verification code SMS messages
 */
export const createSendVerifyCode = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  /**
   * Sends a verification code SMS using a predefined template
   *
   * Templates are created in the SMS.ir panel with placeholders for dynamic values.
   *
   * @param mobile - Recipient's mobile number (e.g., "09123456789")
   * @param templateId - Template ID from your SMS.ir panel
   * @param parameters - Array of {name, value} pairs to fill template placeholders
   * @returns Promise with messageId and cost
   */
  return async function sendVerifyCode(
    mobile: string,
    templateId: number,
    parameters: Array<Parameters>
  ): Promise<ResponseModel<SendVerifyCodeResponse>> {
    return request<SendVerifyCodeResponse>({
      input: "/v1/send/verify/",
      init: {
        method: "POST",
        body: {
          mobile,
          templateId,
          parameters,
        } as SendVerifyCodeBody,
      },
      apiKey,
    });
  };
};

