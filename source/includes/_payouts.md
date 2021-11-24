# Payouts

To make a payout to an Employee you need to create a Payout object. The Employee is notified of the Payout once the 
corresponding Invoice is paid. The Employee will need to sign and accept the Payout before it is disbursed to their
account.

### The Payout object

| Attribute          | Description                                                                       |
| --------------------------- | --------------------------------------------------------------------------------- |
| `id`                        | Unique identifier for the object.                                                                                                                                 |
| `amount`                    | Decimal formatted string of the gross amount.                                                                                                                     |
| `cost`                      | Decimal formatted string of the salary cost.                                                                                                                      |
| `country`                   | Country were task was performed.  ISO-3166 country code.                                                                                                          |
| `currency`                  | ISO-4217 currency code.                                                                                                                                           |
| `description`               | String describing the work done, displayed to the recipient.                                                                                                      |
| `full_salary_specification` | If True will a full salary specification be shown to the Employee, including payroll taxes and Gigapay's fee, in addition to the standard taxes and vacation pay. |
| `employee`                  | Unique identifier for the Employee object, that is the recipient of the Payout. This is an [expandable object.](../expanding.md)                                  |
| `invoice`                   | Unique identifier for the Invoice object the Payout object belongs to. This is an [expandable object.](../expanding.md)                                           |
| `invoiced_amount`           | Decimal formatted string of the invoiced amount.                                |
| `metadata`                  | JSON-encoded metadata.                                                                                                                                            |
| `start_at`                  | The time at which the gig will start. Displayed as ISO 8601 string.                                                                                               |
| `end_at`                    | The time at which the gig will end. Displayed as ISO 8601 string.                                                                                                 |
| `created_at`                | The time at which the Payout was created at. Displayed as ISO 8601 string.                                                                                        |
| `notified_at`               | The time at which the Employee was notified of the Payout. Displayed as ISO 8601 string.                                                                          |
| `accepted_at`               | The time at which the Employee accepted the Payout. Displayed as ISO 8601 string.                                                                                 |




## List All Payouts

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payouts/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/payouts/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/", {
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
    "previous": "https://api.gigapay.se/v2/payouts/?page=1",
    "results": [
        {
            "id": "0177270d-f94b-4ab9-88ba-ac1fa2f791aa",
            "amount": "100.00",
            "cost": "137.99",
            "country": "SWE",
            "currency": "SEK",
            "description": "Lön genom Gigapay",
            "employee": "1f1d1263-0e79-4787-b573-6df81b44bfc2",
            "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
            "metadata": {
                "job_id": 127
            },
            "start_at": null,
            "end_at": null,
            "created_at": "2019-05-22T10:32:38.118753Z",
            "notified_at": "2019-05-22T10:38:19.874623Z",
            "accepted_at": null
        }, {
            "id": "8a726186-a4e4-42e0-b56e-20fd17dc67ba",
            "amount": "10.00",
            "cost": "13.79",
            "country": "SWE",
            "currency": "SEK",
            "description": "Lön genom Gigapay",
            "employee": "1f1d1263-0e79-4787-b573-6df81b44bfc2",
            "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
            "metadata": {
              "job_id": 128
            },
            "start_at": "2019-05-22T08:00:00.000000Z",
            "end_at": "2019-05-22T17:00:00.000000Z",
            "created_at": "2019-05-23T10:32:38.118753Z",
            "notified_at": "2019-05-23T11:46:29.298742Z",
            "accepted_at": "2019-05-23T12:02:16.472846Z"
        }
    ]
}
```

This endpoint retrieves all webhooks.

### HTTP Request

`GET https://api.gigapay.se/v2/payouts/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
`page` | 1 | Which page to return.
`page_size` | 25 | The number of Employees per page.





