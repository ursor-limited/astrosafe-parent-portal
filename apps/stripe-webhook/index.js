const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const axios = require("axios");

const BACKEND_URLS = {
  development: "http://localhost:8081",
  preview:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/dev-safeplay-backend",
  production:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/safeplay-backend",
};

const submitPaymentSucceeded = async (email) =>
  axios
    .patch(
      `${BACKEND_URLS[process.env.NODE_ENV]}/video/user/${email}/subscribe`
    )
    .then((x) => console.log(x.data))
    .catch((error) => console.log(error));

const submitPaymentFailed = async (email) =>
  axios
    .patch(
      `${
        BACKEND_URLS[process.env.NODE_ENV]
      }/video/user/${email}/setPaymentFailed`
    )
    .then((x) => console.log(x.data))
    .catch((error) => console.log(error));

const submitSubscriptionDeleted = async (email) =>
  axios
    .patch(
      `${
        BACKEND_URLS[process.env.NODE_ENV]
      }/video/user/${email}/deleteSubscription`
    )
    .then((x) => console.log(x.data))
    .catch((error) => console.log(error));

const submitSubscriptionRenewed = async (email) =>
  axios
    .patch(
      `${
        BACKEND_URLS[process.env.NODE_ENV]
      }/video/user/${email}/renewSubscription`
      // { subscriptionItemId }
    )
    .then((x) => console.log(x.data))
    .catch((error) => console.log(error));

const submitSubscriptionDeletionDate = async (email, deletionDate) =>
  axios
    .patch(
      `${
        BACKEND_URLS[process.env.NODE_ENV]
      }/video/user/${email}/setSubscriptionDeletionDate`,
      { deletionDate }
    )
    .then((x) => console.log(x.data))
    .catch((error) => console.log(error));

const submitDetails = async (checkoutSessionId, productId) =>
  axios
    .post(`${BACKEND_URLS[process.env.NODE_ENV]}/video/checkoutSessionId`, {
      checkoutSessionId,
      productId,
    })
    .catch((error) => console.log(error));

exports.handler = async function (event) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  try {
    const requestId = event?.requestContext?.requestId;
    const sig = event?.headers["Stripe-Signature"];

    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
    const eventType = stripeEvent.type ? stripeEvent.type : "";
    // https://stripe.com/docs/api#event_object
    const jsonData = JSON.parse(event.body);

    console.log(`Event Type: ${eventType}`);
    console.log(jsonData);

    const subscriptionId = stripeEvent.data.object.id;
    const customerId = stripeEvent.data.object.customer;
    const priceId = stripeEvent.data.object.plan?.id;

    let customerEmail;
    customerEmail = stripeEvent.data.object["customer_details"]?.email;
    if (!customerEmail) {
      const customer = await stripe.customers.retrieve(customerId);
      customerEmail = customer.email;
    }

    switch (eventType) {
      case "customer.subscription.created":
        // do not use this as the subscription creation trigger, as this event is triggered even when the payment fails
        break;
      case "customer.subscription.updated":
        if (stripeEvent.data.object.cancel_at) {
          console.log(customerEmail, stripeEvent.data.object.cancel_at);
          await submitSubscriptionDeletionDate(
            customerEmail,
            stripeEvent.data.object.cancel_at
          );
        } else {
          await submitSubscriptionRenewed(
            customerEmail
            // stripeEvent.data.object?.subscription_item
          );
        }
        break;
      case "customer.subscription.deleted":
        await submitSubscriptionDeleted(customerEmail);
        break;
      case "customer.subscription.resumed":
        // this one is currently not needed, because we do not have subscription pausing enabled. i.e. pausing/resuming is different from canceling/renewing
        break;
      case "invoice.payment_succeeded": {
        await stripe.checkout.sessions
          .list({
            subscription: stripeEvent.data.object?.subscription,
          })
          .then((x) => x?.data?.[0]?.id)
          .then((id) =>
            stripe.subscriptions
              .retrieve(stripeEvent.data.object?.subscription)
              .then((s) => {
                submitDetails(id, s?.items?.data?.[0].price?.product);
              })
          );
        await submitPaymentSucceeded(customerEmail);
        break;
      }
      case "invoice.payment_failed":
        await submitPaymentFailed(customerEmail);
        break;
      default:
        console.log("Unhandled event type");
        console.log(stripeEvent.data.object);
        break;
    }

    const data = {
      statusCode: 200,
      body: JSON.stringify({
        received: true,
      }),
    };
    return data;
  } catch (uncaughtError) {
    console.error(uncaughtError);
    throw uncaughtError;
  }
};
