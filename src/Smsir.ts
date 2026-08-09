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

/**
 * SMS.ir API Client Class
 * 
 * A class-based interface for interacting with the SMS.ir API.
 * Provides methods for sending SMS messages, retrieving reports, and managing account settings.
 * 
 * @example
 * ```typescript
 * const smsClient = new Smsir("your-api-key", 30007732000000);
 * const result = await smsClient.sendBulk("Hello!", ["09123456789"]);
 * ```
 */
export class Smsir {
  private apiKey: string;
  private lineNumber: number;

  /**
   * Creates a new SMS.ir API client instance
   * 
   * @param apiKey - Your SMS.ir API key for authentication
   * @param lineNumber - Your default line number for sending messages
   */
  constructor(apiKey: string, lineNumber: number) {
    this.apiKey = apiKey;
    this.lineNumber = lineNumber;
  }

  /**
   * Sends a bulk SMS message to multiple recipients
   * 
   * @param messageText - The text message to send
   * @param mobiles - Array of mobile numbers
   * @param sendDateTime - Optional Unix timestamp for scheduled sending
   * @param customLineNumber - Optional custom line number to override the default
   * @returns Promise with packId, messageIds, and cost
   */
  sendBulk(messageText: string, mobiles: string[], sendDateTime?: number, customLineNumber?: number) {
    return createSendBulk({ apiKey: this.apiKey, lineNumber: this.lineNumber })(messageText, mobiles, sendDateTime, customLineNumber);
  }

  /**
   * Sends multiple different messages to multiple recipients in pairs (1-to-1 mapping)
   * 
   * @param messageTexts - Array of messages (must match length of mobiles array)
   * @param mobiles - Array of mobile numbers (must match length of messageTexts array)
   * @param sendDateTime - Optional Unix timestamp for scheduled sending
   * @param customLineNumber - Optional custom line number
   * @returns Promise with packId, messageIds, and cost
   */
  sendLikeToLike(messageTexts: string[], mobiles: string[], sendDateTime?: number, customLineNumber?: number) {
    return createSendLikeToLike({ apiKey: this.apiKey, lineNumber: this.lineNumber })(messageTexts, mobiles, sendDateTime, customLineNumber);
  }

  /**
   * Deletes a scheduled SMS pack
   * 
   * @param packId - The pack identifier to delete
   * @returns Promise with returnedCreditCount and smsCount
   */
  deleteScheduled(packId: string) {
    return createDeleteScheduled({ apiKey: this.apiKey })(packId);
  }

  /**
   * Sends a verification code SMS using a predefined template
   * 
   * @param mobile - Recipient's mobile number
   * @param templateId - Template ID from your SMS.ir panel
   * @param parameters - Array of {name, value} pairs to fill template placeholders
   * @returns Promise with messageId and cost
   */
  sendVerifyCode(mobile: string, templateId: number, parameters: Array<{ name: string; value: string }>) {
    return createSendVerifyCode({ apiKey: this.apiKey })(mobile, templateId, parameters);
  }

  /**
   * Sends SMS using URL query parameters (legacy method)
   * 
   * @param username - Your SMS.ir panel username
   * @param mobile - Recipient's mobile number
   * @param text - The message text to send
   * @param customLine - Optional custom line number
   * @returns Promise with messageId and cost
   */
  sendByURL(username: string, mobile: string, text: string, customLine?: number) {
    return createSendByURL({ apiKey: this.apiKey, lineNumber: this.lineNumber })(username, mobile, text, customLine);
  }

  /**
   * Gets the delivery status and details of a sent message
   * 
   * @param messageId - The message ID to get report for
   * @returns Promise with message details
   */
  reportMessage(messageId: number) {
    return createReportMessage({ apiKey: this.apiKey })(messageId);
  }

  /**
   * Retrieves daily SMS pack reports with pagination
   * 
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of daily pack reports
   */
  reportDailyPack(pageNumber: number, pageSize: number) {
    return createReportDailyPack({ apiKey: this.apiKey })(pageNumber, pageSize);
  }

  /**
   * Retrieves all messages in a specific SMS pack
   * 
   * @param packId - The pack identifier to retrieve messages for
   * @returns Promise with array of messages in the pack
   */
  reportPackById(packId: string) {
    return createReportPackById({ apiKey: this.apiKey })(packId);
  }

  /**
   * Retrieves today's sent SMS messages with live status
   * 
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of today's sent messages
   */
  reportTodayLive(pageNumber: number, pageSize: number) {
    return createReportTodayLive({ apiKey: this.apiKey })(pageNumber, pageSize);
  }

  /**
   * Retrieves the latest received SMS messages
   * 
   * @param count - Number of messages to retrieve
   * @returns Promise with array of latest received messages
   */
  reportLatestReceive(count: number) {
    return createReportLatestReceive({ apiKey: this.apiKey })(count);
  }

  /**
   * Retrieves archived SMS messages within a date range
   * 
   * @param fromDate - Start date (Unix timestamp)
   * @param toDate - End date (Unix timestamp)
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of archived message reports
   */
  reportArchive(fromDate: number, toDate: number, pageNumber: number, pageSize: number) {
    return createReportArchive({ apiKey: this.apiKey })(fromDate, toDate, pageNumber, pageSize);
  }

