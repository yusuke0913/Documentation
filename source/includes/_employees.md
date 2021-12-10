# Employees

An Employee is an individual performing tasks within your organization, employed by Gigapay. To add an Employee to your
organization you can create an Employee object. The Employee will be notified and Gigapay will verify their identity
and working permits.

### The Employee object

> An example Employee object:

```json
{
    "id": "1847",
    "name": "Albin Lindskog",
    "email": "albin@gigapay.co",
    "cellphone_number": "+46703000000",
    "country": "SWE",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": "2019-05-22T10:32:37.846274Z",
    "claimed_at": "2019-05-23T11:56:41.123721Z",
    "verified_at": "2019-05-23T11:57:03.742345Z"
}
```

| Attribute          | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| `id`               | Unique identifier for the object.                                                 |
| `name`             | The full name of the Employee.                                                    |
| `email`            | Email address of the Employee.                                                    |
| `country`          | Employee's country of residence. ISO-3166 country code.                           |
| `cellphone_number` | The Employees cellphone number, including country code.                           |
| `metadata`         | JSON-encoded metadata.                                                            |
| `created_at`       | Time at which the Employee was created at. Displayed as ISO 8601 string.          |
| `notified_at`      | Time at which the Employee was notified.  Displayed as ISO 8601 string.           |
| `claimed_at`       | Time at which the Employee consumed the magic link. Displayed as ISO 8601 string. |
| `verified_at`      | Time when the Employee was verified. Displayed as ISO 8601 string.                |




## List All Employees

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/employees/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/employees/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/", {
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
    "previous": "https://api.gigapay.se/v2/employees/?page=2",
    "results": [
        {
            "id": "1847",
            "name": "Albin Lindskog",
            "email": "albin@gigapay.co",
            "cellphone_number": "+46703000000",
            "country": "SWE",
            "metadata": {},
            "created_at": "2019-05-22T10:32:36.118753Z",
            "notified_at": "2019-05-22T10:32:37.846274Z",
            "claimed_at": "2019-05-23T11:56:41.123721Z",
            "verified_at": "2019-05-23T11:57:03.742345Z"
        }, {
            "id": "1848",
            "name": "Joakim Olovsson",
            "email": "joakim@gigapay.co",
            "cellphone_number": "+46703000001",
            "country": "SWE",
            "metadata": {},
            "created_at": "2019-05-23T14:45:12.545271Z",
            "notified_at": "2019-05-23T14:45:13.374627Z",
            "claimed_at": "2019-05-23T14:45:37.282819Z",
            "verified_at": "2019-05-24T09:47:02.918264Z"
        }
    ]
}
```

This endpoint retrieves all Employees.

### HTTP Request

`GET https://api.gigapay.se/v2/employees/`

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
`created_at` | | Timestamp filter.
`notified_at` | | Timestamp filter.
`claimed_at` | | Timestamp filter.
`verified_at` | | Timestamp filter.





