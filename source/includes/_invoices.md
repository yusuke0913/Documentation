# Invoices

An Invoice groups Payouts together. It is a managed object, you can not create them directly. When a Payout is created 
it is added to the Invoice that is currently open. If there is not an open Invoice, a new, open, Invoice is created.

### The Webhook object

| Attribute    | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| `created_at` | Time at which the Invoice was created. Displayed as ISO 8601 string. |
| `currency`   | ISO-4217 currency code.                                              |
| `id`         | A unique identifier for the object.                                  |
| `metadata`   | JSON-encoded metadata.                                               |
| `ocr_number` | Bank reference.                                                      |
| `open`       | Whether the Invoice is the currently open one.                       |
| `paid_at`    | Time at which the Invoice was paid. Displayed as ISO 8601 string.    |
| `pdf`        | Link to download a pdf version of the Invoice.                       |
| `price`      | Decimal formatted string of the price.                               |





## List All Invoices

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/invoices/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/invoices/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/", {
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
    "previous": "https://api.gigapay.se/v2/invoices/?page=1",
    "results": [
        {
            "created_at": "2019-05-22T10:32:36.118753Z",
            "currency": "SEK",
            "id": "2859272",
            "metadata": {},
            "ocr_number": "986911160380",
            "open": false,
            "paid_at": "2019-05-25T9:02:16.8462735Z",
            "pdf": "https://api.gigapay.se/invoice/2859272/?token=Ii9pbnZvaWNlLzNjYmRiZjE4LWVhOTItNGZjNC1iZmYxLWYwNzA0NDYyYTEwMi8i:1mnzxA:wDyO50Dra7_Ux17jtn2w4ZK9MlA&language=en",
            "price": "1340.48"
        }, {
            "created_at": "2019-06-22T10:28:21.847474Z",
            "currency": "SEK",
            "id": "2859273",
            "metadata": {},
            "ocr_number": "986911160349",
            "open": false,
            "paid_at": "2019-06-25T9:12:57.742648Z",
            "pdf": "https://api.gigapay.se/invoice/2859273/?token=Ii9pbnZvaWNlLzY2OThlMTBhLTNiYTMtNGZlNS1iMzhlLWUzNTZjYTU5MTRiNi8i:1mnzxB:AIX-4zNc0FEStcwpWPHC_KkWDDc&language=en",
            "price": "1340.48"
        }
}
```

This endpoint retrieves all webhooks.

### HTTP Request

`GET https://api.gigapay.se/v2/invoices/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
`page` | 1 | Which page to return.
`page_size` | 25 | The number of Invoices per page.





## Retrieve an Invoice

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/invoices/2859272/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/invoices/2859272/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/2859272/", {
  headers: {
    "Authorization": "Token asasdadjanfkanfda",
    "Integration-Id": "aqdnkjasdo12"
  }
})
```

> The above command returns JSON structured like this:

```json
{
    "created_at": "2019-05-22T10:32:36.118753Z",
    "currency": "SEK",
    "id": "2859272",
    "metadata": {},
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "pdf": "https://api.gigapay.se/invoice/2859272/?token=Ii9pbnZvaWNlLzNjYmRiZjE4LWVhOTItNGZjNC1iZmYxLWYwNzA0NDYyYTEwMi8i:1mnzxA:wDyO50Dra7_Ux17jtn2w4ZK9MlA&language=en",
    "price": "1340.48"
}
```

This endpoint retrieves an Invoice.

### HTTP Request

`GET https://api.gigapay.se/v2/invoices/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.






## Update an Invoice

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/invoices/2859272/',
    json={
      'id': '846271',
      'metadata': {'original_id': '2859272'}
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X PATCH -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12' -d '{"id": "846271", "metadata": {"original_id": "2859272"}}' https://api.gigapay.se/v2/invoices/2859272/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/2859272/", {
    method: "PATCH",
    body: JSON.stringify({'id': '846271', 'metadata': {'original_id': '2859272'}}),
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
    "created_at": "2019-05-22T10:32:36.118753Z",
    "currency": "SEK",
    "id": "846271",
    "metadata": {
        "original_id": "2859272"
    },
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "pdf": "https://api.gigapay.se/invoice/2859272/?token=Ii9pbnZvaWNlLzNjYmRiZjE4LWVhOTItNGZjNC1iZmYxLWYwNzA0NDYyYTEwMi8i:1mnzxA:wDyO50Dra7_Ux17jtn2w4ZK9MlA&language=en",
    "price": "1340.48"
}
```

This endpoint updates a webhooks.

### HTTP Request

`PATCH https://api.gigapay.se/v2/invoices/:id/`

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
`metadata` | Object | False | Previous value | JSON-encoded metadata.




## Delete an Invoice

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/invoices/846271/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/invoices/846271/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/846271/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns an empty response.


This endpoint deletes an Invoice. Note that you can not delete a paid Invoice.

### HTTP Request

`DELETE https://api.gigapay.se/v2/invoices/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.
