const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const axios = require("axios");

const submitSubscriptionCreated = async (email) => {
  console.log(email);
  await axios
    .patch(
      `https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/dev-safeplay-backend/video/user/${email}/subscribe`
    )
    .then((x) => console.log(x.data))
    .catch((error) => console.log(error));
};

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
        const data = stripeEvent.data.object;
        await submitSubscriptionCreated(customerEmail);
        break;
      case "customer.subscription.updated":
        const data3 = stripeEvent.data.object;
        break;
      case "customer.subscription.deleted":
        const data2 = stripeEvent.data.object;
        break;
      case "invoice.payment_succeeded":
        const data5 = stripeEvent.data.object;
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

// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   (request, response) => {
//     let event = request.body;
//     // Only verify the event if you have an endpoint secret defined.
//     // Otherwise use the basic event deserialized with JSON.parse
//     if (endpointSecret) {
//       // Get the signature sent by Stripe
//       const signature = request.headers["stripe-signature"];
//       try {
//         event = stripe.webhooks.constructEvent(
//           request.body,
//           signature,
//           endpointSecret
//         );
//       } catch (err) {
//         console.log(`Webhook signature verification failed.`, err.message);
//         return response.sendStatus(400);
//       }
//     }

//     // Handle the event
//     switch (event.type) {
//       case "customer.subscription.created":
//         const data = event.data.object;
//         console.log("created", data);
//         break;
//       case "customer.subscription.updated":
//         const data3 = event.data.object;
//         console.log("updated", data3);
//         break;
//       case "customer.subscription.deleted":
//         const data2 = event.data.object;
//         console.log("deleted", data2);
//         break;
//       case "invoice.paid":
//         const data5 = event.data.object;
//         console.log("paid", data5);
//         break;

//       default:
//         // Unexpected event type
//         console.log(`Unhandled event type ${event.type}.`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   }
// );

// app.listen(4242, () => console.log("Running on port 4242"));