  /**
   * Retrieves live received SMS messages with pagination
   * 
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @param sortByNewest - Sort by newest messages first
   * @returns Promise with array of live received messages
   */
  reportReceiveLive(pageNumber: number, pageSize: number, sortByNewest: boolean) {
    return createReportReceiveLive({ apiKey: this.apiKey })(pageNumber, pageSize, sortByNewest);
  }

  /**
   * Retrieves archived received SMS messages within a date range
   * 
   * @param fromDate - Start date (Unix timestamp)
   * @param toDate - End date (Unix timestamp)
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of archived received messages
   */
  reportReceiveArchive(fromDate: number, toDate: number, pageNumber: number, pageSize: number) {
    return createReportReceiveArchive({ apiKey: this.apiKey })(fromDate, toDate, pageNumber, pageSize);
  }

  /**
   * Retrieves the current account credit balance
   * 
   * @returns Promise with the credit amount
   */
  getCredit() {
    return createGetCredit({ apiKey: this.apiKey })();
  }

  /**
   * Retrieves all available line numbers for the account
   * 
   * @returns Promise with array of line numbers
   */
  getLineNumbers() {
    return createGetLineNumbers({ apiKey: this.apiKey })();
  }

  /**
   * @deprecated Use sendBulk instead. Provided for backward compatibility with v1.x
   * @param MessageText - The text message to send
   * @param Mobiles - Array of mobile numbers
   * @param SendDateTime - Optional Unix timestamp for scheduled sending
   * @param lineNumber - Optional custom line number
   */
  SendBulk(MessageText: string, Mobiles: string[], SendDateTime?: number, lineNumber?: number) {
    return this.sendBulk(MessageText, Mobiles, SendDateTime, lineNumber);
  }

  /**
   * @deprecated Use sendLikeToLike instead. Provided for backward compatibility with v1.x
   * @param MessageTexts - Array of messages
   * @param Mobiles - Array of mobile numbers
   * @param SendDateTime - Optional Unix timestamp for scheduled sending
   * @param lineNumber - Optional custom line number
   */
  SendLikeToLike(MessageTexts: string[], Mobiles: string[], SendDateTime?: number, lineNumber?: number) {
    return this.sendLikeToLike(MessageTexts, Mobiles, SendDateTime, lineNumber);
  }

  /**
   * @deprecated Use sendVerifyCode instead. Provided for backward compatibility with v1.x
   * @param Mobile - Recipient's mobile number
   * @param TemplateId - Template ID from SMS.ir panel
   * @param Parameters - Array of {name, value} pairs
   */
  SendVerifyCode(Mobile: string, TemplateId: number, Parameters: Array<{ name: string; value: string }>) {
    return this.sendVerifyCode(Mobile, TemplateId, Parameters);
  }

  /**
   * @deprecated Use reportMessage instead. Provided for backward compatibility with v1.x
   * @param MessageId - The message ID to get report for
   */
  ReportMessage(MessageId: number) {
    return this.reportMessage(MessageId);
  }

  /**
   * @deprecated Use reportPackById instead. Provided for backward compatibility with v1.x
   * @param PackId - The pack identifier
   */
  ReportPack(PackId: string) {
    return this.reportPackById(PackId);
  }

  /**
   * @deprecated Use reportTodayLive instead. Provided for backward compatibility with v1.x
   * @param pageSize - Number of items per page
   * @param pageNumber - Page number for pagination
   */
  ReportToday(pageSize: number = 10, pageNumber: number = 1) {
    return this.reportTodayLive(pageNumber, pageSize);
  }

  /**
   * @deprecated Use reportArchive instead. Provided for backward compatibility with v1.x
   * @param fromDate - Start date (Unix timestamp)
   * @param toDate - End date (Unix timestamp)
   * @param pageSize - Number of items per page
   * @param pageNumber - Page number for pagination
   */
  ReportArchived(fromDate: number = 0, toDate: number = 0, pageSize: number = 10, pageNumber: number = 1) {
    return this.reportArchive(fromDate, toDate, pageNumber, pageSize);
  }

  /**
   * @deprecated Use reportLatestReceive instead. Provided for backward compatibility with v1.x
   * @param count - Number of messages to retrieve
   */
  ReportLatestReceived(count: number = 100) {
    return this.reportLatestReceive(count);
  }

  /**
   * @deprecated Use reportReceiveLive instead. Provided for backward compatibility with v1.x
   * @param pageSize - Number of items per page
   * @param pageNumber - Page number for pagination
   */
  ReportTodayReceived(pageSize: number = 10, pageNumber: number = 1) {
    return this.reportReceiveLive(pageNumber, pageSize, true);
  }

  /**
   * @deprecated Use reportReceiveArchive instead. Provided for backward compatibility with v1.x
   * @param fromDate - Start date (Unix timestamp)
   * @param toDate - End date (Unix timestamp)
   * @param pageSize - Number of items per page
   * @param pageNumber - Page number for pagination
   */
  ReportArchivedReceived(fromDate: number = 0, toDate: number = 0, pageSize: number = 10, pageNumber: number = 1) {
    return this.reportReceiveArchive(fromDate, toDate, pageNumber, pageSize);
  }
}
