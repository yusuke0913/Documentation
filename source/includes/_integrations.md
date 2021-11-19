# Integrations

Integrations are the parent object of all other objects in the Gigapay API. All other objects are separated per
Integration, when operating on these objects you thus need to specify which integration you are acting as by providing
the `Integration-ID` header.

There are three types of integrations:

- Web App Integration; `type 1`: The integration used for the web app at `app.gigapay.se`. There is only one, it can not be deleted.
- Invoice Integrations; `type 2`: Integrations used to manage Invoices sent to you from Freelancers. There is one per Freelancer, they are read-only.
- Custom Integrations; `type 3`: Integrations created and managed by you through the api.




### The Integration object

| Attribute         | Description                                        |
| ----------------- | -------------------------------------------------- |
| `id`              | Unique identifier for the object.                  |
| `name`            | Name of integration, presented to Employees.       |
| `type`            | Type of integrations.                              |
| `logo`            | Image of logo to use, presented to Employees.      |
| `metadata`        | JSON-encoded metadata.                             |
| `email`           | Email address to send invoices to.                 |
| `recipient`       | Name of recipient written on invoices.             |
| `address_line_1`  | Address line 1 written on invoices.                |
| `address_line_2`  | Address line 2 written on invoices.                |
| `zip_code`        | Zip code written on invoices                       |
| `city`            | City written on invoices.                          |


## List All Integrations Webhooks

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/integrations/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda'  https://api.gigapay.se/v2/integrations/
```

```javascript
fetch("https://api.gigapay.se/v2/integrations/", {
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "count": 4,
    "next": null,
    "previous": "https://api.gigapay.se/v2/integrations/?page=2",
    "results": [
        {
            "id": "1",
            "name": "Zerebra AB",
            "type": 1,
            "logo": "https://gigapay.ams3.digitaloceanspaces.com/gigapay/zerebra_logo.png",
            "metadata": {},
            "email": "faktura@zerebra.com",
            "recipient": "Zerebra AB",
            "address_line_1": "Svartmangatan 18",
            "address_line_2": null,
            "zip_code": "11129"
        }, {
            "id": "1",
            "name": "Zerebra AB Gig",
            "type": 3,
            "logo": "https://gigapay.ams3.digitaloceanspaces.com/gigapay/zerebra_logo.png",
            "metadata": {},
            "email": "faktura+gig@zerebra.com",
            "recipient": "Zerebra AB",
            "address_line_1": "Svartmangatan 18",
            "address_line_2": null,
            "zip_code": "11129"
        },
    ]
}
```

This endpoint retrieves all integrations.

### HTTP Request

`GET https://api.gigapay.se/v2/integrations/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
`page` | 1 | Which page to return.
`page_size` | 25 | The number of Integrations per page.
`type` | | Filter based on type.





## Create an Integration

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/integrations/',
    json={
        "address_line_1": "Malmvägen 8",
        "city": "Segeltorp",
        "email": "albin@pinestreet.tech",
        "id": "846291712",
        "logo": "iVBORw0KGgoAAA...",
        "name": "Pinestreet Tech",
        "recipient": "Pinestreet Technology AB",
        "zip_code": "14171",
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
    }
)
```

```shell
curl -X POST -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -d '{"address_line_1": "Malmv\u00e4gen 8", "city": "Segeltorp", "email": "albin@pinestreet.tech", "id": "846291712", "name": "Pinestreet Tech", "recipient": "Pinestreet Technology AB", "zip_code": "14171"}' https://api.gigapay.se/v2/integrations/```
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/", {
    method: "POST",
    body: JSON.stringify({
        address_line_1: "Malmvägen 8",
        city: "Segeltorp",
        email: "albin@pinestreet.tech",
        id: "846291712",
        name: "Pinestreet Tech",
        recipient: "Pinestreet Technology AB",
        zip_code: "14171",
    }),
    headers: {
        Authorization: "Token asasdadjanfkanfda",
    },
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "846291712",
    "name": "Pinestreet Tech",
    "type": 3,
    "logo": "https://gigapay.ams3.digitaloceanspaces.com/gigapay/pinestreet_logo.png",
    "metadata": {},
    "email": "albin@pinestreet.tech",
    "recipient": "Pinestreet Technology AB",
    "address_line_1": "Malmvägen 8",
    "address_line_2": null,
    "zip_code": "14171",
    "city": "Segeltorp"
}
```

This endpoint creates a webhooks.

### HTTP Request

`POST https://api.gigapay.se/v2/webhooks/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Idempotency-key` | False | Idempotency key.

### Body Parameters

Parameter | Type | Required | Default | Description
--------- | ---- | -------- | ------- |------------
`id` | String | False | uuid4() | Unique identifier for the object.
`name` | String | True |  | Name of integration.
`logo` | Image | False | null | Image of logo to use. 
`metadata` | Object | False | {} | JSON-encoded metadata.
`email` | String | True | | Email address to send invoices to.
`recipient` | String | True | | Name of recipient written on invoices.
`address_line_1` | Object | True | | Address line 1 written on invoices.
`address_line_2` | String | False | null | Address line 2 written on invoices.
`zip_code` | String | True | | Zip code written on invoices
`city` | String | True | | City written on invoices.