## Register an Employee

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/employees/',
    json={
        'id': 1847,
        'name': 'Albin Lindskog',
        'cellphone_number': '+4670000001',
        'email': 'albin@mail.com',
        'country': 'SWE'
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12' -d '{"id": 1847, "name": "Albin Lindskog", "cellphone_number": "+4670000001", "email": "albin@mail.com", "country": "SWE"}' https://api.gigapay.se/v2/employees/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/", {
    method: "POST",
    body: JSON.stringify({
        name: "Albin Lindskog",
        cellphone_number: "+4670000000",
        email: "albin@mail.com",
        country: "SWE"
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
    "id": "14585989-9a6c-4f05-b251-69e38e85d324",
    "name": "Albin Lindskog",
    "email": "albin@gigapay.co",
    "cellphone_number": "+46703000000",
    "country": "SWE",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": null,
    "claimed_at": null,
    "verified_at": null
}
```

This endpoint creates a webhooks.

### HTTP Request

`POST https://api.gigapay.se/v2/employees/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.
`Idempotency-key` | False | Idempotency key.

### Body Parameters

Parameter | Type | Required | Default | Notes
--------- | ---- | -------- | ------- |------------
`id` | String | False | uuid4() | Unique per [Integration](#integrations).
`name` | String | True | | 
`email` | String | False | null | Either `email` or `cellphone_number` is required.
`country` | String | True | |  ISO-3166 country code.
`cellphone_number` | String | False | null | Either `email` or `cellphone_number` is required.
`metadata` | Object | False | {} | 



## Retrieve an Employee

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/employees/1847/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/employees/1847/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/1847/", {
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "1847",
    "name": "Albin Lindskog",
    "email": "albin@gigapay.co",
    "cellphone_number": "+46703000000",
    "country": "SWE",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": "2019-05-22T10:32:37.846274Z",
    "claimed_at": "2019-05-23T11:56:41.123721Z",
    "verified_at": "2019-05-23T11:57:03.742345Z"
}
```

This endpoint retrieves an employee.

### HTTP Request

`GET https://api.gigapay.se/v2/employees/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.






## Update an Employee

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/employees/1847/',
    json={
        'id': 8472,
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X PATCH -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12' -d '{"id": 8472}' https://api.gigapay.se/v2/employees/1847/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/1847/", {
    method: "PATCH",
    body: JSON.stringify({id: 8472}),
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
    "id": "8472",
    "name": "Albin Lindskog",
    "email": "albin@gigapay.co",
    "cellphone_number": "+46703000000",
    "country": "SWE",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": "2019-05-22T10:32:37.846274Z",
    "claimed_at": "2019-05-23T11:56:41.123721Z",
    "verified_at": "2019-05-23T11:57:03.742345Z"
}
```

This endpoint updates a webhooks.

### HTTP Request

`PATCH https://api.gigapay.se/v2/employees/:id/`

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

Parameter | Type | Required | Default | Notes
--------- | ---- | -------- | ------- |------------
`id` | String | False | Previous value. | Unique per [Integration](#integrations).
`name` | String | False | Previous value. | 
`email` | String | False | Previous value. |
`country` | String | False | Previous value. | ISO-3166 country code.
`cellphone_number` | False | False | Previous value. |
`metadata` | Object | False | Previous value. | 




## Replace an Employee

```python
import requests

response = requests.put(
    'https://api.gigapay.se/v2/employees/8472/',
    json={
        'id': 1847,
        'name': 'Albin Lindskog',
        'cellphone_number': '+4670000001',
        'email': 'albin@mail.com',
        'country': 'SWE'
    },
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X PUT -H 'Authorization: Token asasdadjanfkanfda' -H 'Content-Type: application/json' -H 'Integration-ID: aqdnkjasdo12' -d '{"id": 1847, "name": "Albin Lindskog", "cellphone_number": "+4670000001", "email": "albin@mail.com", "country": "SWE"}' https://api.gigapay.se/v2/employees/8472/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/8472/", {
    method: "PUT",
    body: JSON.stringify({
        id: 1847,
        name: "Albin Lindskog",
        cellphone_number: "+4670000000",
        email: "albin@mail.com",
        country: "SWE"
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
    "id": "1847",
    "name": "Albin Lindskog",
    "email": "albin@gigapay.co",
    "cellphone_number": "+46703000000",
    "country": "SWE",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": null,
    "claimed_at": null,
    "verified_at": null
}
```

This endpoint replaces an Employee.

### HTTP Request

`PUT https://api.gigapay.se/v2/employees/:id/`

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
`id` | String | False | uuid4() | Unique per [Integration](#integrations).
`name` | String | True | | 
`email` | String | False | null | Either `email` or `cellphone_number` is required.
`country` | String | True | | ISO-3166 country code.
`cellphone_number` | String | False | null | Either `email` or `cellphone_number` is required.
`metadata` | Object | False | {} | 





## Delete a Employee

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/employees/1847/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/employees/1847/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/1847/", {
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

`DELETE https://api.gigapay.se/v2/employees/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.




## Resend an Invitation

```python
import requests

response = requests.put(
    'https://api.gigapay.se/v2/employees/1847/resend/',
    headers={
        'Authorization': 'Token asasdadjanfkanfda',
        'Integration-ID': 'aqdnkjasdo12'
    }
)
```

```shell
curl -X PUT -H 'Authorization: Token asasdadjanfkanfda' -H 'Integration-ID: aqdnkjasdo12' https://api.gigapay.se/v2/employees/1847/resend/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/1847/resend/", {
    method: "PUT",
    headers: {
        "Authorization": "Token asasdadjanfkanfda",
        "Integration-Id": "aqdnkjasdo12"
    }
})
```

> The above command returns an empty response.


This endpoint resend an invitation.

### HTTP Request

`PUT https://api.gigapay.se/v2/employees/:id/resend/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration-ID.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.
