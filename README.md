# sms.ir

sms.ir typescript package

## Installation

```javascript
npm i sms-type
```

- Angular, etc
```javascript
import {Smsir} from 'sms-type/lib';

export class AppComponent implements OnInit{

  smsWebService!: any;
  constructor() {
    this.smsWebService = new Smsir(
      'Access_key', // string
      'Line_number' // number
    )
  }

}
```

### Send Bulk
Send message to multiple mobile numbers

```javascript
this.smsWebService.SendBulk(MessageText: string, Mobiles: string[], SendDateTime: number|null, line_number: number|null);
```

### Send Like To Like
Send multiple messages to multiple mobile numbers pair to pair

```javascript
smsir.SendLikeToLike(MessageText: string[], Mobiles: string[], SendDateTime: number|null, line_number: number|null)
```

### Delete Scheduled
Delete scheduled message pack

```javascript
smsir.deleteScheduled(PackId: string)
```

### Send Verification Code
Send verification code with predefined template

```javascript
smsir.SendVerifyCode(Mobile: string, TemplateId: number, Parameters: { name: string; value: string }[])
```

### Message Report
get report of sent message

```javascript
smsir.ReportMessage(MessageId: number)
```

### Pack Report
get report of sent message pack

```javascript
smsir.ReportPack(PackId: string)
```

### Today Report
get report of Today sent Messages

```javascript
smsir.ReportToday(pageSize: number = 10, pageNumber: number = 1)
```

### Archived Report
get report of Archived Messages

```javascript
smsir.ReportArchived(fromDate: number|null, toDate: number|null, pageSize: number = 10, pageNumber: number = 1)
```

### Latest Received Report
get report of latest received messages

```javascript
smsir.ReportLatestReceived(count: number = 100)
```

### Today Received Report
get report of today received messages

```javascript
smsir.ReportTodayReceived(pageSize: number = 10, pageNumber: number = 1)
```

### Archived Received Report
get report of today received messages

```javascript
smsir.ReportArchivedReceived(fromDate: number|null, toDate: number|null, pageSize: number = 10, pageNumber: number = 1)
```


### Get Credit
get account credit

```javascript
smsir.getCredit()
```

### Get Line Numbers
get account line numbers

```javascript
smsir.getLineNumbers()
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Credits

-   [Hadi Zare Irani](https://gitlab.com/hadizare)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.