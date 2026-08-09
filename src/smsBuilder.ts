import {
  createDeleteScheduled,
  createSendBulk,
  createSendByURL,
  createSendLikeToLike,
  createSendVerifyCode,
} from "./send/index.js";
import {
  createReportMessage,
  createReportDailyPack,
  createReportPackById,
  createReportTodayLive,
  createReportLatestReceive,
  createReportArchive,
  createReportReceiveLive,
  createReportReceiveArchive,
} from "./report/index.js";
import { createGetCredit, createGetLineNumbers } from "./settings/index.js";
import { SmsConfig } from "./utils/index.js";

/**
 * Creates an SMS client with all available SMS.ir API methods
 *
 * @param configs - Configuration object containing apiKey and lineNumber
 * @returns Object with all SMS operations (send, report, settings)
 *
 * @example
 * ```typescript
 * const sms = smsBuilder({
 *   apiKey: "your-api-key",
 *   lineNumber: 30007732000000
 * });
 *
 * await sms.sendBulk("Hello!", ["09123456789"]);
 * const credit = await sms.getCredit();
 * ```
 */
export function smsBuilder(configs: SmsConfig) {
  return {
    sendBulk: createSendBulk(configs),
    sendLikeToLike: createSendLikeToLike(configs),
    deleteScheduled: createDeleteScheduled({ apiKey: configs.apiKey }),
    sendVerifyCode: createSendVerifyCode({ apiKey: configs.apiKey }),
    sendByURL: createSendByURL(configs),
    reportMessage: createReportMessage({ apiKey: configs.apiKey }),
    reportDailyPack: createReportDailyPack({ apiKey: configs.apiKey }),
    reportPackById: createReportPackById({ apiKey: configs.apiKey }),
    reportTodayLive: createReportTodayLive({ apiKey: configs.apiKey }),
    reportLatestReceive: createReportLatestReceive({ apiKey: configs.apiKey }),
    reportArchive: createReportArchive({ apiKey: configs.apiKey }),
    reportReceiveLive: createReportReceiveLive({ apiKey: configs.apiKey }),
    reportReceiveArchive: createReportReceiveArchive({ apiKey: configs.apiKey }),
    getCredit: createGetCredit({ apiKey: configs.apiKey }),
    getLineNumbers: createGetLineNumbers({ apiKey: configs.apiKey }),
  };
}
