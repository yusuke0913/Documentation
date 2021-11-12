# Webhooks

Webhooks allows you to receive real-time status updates any time an event happens on your account. For a complete
description of these notifications, see [Webhooks](../webhooks.md).

### The Webhook object

| Attribute    | Description                                        |
| ------------ | -------------------------------------------------- |
| `id`         | Unique identifier for the object.                  |
| `url`        | URL to which the notifications are posted.         |
| `events`     | List of events to subscribe to.                    |
| `secret_key` | Secret key used to sign the Webhook notifications. |
| `metadata`   | JSON-encoded metadata.                             |



## List All Registered Webhooks

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get()
```

```shell
curl "http://example.com/api/kittens" \
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let kittens = api.kittens.get();
```

> The above command returns JSON structured like this:

```json
{
    "count": 4,
    "next": null,
    "previous": "https://api.gigapay.se/v2/webhooks/?page=2",
    "results": [
        {
            "id": "38a93e19-886a-4246-9cfe-471214ff6739",
            "url": "https://gigatron.se/webhooks/payouts/",
            "events": ["Payout.notified", "Payout.accepted"],
            "secret_key": "c1329a085d65f7757838df5920fdcc9a",
            "metadata": {}
        }, {
            "id": "0630bfcf-ad0a-458a-9794-816b54b542b6",
            "url": "https://gigatron.se/webhooks/employees/",
            "events": ["Employee.verified"],
            "secret_key": "1fc0ee40ecf33f83cbd3f930443074ca",
            "metadata": {}
        }
    ]
}
```

This endpoint retrieves all webhooks.

### HTTP Request

`GET https://api.gigapay.se/v2/webhooks/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
Authorization | false | Your Authorization Token.
Integration-ID | true | Integration-ID.


### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
page | 1 | Which page to return.
page_size | 25 | The number of Webhooks per page.