## Retrieve an Integration

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/webhooks/846291712/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda'  https://api.gigapay.se/v2/integrations/846291712/
```

```javascript
fetch("https://api.gigapay.se/v2/integrations/846291712/", {
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "846291712",
    "name": "Pinestreet Tech",
    "type": 3,
    "logo": "https://gigapay.ams3.digitaloceanspaces.com/gigapay/pinestreet_logo.png",
    "metadata": {},
    "email": "albin@pinestreet.tech",
    "recipient": "Pinestreet Technology AB",
    "address_line_1": "Malmvägen 8",
    "address_line_2": null,
    "zip_code": "14171",
    "city": "Segeltorp"
}
```

This endpoint retrieves an Integration.

### HTTP Request

`GET https://api.gigapay.se/v2/integrations/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.






## Update an Integration

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/integrations/846291712/',
    json={
        'email': 'invoice@pinestreet.tech'
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
    }
)
```

```shell
curl -X PATCH -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -d '{"email": "invoice@pinestreet.tech"} https://api.gigapay.se/v2/integrations/846291712/
```

```javascript
fetch("https://api.gigapay.se/v2/integrations/846291712/", {
    method: "PATCH",
    body: JSON.stringify({'email': 'invoice@pinestreet.tech'}),
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Content-Type": "application/json",
    },
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "846291712",
    "name": "Pinestreet Tech",
    "type": 3,
    "logo": "https://gigapay.ams3.digitaloceanspaces.com/gigapay/pinestreet_logo.png",
    "metadata": {},
    "email": "albin@pinestreet.tech",
    "recipient": "Pinestreet Technology AB",
    "address_line_1": "Malmvägen 8",
    "address_line_2": null,
    "zip_code": "14171",
    "city": "Segeltorp"
}
```

This endpoint updates an integration.

### HTTP Request

`PATCH https://api.gigapay.se/v2/integrations/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.

### Body Parameters

Parameter | Type | Required | Default | Description
--------- | ---- | -------- | ------- |------------
`id` | String | False | Previous value | Unique identifier for the object.
`name` | String | False | Previous value | Name of integration.
`logo` | Image | False | Previous value | Image of logo to use. 
`metadata` | Object | False | Previous value | JSON-encoded metadata.
`email` | String | False | Previous value | Email address to send invoices to.
`recipient` | String | False | Previous value | Name of recipient written on invoices.
`address_line_1` | Object | False | Previous value | Address line 1 written on invoices.
`address_line_2` | String | False | Previous value | Address line 2 written on invoices.
`zip_code` | String | False | Previous value | Zip code written on invoices
`city` | String | False | Previous value | City written on invoices.




## Replace an Integration

```python
import requests

response = requests.put(
    'https://api.gigapay.se/v2/integrations/846291712/',
    json={
        "address_line_1": "Malmvägen 8",
        "city": "Segeltorp",
        "email": "albin@pinestreet.tech",
        "id": "846291712",
        "logo": "iVBORw0KGgoAAA...",
        "name": "Pinestreet Tech",
        "recipient": "Pinestreet Technology AB",
        "zip_code": "14171",
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
    }
)
```

```shell
curl -X PUT -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -d '{"address_line_1": "Malmv\u00e4gen 8", "city": "Segeltorp", "email": "albin@pinestreet.tech", "id": "846291712", "name": "Pinestreet Tech", "recipient": "Pinestreet Technology AB", "zip_code": "14171"}' https://api.gigapay.se/v2/integrations/846291712/```
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/846291712/", {
    method: "PUT",
    body: JSON.stringify({
        address_line_1: "Malmvägen 8",
        city: "Segeltorp",
        email: "albin@pinestreet.tech",
        id: "846291712",
        name: "Pinestreet Tech",
        recipient: "Pinestreet Technology AB",
        zip_code: "14171",
    }),
    headers: {
        Authorization: "Token asasdadjanfkanfda",
    },
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "846291712",
    "name": "Pinestreet Tech",
    "type": 3,
    "logo": "https://gigapay.ams3.digitaloceanspaces.com/gigapay/pinestreet_logo.png",
    "metadata": {},
    "email": "albin@pinestreet.tech",
    "recipient": "Pinestreet Technology AB",
    "address_line_1": "Malmvägen 8",
    "address_line_2": null,
    "zip_code": "14171",
    "city": "Segeltorp"
}
```

This endpoint replaces a webhooks.

### HTTP Request

`PUT https://api.gigapay.se/v2/integrations/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.

Parameter | Type | Required | Default | Description
--------- | ---- | -------- | ------- |------------
`id` | String | False | uuid4() | Unique identifier for the object.
`name` | String | True |  | Name of integration.
`logo` | Image | False | null | Image of logo to use. 
`metadata` | Object | False | {} | JSON-encoded metadata.
`email` | String | True | | Email address to send invoices to.
`recipient` | String | True | | Name of recipient written on invoices.
`address_line_1` | Object | True | | Address line 1 written on invoices.
`address_line_2` | String | False | null | Address line 2 written on invoices.
`zip_code` | String | True | | Zip code written on invoices
`city` | String | True | | City written on invoices.





## Delete an Integration

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/integrations/846291712/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token asasdadjanfkanfda' https://api.gigapay.se/v2/integrations/846291712/
```

```javascript
fetch("https://api.gigapay.se/v2/integrations/846291712/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
    }
})
```

> The above command returns an empty response.


This endpoint deletes a webhooks.

### HTTP Request

`DELETE https://api.gigapay.se/v2/integrations/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.
