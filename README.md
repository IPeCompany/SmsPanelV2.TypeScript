# SMS.ir TypeScript SDK

Official TypeScript/JavaScript SDK for SMS.ir API - Send SMS, verification codes, and bulk messages with full TypeScript support.

[![npm version](https://img.shields.io/npm/v/sms-typescript.svg)](https://www.npmjs.com/package/sms-typescript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

## Features

✅ **Full TypeScript Support** - Complete type definitions for all APIs  
✅ **Multiple Module Formats** - Works with CommonJS, ES Modules, and TypeScript  
✅ **Modern & Legacy Support** - Class-based (v1.x compatible) and functional APIs  
✅ **Tree Shakeable** - Import only what you need  
✅ **Zero Dependencies** - Uses native fetch API (Node.js 18+)  
✅ **Comprehensive Documentation** - JSDoc comments for IntelliSense

## Installation

```bash
npm install sms-typescript
```

## Quick Start

### Class-Based API (Recommended for OOP)

```typescript
import { Smsir } from "sms-typescript";

const sms = new Smsir("your-api-key", 30007732000000);

// Send bulk SMS
const result = await sms.sendBulk("Hello!", ["09123456789"]);
console.log("Pack ID:", result.data.packId);

// Send verification code
await sms.sendVerifyCode("09123456789", 12345, [
  { name: "Code", value: "123456" },
]);

// Get account credit
const credit = await sms.getCredit();
console.log("Credit:", credit.data);
```

### Functional API (Recommended for Functional Programming)

```typescript
import { smsBuilder } from "sms-typescript";

const sms = smsBuilder({
  apiKey: "your-api-key",
  lineNumber: 30007732000000,
});

// Same methods as class-based API
const result = await sms.sendBulk("Hello!", ["09123456789"]);
```

**Note:** The functional API does not include deprecated v1.x methods.

### CommonJS (Node.js)

```javascript
// Class-based (backward compatible with v1.x)
const { Smsir } = require("sms-typescript");
const sms = new Smsir("your-api-key", 30007732000000);

// Functional
const smsBuilder = require("sms-typescript").default;
const sms = smsBuilder({ apiKey: "your-api-key", lineNumber: 30007732000000 });
```

## API Reference

### Send Methods

#### `sendBulk(messageText, mobiles, sendDateTime?, customLineNumber?)`

Send the same message to multiple recipients.

```typescript
const result = await sms.sendBulk(
  "Hello World!",
  ["09123456789", "09987654321"],
  Date.now() + 3600000, // Optional: schedule for 1 hour later
  30007732000000 // Optional: custom line number
);
```

#### `sendLikeToLike(messageTexts, mobiles, sendDateTime?, customLineNumber?)`

Send different messages to different recipients (1-to-1 pairing).

```typescript
await sms.sendLikeToLike(
  ["Hello Ali", "Hello Sara"],
  ["09121111111", "09122222222"]
);
```

#### `sendVerifyCode(mobile, templateId, parameters)`

Send verification code using a predefined template.

```typescript
await sms.sendVerifyCode("09123456789", 12345, [
  { name: "Code", value: "123456" },
  { name: "Name", value: "John" },
]);
```

#### `deleteScheduled(packId)`

Delete a scheduled SMS pack.

```typescript
await sms.deleteScheduled("pack-id-here");
```

#### `sendByURL(username, mobile, text, customLine?)`

Legacy URL-based sending method (for backward compatibility).

```typescript
await sms.sendByURL("username", "09123456789", "Hello World!");
```

### Report Methods

#### `reportMessage(messageId)`

Get delivery status of a specific message.

```typescript
const report = await sms.reportMessage("876240022");
console.log("Delivery State:", report.data.deliveryState);
```

#### `reportPackById(packId)`

Get all messages in a specific pack.

```typescript
const pack = await sms.reportPackById("pack-id");
```

#### `reportDailyPack(pageNumber, pageSize)`

Get daily pack statistics with pagination.

```typescript
const dailyPack = await sms.reportDailyPack(1, 10);
```

#### `reportTodayLive(pageNumber, pageSize)`

Get today's sent messages with pagination.

```typescript
const today = await sms.reportTodayLive(1, 10);
```

#### `reportArchive(fromDate, toDate, pageNumber, pageSize)`

Get archived sent messages within a date range.

```typescript
const archived = await sms.reportArchive(
  Date.now() - 86400000, // Yesterday
  Date.now(),
  1,
  10
);
```

#### `reportLatestReceive(count)`

Get latest received messages.

```typescript
const received = await sms.reportLatestReceive(100);
```

#### `reportReceiveLive(pageNumber, pageSize, sortByNewest)`

Get live received messages with pagination.

```typescript
const live = await sms.reportReceiveLive(1, 10, true);
```

#### `reportReceiveArchive(fromDate, toDate, pageNumber, pageSize)`

Get archived received messages.

```typescript
const archived = await sms.reportReceiveArchive(
  Date.now() - 86400000,
  Date.now(),
  1,
  10
);
```

### Settings Methods

#### `getCredit()`

Get current account credit balance.

```typescript
const credit = await sms.getCredit();
console.log("Credit:", credit.data);
```

#### `getLineNumbers()`

Get all available line numbers for your account.

```typescript
const lines = await sms.getLineNumbers();
console.log("Lines:", lines.data);
```

## Backward Compatibility (v1.x Deprecated Methods)

For users migrating from v1.x, all old method names are still supported via the class-based API:

### Deprecated Methods (Class-based API Only)

These methods are **deprecated** but still functional for backward compatibility. Use the new camelCase methods instead.

```typescript
// ⚠️ Deprecated - Use sendBulk() instead
await sms.SendBulk("message", ["09123456789"]);

// ⚠️ Deprecated - Use sendLikeToLike() instead
await sms.SendLikeToLike(["msg1", "msg2"], ["09121111111", "09122222222"]);

// ⚠️ Deprecated - Use sendVerifyCode() instead
await sms.SendVerifyCode("09123456789", 12345, [
  { name: "Code", value: "123456" },
]);

// ⚠️ Deprecated - Use reportMessage() instead
await sms.ReportMessage(876240022);

// ⚠️ Deprecated - Use reportPackById() instead
await sms.ReportPack("pack-id");

// ⚠️ Deprecated - Use reportTodayLive() instead
await sms.ReportToday(1, 10);

// ⚠️ Deprecated - Use reportArchive() instead
await sms.ReportArchived(fromDate, toDate, 1, 10);

// ⚠️ Deprecated - Use reportLatestReceive() instead
await sms.ReportLatestReceived(100);

// ⚠️ Deprecated - Use reportReceiveLive() instead
await sms.ReportTodayReceived(1, 10);

// ⚠️ Deprecated - Use reportReceiveArchive() instead
await sms.ReportArchivedReceived(fromDate, toDate, 1, 10);
```

**Note:** Deprecated methods are only available in the `Smsir` class, not in the functional `smsBuilder` API.

## Usage Examples

For detailed examples including Angular, React, Vue.js, and various use cases, see [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md).

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import {
  Smsir,
  SendBulkResponse,
  ResponseModel,
  SmsConfig,
} from "sms-typescript";

const config: SmsConfig = {
  apiKey: "your-api-key",
  lineNumber: 30007732000000,
};

const sms = new Smsir(config.apiKey, config.lineNumber);

const result: ResponseModel<SendBulkResponse> = await sms.sendBulk("Hello!", [
  "09123456789",
]);

// TypeScript knows the structure:
console.log(result.data.packId); // string
console.log(result.data.messageIds); // number[]
console.log(result.data.cost); // number
```

## Migration from v1.x

The SDK is fully backward compatible! Your existing code will continue to work:

```javascript
// v1.x code - Still works!
const { Smsir } = require("sms-typescript");
const sms = new Smsir("api-key", lineNumber);

// Old PascalCase methods still work (but are deprecated)
sms.SendBulk("Hello", ["09123456789"]).then((result) => console.log(result));

// New camelCase methods (recommended)
sms.sendBulk("Hello", ["09123456789"]).then((result) => console.log(result));
```

**Migration recommendations:**

1. ✅ Update to new camelCase method names (e.g., `SendBulk` → `sendBulk`)
2. ✅ Add TypeScript for better IDE support
3. ✅ Consider using the functional `smsBuilder` API for cleaner code
4. ⚠️ Old PascalCase methods will be removed in v3.0.0

## Requirements

- Node.js >= 18.0.0 (uses native `fetch` API)
- TypeScript >= 4.5 (if using TypeScript)

### Module System Support

- **CommonJS (require)**: ✅ Fully supported - works out of the box in Node.js
- **ES Modules (import)**: ⚠️ Requires a bundler (Webpack, Vite, Rollup, esbuild, etc.)
  - Direct Node.js ESM usage is not currently supported due to missing `.js` extensions
  - Works perfectly with any bundler or build tool
  - If you need native Node.js ESM support, please open an issue

**Recommendation:** Use CommonJS (require) for Node.js projects, or use a bundler for ESM projects.

## Framework Integration

### Angular

```typescript
import { Smsir } from "sms-typescript";

export class AppComponent implements OnInit {
  private smsService: Smsir;

  constructor() {
    this.smsService = new Smsir("your-api-key", 30007732000000);
  }

  async sendMessage() {
    const result = await this.smsService.sendBulk("Hello!", ["09123456789"]);
    console.log("Sent!", result.data.packId);
  }
}
```

### React

```typescript
import { Smsir } from "sms-typescript";

const sms = new Smsir("your-api-key", 30007732000000);

function MyComponent() {
  const handleSend = async () => {
    const result = await sms.sendBulk("Hello!", ["09123456789"]);
    console.log("Sent!", result.data);
  };

  return <button onClick={handleSend}>Send SMS</button>;
}
```

### Vue.js

```typescript
import { Smsir } from "sms-typescript";

export default {
  data() {
    return {
      sms: new Smsir("your-api-key", 30007732000000),
    };
  },
  methods: {
    async sendMessage() {
      const result = await this.sms.sendBulk("Hello!", ["09123456789"]);
      console.log("Sent!", result.data);
    },
  },
};
```

## Error Handling

All methods return promises. Handle errors appropriately:

```typescript
try {
  const result = await sms.sendBulk("Hello", ["09123456789"]);
  console.log("Success:", result.data);
} catch (error) {
  console.error("Error:", error.message);
  // Handle error (retry, show message to user, etc.)
}
```

## Contributing

We welcome contributions from the community! Whether you want to report a bug, suggest a feature, or submit code improvements, your help is appreciated.

### How to Contribute

- **Report Issues**: Found a bug or have a feature request? [Open an issue](https://github.com/IPeCompany/SmsPanelV2.TypeScript/issues) on GitHub
- **Submit Pull Requests**: Have a fix or improvement? [Create a pull request](https://github.com/IPeCompany/SmsPanelV2.TypeScript/pulls)
- **Improve Documentation**: Help us improve docs by suggesting edits or additions
- **Share Feedback**: Let us know how we can make this SDK better

### Guidelines

1. **Fork the repository** and create your branch from `main`
2. **Write clear commit messages** describing your changes
3. **Add tests** for new functionality when applicable
4. **Update documentation** if you're changing functionality
5. **Follow the existing code style** (TypeScript, JSDoc comments, etc.)

We review all contributions and will provide feedback. Thank you for helping make this SDK better!

## Credits

- [IPE Company](https://github.com/IPeCompany)
- [Hadi Zare Irani](https://gitlab.com/hadizare)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
