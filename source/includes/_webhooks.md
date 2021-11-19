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
import requests

response = requests.get(
    'https://api.gigapay.se/v2/webhooks/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/webhooks/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/", {
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    }
})
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
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
`page` | 1 | Which page to return.
`page_size` | 25 | The number of Webhooks per page.





## Register a Webhook

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/webhooks/',
    json={
        'url': 'https://gigatron.se/webhooks/payouts/', 
        'events': ['Payout.created']
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12' -d '{"url": "http://0.0.0.0:8000/", "events": ["Payout.created"]}' https://gigatron.se/webhooks/payouts/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/", {
    method: "POST",
    body: JSON.stringify({url: "https://gigatron.se/webhooks/payouts/", events: ["Payout.created"]}),
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    },
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "38a93e19-886a-4246-9cfe-471214ff6739",
    "url": "https://gigatron.se/webhooks/payouts/",
    "events": ["Payout.created"],
    "secret_key": "c1329a085d65f7757838df5920fdcc9a",
    "metadata": {}
}
```

This endpoint creates a webhooks.

### HTTP Request

`POST https://api.gigapay.se/v2/webhooks/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.
`Idempotency-key` | False | Idempotency key.

### Body Parameters

Parameter | Type | Required | Default | Description
--------- | ---- | -------- | ------- |------------
`id` | String | False | uuid4() | Unique identifier for the object.
`url` | URL | True |  | URL to which the notifications are posted.
`events` | String[] | True | | List of events to subscribe to.
`secret_key` | String | False | 32 char | Secret key used to sign the Webhook notifications.
`metadata` | Object | False | {} | JSON-encoded metadata.





## Retrieve a Webhook

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/webhooks/481272/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/webhooks/481272/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/481272/", {
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "38a93e19-886a-4246-9cfe-471214ff6739",
    "url": "https://gigatron.se/webhooks/payouts/",
    "events": ["Payout.created"],
    "secret_key": "c1329a085d65f7757838df5920fdcc9a",
    "metadata": {}
}
```

This endpoint retrieves a webhooks.

### HTTP Request

`GET https://api.gigapay.se/v2/webhooks/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.






## Update a Webhook

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/webhooks/481272/',
    json={
        'events': ['Payout.created', 'Payout.notified']
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X PATCH -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12' -d '{"events": ["Payout.created", "Payout.notified"]}' https://api.gigapay.se/v2/webhooks/481272/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/481272/", {
    method: "PATCH",
    body: JSON.stringify({events: ["Payout.created", "Payout.notified"]}),
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Content-Type": "application/json",
        "Integration-Id": "aqdnkjasdo12"
    },
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "481272",
    "url": "https://gigatron.se/webhooks/payouts/",
    "events": ["Payout.created", "Payout.notified"],
    "secret_key": "c1329a085d65f7757838df5920fdcc9a",
    "metadata": {}
}
```

This endpoint creates a webhooks.

### HTTP Request

`PATCH https://api.gigapay.se/v2/webhooks/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.

### Body Parameters

Parameter | Type | Required | Default | Description
--------- | ---- | -------- | ------- |------------
`id` | String | False | Previous value | Unique identifier for the object.
`url` | URL | False | Previous value | URL to which the notifications are posted.
`events` | String[] | False | Previous value | List of events to subscribe to.
`secret_key` | String | False |Previous value | Secret key used to sign the Webhook notifications.
`metadata` | Object | False | Previous value | JSON-encoded metadata.




## Replace a Webhook

```python
import requests

response = requests.put(
    'https://api.gigapay.se/v2/webhooks/481272/',
    json={
        'url': 'https://gigatron.se/webhooks/invoiced/', 
        'events': ['Invoice.created']
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X PUT -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12' -d '{"url": "https://gigatron.se/webhooks/invoiced/", "events": ["Invoice.created"]}' https://api.gigapay.se/v2/webhooks/481272/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/481272/", {
    method: "PUT",
    body: JSON.stringify({url: "https://gigatron.se/webhooks/invoiced/", events: ["Invoice.created"]}),
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Content-Type": "application/json",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "481272",
    "url": "https://gigatron.se/webhooks/invoices/",
    "events": ["Invoice.created"],
    "secret_key": "vksnrsc6tamq73tc26rzrnzf33a4pgdv",
    "metadata": {}
}
```

This endpoint replaces a webhooks.

### HTTP Request

`PUT https://api.gigapay.se/v2/webhooks/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.

### Body Parameters

Parameter | Type | Required | Default | Description
--------- | ---- | -------- | ------- |------------
`id` | String | False | uuid4() | Unique identifier for the object.
`url` | URL | True |  | URL to which the notifications are posted.
`events` | String[] | True | | List of events to subscribe to.
`secret_key` | String | False | 32 char | Secret key used to sign the Webhook notifications.
`metadata` | Object | False | {} | JSON-encoded metadata.





## Delete a Webhook

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/webhooks/481272/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/webhooks/481272/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/481272/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns an empty response.


This endpoint deletes a webhooks.

### HTTP Request

`DELETE https://api.gigapay.se/v2/webhooks/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.
