// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")("sk_test_26PHem9AhJZvU623DfE1x4sd");
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret = "whsec_0ef45729dadb8f35b89a93de037520714ddbf348e737e905f6039ae49f03945b";
const express = require("express");
const app = express();

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    // Handle the event
    switch (event.type) {
      case "customer.subscription.created":
        const data = event.data.object;
        console.log("created", data);
        break;
      case "customer.subscription.updated":
        const data3 = event.data.object;
        console.log("updated", data3);
        break;
      case "customer.subscription.deleted":
        const data2 = event.data.object;
        console.log("deleted", data2);
        break;
      case "invoice.paid":
        const data5 = event.data.object;
        console.log("paid", data5);
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.listen(4242, () => console.log("Running on port 4242"));