## Register a Payout

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/payouts/',
    json={
        'id': 9472,
        'country': 'SWE',
        'currency': 'SEK',
        'description': 'Instagram samarbete 2021-11-13.',
        'full_salary_specification': True,
        'employee': 1847,
        'invoiced_amount': '1000.00',
        'metadata': {
            'campaign_id': 12394,
        },            
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12'  -d '{"id": 9472, "country": "SWE", "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "full_salary_specification": true, "employee": 1847, "invoiced_amount": "1000.00", "metadata": {"campaign_id": 12394}}' https://api.gigapay.se/v2/payouts/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/", {
    method: "POST",
    body: JSON.stringify({
        id: 9472,
        country: 'SWE',
        currency: 'SEK',
        description: 'Instagram samarbete 2021-11-13.',
        full_salary_specification: True,
        employee: 1847,
        invoiced_amount: '1000.00',
        metadata: {
            campaign_id: 12394,
        },            
    }),
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
    "id": "9472",
    "amount": "760.92",
    "cost": "1020.00",
    "country": "SWE",
    "currency": "SEK",
    "description": "Lön genom Gigapay",
    "employee": "1847",
    "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
    "invoiced_amount": "1000.00",
    "metadata": {
        "campaign_id": 12394
    },
    "start_at": null,
    "end_at": null,
    "created_at": "2019-05-23T10:32:38.118753Z",
    "notified_at": null,
    "accepted_at": null
}
```

This endpoint registers a payout.

### HTTP Request

`POST https://api.gigapay.se/v2/payouts/`

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
`amount` | String | False | | Decimal formatted string of the gross amount. Either `amount`, `invoiced_amount` or `cost` is required.
`cost` | String | False | | Decimal formatted string of the cost. Either `amount`, `invoiced_amount` or `cost` is required.
`currency` | String | True | | ISO-4217 currency code.
`description` | String | True | | ISO-4217 currency code.
`employee` | String | True | | 
`full_salary_specification` | Bool | False | False |
`invoiced_amount` | String | True | | Decimal formatted string of the invoiced_amount. Either `amount`, `invoiced_amount` or `cost` is required.
`metadata` | Object | False | | JSON-encoded metadata
`start_at` | String | False | | ISO 8601 string.
`end_at` | String | False | null | ISO 8601 string.




## Register multiple Payouts

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/payouts/',
    json=[
        {
            'id': 9472,
            'country': 'SWE',
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'full_salary_specification': True,
            'employee': 1847,
            'invoiced_amount': '1000.00',
            'metadata': {
                'campaign_id': 12394,
            },            
        }, {
            'id': 9473,
            'country': 'SWE',
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'full_salary_specification': True,
            'employee': 1736,
            'invoiced_amount': '2500.00',
            'metadata': {
                'campaign_id': 12395,
            },            
        },
    ],
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12' -d '[{"id": 9472, "country": "SWE", "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "full_salary_specification": true, "employee": 1847, "invoiced_amount": "1000.00", "metadata": {"campaign_id": 12394}}, {"id": 9473, "country": "SWE", "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "full_salary_specification": true, "employee": 1736, "invoiced_amount": "2500.00", "metadata": {"campaign_id": 12395}}]' https://api.gigapay.se/v2/payouts/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/", {
    method: "POST",
    body: JSON.stringify([
        {
            'id': 9472,
            'country': 'SWE',
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'full_salary_specification': True,
            'employee': 1847,
            'invoiced_amount': '1000.00',
            'metadata': {
                'campaign_id': 12394,
            },            
        }, {
            'id': 9473,
            'country': 'SWE',
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'full_salary_specification': True,
            'employee': 1736,
            'invoiced_amount': '2500.00',
            'metadata': {
                'campaign_id': 12395,
            },            
        },
    ]),
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Content-Type": "application/json",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns JSON structured like this:

```json
[
    {
        "id": "9472",
        "amount": "760.92",
        "cost": "1020.00",
        "country": "SWE",
        "currency": "SEK",
        "description": "Instagram samarbete 2021-11-13.",
        "employee": "1847",
        "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
        "invoiced_amount": "1000.00",
        "metadata": {
            "campaign_id": 12394
        },
        "start_at": null,
        "end_at": null,
        "created_at": "2019-05-23T10:32:38.118753Z",
        "notified_at": null,
        "accepted_at": null
    }, {
        "id": "9473",
        "amount": "1902.31",
        "cost": "2550.00",
        "country": "SWE",
        "currency": "SEK",
        "description": "Instagram samarbete 2021-11-13.",
        "employee": "1736",
        "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
        "invoiced_amount": "2500.00",
        "metadata": {
            "campaign_id": 12395
        },
        "start_at": null,
        "end_at": null,
        "created_at": "2019-05-23T10:32:38.118812Z",
        "notified_at": null,
        "accepted_at": null
    }
]
```

This endpoint registers multiple Payouts at once. All payouts will be added to the same Invoice object.

### HTTP Request

`POST https://api.gigapay.se/v2/payouts/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.
`Idempotency-key` | False | Idempotency key.

### Body Parameters

| Type | Required | Default | Description
| ---- | -------- | ------- |------------
| Array | True | | [payout object.](../expanding.md) 






## Register a Payout with an inline Employee

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/payouts/?expand=employee',
    json={
        'id': 9472,
        'country': 'SWE',
        'currency': 'SEK',
        'description': 'Instagram samarbete 2021-11-13.',
        'full_salary_specification': True,
        'employee': {
            'id': 1847,
            'name': 'Albin Lindskog',
            'cellphone_number': '+4670000001',
            'email': 'albin@mail.com',
            'country': 'SWE'
        },
        'invoiced_amount': '1000.00',
        'metadata': {
            'campaign_id': 12394,
        },            
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12' -d '{"id": 9472, "country": "SWE", "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "full_salary_specification": true, "employee": {"id": 1847, "name": "Albin Lindskog", "cellphone_number": "+4670000001", "email": "albin@mail.com", "country": "SWE"}, "invoiced_amount": "1000.00", "metadata": {"campaign_id": 12394}}' 'https://api.gigapay.se/v2/payouts/?expand=employee'
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/?expand=employee", {
    method: "POST",
    body: JSON.stringify({
        id: 9472,
        country: 'SWE',
        currency: 'SEK',
        description: 'Instagram samarbete 2021-11-13.',
        full_salary_specification: True,
        employee: {
            id: 1847,
            name: 'Albin Lindskog',
            cellphone_number: '+4670000001',
            email: 'albin@mail.com',
            country: 'SWE'
        },
        invoiced_amount: '1000.00',
        metadata: {
            campaign_id: 12394,
        },            
    }),
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
    "id": "9472",
    "amount": "760.92",
    "cost": "1020.00",
    "country": "SWE",
    "currency": "SEK",
    "description": "Instagram samarbete 2021-11-13.",
    "employee": {
        "id": "1847",
        "name": "Albin Lindskog",
        "email": "albin@mail.com",
        "cellphone_number": "+46700000001",
        "country": "SWE",
        "metadata": {},
        "created_at": "2019-05-22T10:32:36.118753Z",
        "notified_at": null,
        "claimed_at": null,
        "verified_at": null
    },
    "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
    "invoiced_amount": "1000.00",
    "metadata": {
        "campaign_id": 12394
    },
    "start_at": null,
    "end_at": null,
    "created_at": "2019-05-23T10:32:38.118753Z",
    "notified_at": null,
    "accepted_at": null
}
```

This endpoint registers a Payout and an Employee at the same time. If an Employee with matching information is already
registered will the object be reused.

### HTTP Request

`POST https://api.gigapay.se/v2/payouts/?expand=employee`

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
`amount` | String | False | | Decimal formatted string of the gross amount. Either `amount`, `invoiced_amount` or `cost` is required.
`cost` | String | False | | Decimal formatted string of the cost. Either `amount`, `invoiced_amount` or `cost` is required.
`currency` | String | True | | ISO-4217 currency code.
`description` | String | True | | ISO-4217 currency code.
`employee` | Object | True | Employee object as described here. | 
`full_salary_specification` | Bool | False | False |
`invoiced_amount` | String | True | | Decimal formatted string of the invoiced_amount. Either `amount`, `invoiced_amount` or `cost` is required.
`metadata` | Object | False | | JSON-encoded metadata
`start_at` | String | False | | ISO 8601 string.
`end_at` | String | False | null | ISO 8601 string.





## Retrieve a Payout

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payouts/9472/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/payouts/9472/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/9472/", {
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "9472",
    "amount": "760.92",
    "cost": "1020.00",
    "country": "SWE",
    "currency": "SEK",
    "description": "Lön genom Gigapay",
    "employee": "1847",
    "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
    "invoiced_amount": "1000.00",
    "metadata": {
        "campaign_id": 12394
    },
    "start_at": "2019-05-22T08:00:00.000000Z",
    "end_at": "2019-05-22T17:00:00.000000Z",
    "created_at": "2019-05-23T10:32:38.118753Z",
    "notified_at": "2019-05-23T11:46:29.298742Z",
    "accepted_at": "2019-05-23T12:02:16.472846Z"
}
```

This endpoint retrieves a payout.

### HTTP Request

`GET https://api.gigapay.se/v2/payouts/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.





## Delete a Payout

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/payouts/9472/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/payouts/9472/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/9472/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns an empty response.


Endpoint for deleting a specific Payout. Note that you can not delete a payout belonging to a paid Invoice.

### HTTP Request

`DELETE https://api.gigapay.se/v2/payouts/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.




## Resend a Notification

```python
import requests

response = requests.put(
    'https://api.gigapay.se/v2/payouts/9472/resend/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X PUT -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/payouts/9472/resend/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/9472/resend/", {
    method: "PUT",
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns an empty response.


This endpoint resends a notification.

### HTTP Request

`PUT https://api.gigapay.se/v2/payouts/:id/resend/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.
