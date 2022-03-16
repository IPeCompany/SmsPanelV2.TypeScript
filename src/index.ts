import axios from 'axios';
const ENDPOINT = 'https://api.sms.ir';
let SMSIR_API_KEY = '';
let mainLineNumber!: number;

export class Smsir {
  constructor(apikey: string, linenumber: number) {
    SMSIR_API_KEY = apikey;
    mainLineNumber = linenumber;
  }

  async SendBulk(
    MessageText: string,
    Mobiles: string[],
    SendDateTime: number | null = null,
    lineNumber: number | null = null,
  ) {
    return axios({
      method: 'POST',
      url: `${ENDPOINT}/v1/send/bulk`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        lineNumber: lineNumber ? lineNumber : mainLineNumber,
        MessageText,
        Mobiles,
        SendDateTime,
      },
    });
  }

  async SendLikeToLike(
    MessageTexts: string[],
    Mobiles: string[],
    SendDateTime: number | null = null,
    lineNumber: number | null = null,
  ) {
    return axios({
      method: 'POST',
      url: `${ENDPOINT}/v1/send/liketolike`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        lineNumber: lineNumber ? lineNumber : mainLineNumber,
        MessageTexts,
        Mobiles,
        SendDateTime,
      },
    });
  }
  async deleteScheduled(PackId: string) {
    return axios({
      method: 'DELETE',
      url: `${ENDPOINT}/v1/send/scheduled/${PackId}`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async SendVerifyCode(Mobile: string, TemplateId: number, Parameters: { name: string; value: string }[]) {
    return axios({
      method: 'POST',
      url: `${ENDPOINT}/v1/send/verify/`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        Mobile,
        TemplateId,
        Parameters,
      },
    });
  }

  async ReportMessage(MessageId: number) {
    return axios({
      method: 'GET',
      url: `${ENDPOINT}/v1/send/${MessageId}`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async ReportPack(PackId: string) {
    return axios({
      method: 'GET',
      url: `${ENDPOINT}/v1/send/pack/${PackId}`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async ReportToday(pageSize: number = 10, pageNumber: number = 1) {
    return axios({
      method: 'GET',
      url: `${ENDPOINT}/v1/send/live/`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        pageSize,
        pageNumber,
      },
    });
  }

  async ReportArchived(
    fromDate: number | null = null,
    toDate: number | null = null,
    pageSize: number = 10,
    pageNumber: number = 1,
  ) {
    return axios({
      method: 'GET',
      url: `${ENDPOINT}/v1/send/archive/`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        fromDate,
        toDate,
        pageSize,
        pageNumber,
      },
    });
  }

  async ReportLatestReceived(count: number = 100) {
    return axios({
      method: 'GET',
      url: `${ENDPOINT}/v1/receive/latest`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        count,
      },
    });
  }

  async ReportTodayReceived(pageSize: number = 10, pageNumber: number = 1) {
    return axios({
      method: 'GET',
      url: `${ENDPOINT}/v1/receive/live`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        pageSize,
        pageNumber,
      },
    });
  }

  async ReportArchivedReceived(
    fromDate: number | null = null,
    toDate: number | null = null,
    pageSize: number = 10,
    pageNumber: number = 1,
  ) {
    return axios({
      method: 'GET',
      url: `${ENDPOINT}/v1/receive/archive`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        fromDate,
        toDate,
        pageSize,
        pageNumber,
      },
    });
  }

  async getCredit() {
    return axios({
      method: 'GET',
      url: `${ENDPOINT}/v1/credit`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async getLineNumbers() {
    return axios({
      method: 'GET',
      url: `${ENDPOINT}/v1/line`,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}
