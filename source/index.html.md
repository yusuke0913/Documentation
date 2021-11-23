---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - python
  - javascript

toc_footers:
  - <a href='mailto:developer@gigapay.se'>developer@gigapay.se</a>

includes:
  - integrations
  - employees
  - payouts
  - pricing
  - invoices
  - webhooks


search: true

code_clipboard: true

meta:
  - name: description
    content: Documentation for the Gigapay API
---

# API Reference

The Gigapay API is organized around [REST](http://en.wikipedia.org/wiki/Representational\_State\_Transfer). Our API has
predictable resource-oriented URLs, accepts [JSON-encoded](http://www.json.org) request bodies, returns JSON-encoded
responses, and uses standard HTTP response codes, authentication, and verbs. Our API is available at
[https://api.gigapay.se/v2/](https://api.gigapay.se/v2/).

There is a demo version of the API available at [https://api.demo.gigapay.se/v2/](https://api.demo.gigapay.se/v2/).
This also serves as a test environment for developers working to integrate with our API. No money flows through the
demo environment.

### Browsable API

Both the live and demo environment render a human-friendly HTML output for each resource, when the HTML format is
requested by a web browser. This allows for easy browsing and interaction with the available resources. We strongly
recommend you test our Browsable API before starting to integrate with our API, as it will give you a far more
intuitive understanding of the API compared to reading this documentation.

### Postman collection

There is also a Postman collection if you prefer. Follow the instructions
[here](https://developer.gigapay.se/postman-collection/) to get your Postman environment and collection configured.


# Events

The Gigapay API is driven by actions taken by the parties involved in each Payout; the Client making the Payout,
Gigapay facilitating it, and the Employee receiving it. The flowchart below illustrates each of these actions and
the corresponding events.

![](events.svg)

Note that the Employee and Payout flow typically occur in parallel as the Employee is usually created when, or close in
time to when, their first Payout is created. In this case is the Employee not notified of the Payout until they are
verified.


# Authentication

The Gigapay API uses API keys to identify and authenticate requests. You can request keys by contacting us at
[info@gigapay.se](mailto:info@gigapay.se). Note that you will receive separate sets of keys for the live and demo
environment.

Your API keys carry many privileges, so be make sure you keep them secure. Do not share your secret API keys in
publicly accessible areas such as GitHub, client-side code, etc.

Authorization to the API is performed through a token-based HTTP Authentication scheme. To authorize requests, 
include the `Authorization` and `Integration-ID` HTTP header. Note that the authentication key should be prefixed 
by the string literal `Token`, with whitespace separating the two strings.

```shell
curl https://api.gigapay.se/v2/payouts/ \
  -H "Authorization: Token 1vjv20ksxwvlpp3peize74ievjmx3e" \
  -H "Integration-ID: 650fd73ff5"
```

API requests without authentication will fail with the HTTP response code `403`. API calls made over plain HTTP 
instead of HTTPS will also be rejected with the response code `301`.

### IP-whitelisting

The Gigapay API Supports IP-whitelisting. When requesting API-keys, let us know which IP:s you would like to restrict
access from. If IP-whitelisting is enabled, API requests made from a non-whitelisted IP will be rejected with HTTP 
response code `403`.

### Language
```shell
curl https://api.gigapay.se/v2/ \
  -H "Accept-Language: en"
```

The default language of the API is English. This document is written assuming you have the language set to English. 
To change language set the `Accept-Language` header to your preferred language. For example:


# Errors

Gigapay uses HTTP response codes to indicate whether an API request was successful. Codes in the `2XX` range indicate 
success; codes in the `4XX` range indicate that the request failed, given the information provided; codes in the 
`5XX` range indicate an error with Gigapay's servers. Response codes in the `4XX` range generally indicate a client
error  and will as such include a key `detail` in the body describing the cause of the error. For example, the following
request:

<div class="center-column"></div>
```shell
curl https://api.gigapay.se/v2/payouts/123/ \
  -X "DELETE" \
  -H "Authorization: Token 1vjv20ksxwvlpp3peize74ievjmx3e" \
  -H "Integration-ID: 650fd73ff5"
```

Will receive an error response indicating that the `DELETE` method is not allowed on that resource:

<div class="center-column"></div>
```shell
HTTP/2 405 
allow: GET, HEAD, OPTIONS
...

{"detail":"Method \"DELETE\" not allowed."}
```

Validation errors returned on otherwise valid requests are structured differently. They will respond with the
status code `400`and include the field names as the keys in the response. If the validation error was not specific
to a particular field then the `non_field_errors` key will be used. A validation error thus might look like:

<div class="center-column"></div>
```shell
HTTP/1.1 400 Bad Request
...

{"description": ["This field may not be blank."]}
```

# Expanding objects

Many objects contain the identifier of a related object in their response properties. For example, a 
[Payout](resources/payouts.md) has an associated [Employee](resources/employees.md) identifier. Those objects can be
expanded inline with the `expand` request parameter. Objects that can be expanded are noted in this documentation.
You can use the `expand` param on any endpoint which includes expandable fields, including the create endpoints.
You can expand multiple objects at once by repeating the `expand` request parameter.

For example, the following request retrieves a [Payout](resources/payouts.md) object with the related
[Employee](resources/employees.md) object expanded.

<div class="center-column"></div>
```shell
curl https://api.gigapay.se/v2/payouts/123/?expand=employee \
  -H "Authorization: Token 1vjv20ksxwvlpp3peize74ievjmx3e" \
  -H "Integration-ID: 650fd73ff5"
```

The response could look as following:

<div class="center-column"></div>
```shell
HTTP 200 OK
...

{
    "id": "123",
    "amount": "1000.00",
    "currency": "SEK",
    "description": "Lön genom Gigapay",
    "employee": {
        "id": "67",
        "name": "Albin Lindskog",
        "cellphone_number": "+46703000000",
        "email": null,
        "metadata": {},
        "created_at": "2020-02-11T12:21:27.267591Z",
        "verified_at": "2020-02-26T14:52:58.287693Z"
    },
    "invoice": "32",
    "metadata": {},
    "start_at": null,
    "end_at": null,
    "created_at": "2020-02-11T20:10:45.398264Z",
    "notified_at": null,
    "accepted_at": null
}
```

# Pagination

The Gigapay API uses pagination on all of its list-endpoints. These endpoints all share a common structure, optionally
accepting `page` and a `page_size` request parameter. `page` which page to return and `page_size` the number of objects
per page. The objects returned are contained within the `result` field of the response.

For instance, to only list two [Employees](resources/employees.md) per page, the request would look like this:

<div class="center-column"></div>
```shell
curl https://api.gigapay.se/v2/employees/?page_size=2&page=1 \
  -H "Authorization: Token 1vjv20ksxwvlpp3peize74ievjmx3e" \
  -H "Integration-ID: 650fd73ff5"
```

And result in the following response:

<div class="center-column"></div>
```shell
HTTP 200 OK
...

{
    "count": 4,
    "next": "https://api.gigapay.se/v2/employees/?page=2",
    "previous": null,
    "results": [
        {
            "id": "1f1d1263-0e79-4787-b573-6df81b44bfc2",
            "name": "Albin Lindskog",
            "cellphone_number": "+46703000000",
            "email": null,
            "metadata": {
                "user_id": 2,
            },
            "created_at": "2019-05-22T10:32:36.118753Z",
            "verified_at": null,
        }, {
	          "id": "25d2af38-59b9-4f73-9452-51787fed5c84",
            "name": "Karl Karlsson",
            "cellphone_number": null,
            "email": karl.karlsson@gmail.com,
            "metadata": {
                "user_id": 3,
            },
            "created_at": "2019-05-20T15:33:08.974624Z",
            "verified_at": "2019-05-21T09:13:48.625263",
        }
    ]
}
```


# Idempotency

The Gigapay API supports idempotency to safely retry requests without accidentally performing the same operation twice. 
Gigapay's idempotency works by storing the responses of previous requests. Subsequent requests with the same key return
the same result, including errors.

To perform an idempotent request, provide an additional `Idempotency-Key: <key>` header to the request. We recommend
using uuid4() for the key, but any string with sufficient entropy will work. For example:

<div class="center-column"></div>
```shell
curl https://api.gigapay.se/v1/payouts \
  -H "Authorization: Token 1vjv20ksxwvlpp3peize74ievjmx3e" \
  -H "Integration-ID: 650fd73ff5"
  -H "Idempotency-Key: d03de720-5768-424d-ae93-17406e1be9b7"
```

Idempotency is available on all endpoints accepting `POST` requests. Keys expire after 24 hours, so a new response is
generated if a key is reused outside that time frame.


# Metadata

All objects in the Gigapay API have a `metadata` attribute. You can use this attribute to attach to any valid JSON data 
to these objects. It is useful for storing additional information about an object. For example, you could store a unique
identifier for a Gigger in your system. This data is not used by Gigapay, and will not be displayed to any users.

The [Payout](resources/payouts.md) objects also has a `description` field. It should contain a human-readable
description of why this Payout is being made. Unlike `metadata`, `description` is a single string, and your Gigger
will see it.

Do not store any sensitive information in the `description` field nor in the `metadata` field.


# Webhooks

Gigapay uses [Webhooks](resources/webhooks-1.md) to let you know any time an [event](events.md) happens on your account.
[Webhooks](resources/webhooks-1.md) are completely optional, however they allow you to receive real-time updates on
events related to your Gigapay account. We notify on the following events:

* `Employee.created`
* `Employee.notified`
* `Employee.claimed`
* `Employee.verified`
* `Payout.created`
* `Payout.notified`
* `Payout.accepted`
* `Invoice.created`
* `Invoice.paid`

The notifications simply contain the object that triggered the event, as represented in the API. For example, the
notification for a `Employee.verified` event may look as following:

```shell
POST https://gigatron.se/webhooks/employees/ HTTP/1.1
Content-Type: application/json
Gigapay-Signature: t=1583327301,v1=ad583e2b2093c8d6fb3b65e04b99fc5988e98c0c312909acad334072da7e99ec
...

{
  "id": "25d2af38-59b9-4f73-9452-51787fed5c84", 
  "name": "Karl Karlsson", 
  "cellphone_number": null, 
  "email": karl.karlsson@gmail.com, 
  "metadata": {
    "user_id": 3
  }, 
  "created_at": "2019-05-20T15:33:08.974624Z", 
  "notified_at": "2019-05-20T15:33:12.581720Z", 
  "claimed_at": "2019-05-21T09:13:32.575721Z"
  "verified_at": "2019-05-21T09:13:48.625263Z"
}
```

### Gigapay-Signature

The notification is signed used the `secret_key` set for the [Webhook](resources/webhooks-1.md), the signature is
included in the notification as the `Gigapay-Signature` header. This allows you to verify that the events were sent by
Gigapay, and not by a third party.

The signature consists of two parameters;
`t`, the timestamp of when the notification was sent,
`v` the signature of the current scheme. Currently, the only valid signature scheme is `v1` which is the HMAC
algorithm as described by RFC 2104 using SHA256 as disgestmod.

To verify signatures using the `v1` scheme, extract the timestamp from the`Gigapay-Signature` header, and the
JSON-encoded notification from the request body. Join these strings with a period, `.`, as a separator. Compute an HMAC
with the SHA256 hash function using the Webhook’s `secret_key` as the key. Lastly ensure that the signature in the
header and the calculated signature matches. A psuedocode outline would be as follows:

```shell
secret_key = '...asId'
t, v1 = parse_signature(request.headers.Gigapay-Signature)
payload = t + '.' + request.body

hmac = hmac.new('sha256', secret_key.encode('utf-8'))
hmac.update(payload.encode('utf-8'))
signature = hmac.hexdigest()

signature == v1
```

Note, if you are deserializing the JSON-encoded body you will need to reserialize it back to a string before computing
the hash. When doing so take care to ensure that the resulting string has the same format as the original one.
Some gotchas are:

* White space after `,` and `:`.
* Unicode-encoded characters.
* The timestamps are UTC, ISO 8601.


# Postman collection

## Requirements

* [Postman](https://www.postman.com) version >=6.x, verify with Help -> Check for updates
* A token and an integration\_id that must to be put into the environment

### Import Playground environment <a href="import-playground-environment" id="import-playground-environment"></a>

For a fresh installation, import the playground environment file first. Follow the steps below.

* Click on the `Import` button at the very top header line
* Click on `Import From Link`
* Paste the following URL: [https://gigapay.co/wp-content/uploads/gigapay.postman\_environment.json](https://gigapay.co/wp-content/uploads/gigapay.postman\_environment.json)

### Import collection <a href="import-collection" id="import-collection"></a>

For a fresh import of the collection, but also for updating, follow the steps below.

* Click on the `Import` button at the very top header line
* Click on `Import From Link`
* Paste the following URL: [https://gigapay.co/wp-content/uploads/gigapay.postman\_collection.json](https://gigapay.co/wp-content/uploads/gigapay.postman\_collection.json)

### Configure Playground environment <a href="configure-playground-environment" id="configure-playground-environment"></a>

After the import was successful, configure a user for the environment.

* Click on the gear icon at the very top right below the header line
* A new window opens up with the title "manage environments"
* Click on the `Gigapay` text
* Change the initial and current value of the `token` and `integration_id` to a valid token that can be obtained from `developer@gigapay.co`
* Click on the `Update` button

### Using the collection <a href="using-the-collection" id="using-the-collection"></a>

Before starting a session, always ensure that the correct environment is selected at the top right. When used the collection sets several "runtime variables" in the active environment.

When testing a transfer please bear in mind that you need to fill out the needed details in the JSON-body of the transfer-object.


