# Guides
In this section we will go through the most common use-cases for Gigapay along with examples of how to realize those
through the API. 

Before you get started you will need to contact us at [support@gigapay.se](mailto:support@gigapay.se)
to receive your `Integration-ID` and `Authentication` token.

# Task-based compensation
The most straight-forward use-case is to pay out a compensation once a task is completed. This can be achieved with a
single API call: Register the [Payout with the Employee object inlined](#register-a-payout-with-an-inline-employee).

An email with a link to the Invoice and payment options for this transaction will be sent to the email of the
Integration used. You are not obligated to pay the invoice, but the Payout will not be processed until the invoice is
paid.

The recipients will get a notification when the Payout is available to them and will onboard immediately prior to
accepting the Payout.

### Large scale considerations
The one-invoice-per-transaction setup quickly become unwieldy and the number of Payouts increases. In production, we
recommend enabling batching, which allow you to aggregate Payouts from multiple Payouts onto one Invoice, reducing the
invoice management needed.

As the transaction is not processed until the corresponding Invoice is paid, there is a delay between when a Payout is
registered, and when it becomes available to the recipient, this can be quite frustrating. This is solved through
pre-payments, after which we process registered Payouts immediately.

Contact us at [support@gigapay.se](mailto:support@gigapay.se) to discuss either.


# Onboarding in Advance
Although the user goes through the onboarding quickly, it can take some time before we can verify their information and
approve it. Having to wait before you can accept the Payout for a task you've already completed is riling. A better
user-experience is to perform the onboarding prior to the person performing any work. 

This can be solved by [registering a Webhook](#register-a-webhook) for the `Employee.verified` event, and [registering
an Employee object](#register-an-employee) in advance, e.g. when the user signs up to your site. The user will receive
a notification to onboard. Once the user have finished the onboarding, and we've verified their information will the
`Employee.verified` webhook be sent. Your webhook receiver can update the internal state of your user to reflect that
they've been onboarded at Gigapay, and allow them to start tasks.

When a task has been finished you can [register a Payout](#register-a-payout) using the id of the Employee object
created earlier. Once the invoice for the transaction has been paid will the recipient will receive a notification
where they can immediately accept it.

# Marketplace Solution
