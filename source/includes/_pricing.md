# Pricing

The Pricing endpoint allows you to calculate the price of payout you would like to make, and to retrieve the price
information about previously made payouts. The endpoint is designed to mirror the Payouts endpoint as closely as
possible, e.g. the same request can be used to retrieve the price information of a Payout you'd like to make and to
actually make it.

### The Pricing breakdown

| Attribute         | Description                                                                       |
| ----------------- | --------------------------------------------------------------------------------- |
| amount            | Decimal formatted string of the gross amount.                                                                        |
| cost              | Decimal formatted string of the salary cost.                                                                         |
| currency          | ISO-4217 currency code.                                                                                              |
| fee               | Decimal formatted string of Gigapay's fee for this Payout.                                                           |
| health_insurance  | Decimal formatted string of the cost of mandated health insurance. Will be none if health insurance is not mandated. |
| payroll           | Decimal formatted string of the payroll taxes.                                                                       |
| pension           | Decimal formatted string of the cost of mandated pension. Will be none if pension is not mandated.                   |
| tax               | Decimal formatted string of the preliminary income taxes the will be reported and paid on behalf of the recipient.   |
| vat               | Decimal formatted string of the VAT for the Payout. 


## List Pricing info

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/pricing/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/pricing/
```

```javascript
fetch("https://api.gigapay.se/v2/pricing/", {
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
    "previous": "https://api.gigapay.se/v2/pricing/?page=1",
    "results": [
				{
					"amount": "1000.00",
					"cost": "1379.91",
					"currency": "SEK",
					"fee": "65.71",
					"health_insurance": null,
          "invoiced_amount": "1314.20",
					"payroll": "314.20",
					"pension": null,
					"tax": "300.00",
					"vat": "344.97"
				}, {
					"amount": "3000.00",
					"cost": "4139.73",
					"currency": "SEK",
					"fee": "197.13",
					"health_insurance": null,
          "invoiced_amount": "3942.60",
					"payroll": "942.60",
					"pension": null,
					"tax": "900.00",
					"vat": "1034.93"
				}
			]
}
```

List Pricing info for past Payouts.

### HTTP Request

`GET https://api.gigapay.se/v2/pricing/`

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





## Calculate Pricing info

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/pricing/',
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
curl -X POST -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12'  -d '{"id": 9472, "country": "SWE", "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "full_salary_specification": true, "employee": 1847, "invoiced_amount": "1000.00", "metadata": {"campaign_id": 12394}}' https://api.gigapay.se/v2/pricing/
```

```javascript
fetch("https://api.gigapay.se/v2/pricing/", {
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
    "amount": "760.92",
    "cost": "1020.00",
    "currency": "SEK",
    "fee": "20.00",
    "health_insurance": null,
    "invoiced_amount": "1000.00",
    "payroll": "239.18",
    "pension": null,
    "tax": "228.28",
    "vat": "255.00"
}
```

This endpoint allows you to calculate the price of payout you would like to make.

### HTTP Request

`POST https://api.gigapay.se/v2/pricing/`

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




## Calculate bulk pricing info

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
        "amount": "760.92",
        "cost": "1020.00",
        "currency": "SEK",
        "fee": "20.00",
        "health_insurance": null,
        "invoiced_amount": "1000.00",
        "payroll": "239.18",
        "pension": null,
        "tax": "228.28",
        "vat": "255.00"
    }, {
        "amount": "1902.30",
        "cost": "2550.00",
        "currency": "SEK",
        "fee": "50.00",
        "health_insurance": null,
        "invoiced_amount": "2500.00",
        "payroll": "597.95",
        "pension": null,
        "tax": "570.70",
        "vat": "637.50"
    }
]
```

The same endpoint is used to calculate the pricing info for multiple Payouts at once.

### HTTP Request

`POST https://api.gigapay.se/v2/pricing/`

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






## Calculate Pricing info with an inline Employee

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/pricing/?expand=employee',
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
curl -X POST -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12' -d '{"id": 9472, "country": "SWE", "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "full_salary_specification": true, "employee": {"id": 1847, "name": "Albin Lindskog", "cellphone_number": "+4670000001", "email": "albin@mail.com", "country": "SWE"}, "invoiced_amount": "1000.00", "metadata": {"campaign_id": 12394}}' 'https://api.gigapay.se/v2/pricing/?expand=employee'
```

```javascript
fetch("https://api.gigapay.se/v2/pricing/?expand=employee", {
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
    "amount": "760.92",
    "cost": "1020.00",
    "currency": "SEK",
    "fee": "20.00",
    "health_insurance": null,
    "invoiced_amount": "1000.00",
    "payroll": "239.18",
    "pension": null,
    "tax": "228.28",
    "vat": "255.00"
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





## Retrieve Pricing info of Payout

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/pricing/9472/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/pricing/9472/
```

```javascript
fetch("https://api.gigapay.se/v2/pricing/9472/", {
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "amount": "760.92",
    "cost": "1020.00",
    "currency": "SEK",
    "fee": "20.00",
    "health_insurance": null,
    "invoiced_amount": "1000.00",
    "payroll": "239.18",
    "pension": null,
    "tax": "228.28",
    "vat": "255.00"
}
```

This endpoint retrieves a payout.

### HTTP Request

`GET https://api.gigapay.se/v2/pricing/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the Payout object.
