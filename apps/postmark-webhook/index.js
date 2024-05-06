const axios = require("axios");

const BACKEND_URLS = {
  development: "http://localhost:8081",
  preview:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/dev-safeplay-backend",
  production:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/safeplay-backend",
};

const createEmailSchedule = async (email) =>
  axios
    .post(
      `${BACKEND_URLS[process.env.NODE_ENV]}/email/createEmailSchedule`,
      { email }
      // TODO: Handle the type of email that was delivered based on the tag of the email.
      // for now we need to know the onboarding1 was delivered, and if it was set up their mailing schedule
      // and for the rest we need to know to remove them from the campaign
    )
    .then((x) => console.log(x.data))
    .catch((error) => console.log(error));

const emailBounced = async (email) =>
  axios
    .post(
      `${BACKEND_URLS[process.env.NODE_ENV]}/email/bounced`,
      { email }
      // if email bounces for now add them to a block list
    )
    .then((x) => console.log(x.data))
    .catch((error) => console.log(error));

const emailSpamComplaint = async (email) =>
  axios
    .post(
      `${BACKEND_URLS[process.env.NODE_ENV]}/email/spamComplaint`,
      { email }
      // if email has spam complaint, for now remove tehm from future emails
    )
    .then((x) => console.log(x.data))
    .catch((error) => console.log(error));

exports.handler = async function (event) {
  try {
    const postmarkEventBody = JSON.parse(event.body);
    const eventType = postmarkEventBody.RecordType
      ? postmarkEventBody.RecordType
      : "";
    const eventTag = postmarkEventBody.Tag ? postmarkEventBody.Tag : "";
    console.log("Tag:", eventTag);

    if (!eventType) return;
    const eventEmail =
      eventType === "Delivery"
        ? postmarkEventBody.Recipient
        : postmarkEventBody.Email;

    if (!eventEmail || !eventTag) return;

    switch (eventType) {
      case "Delivery":
        if (eventTag === "onboarding1" || eventTag === "welcome-email") {
          await createEmailSchedule(eventEmail);
          console.log(
            "this is the first onboarding email! Set up the email schedule"
          );
        } else {
          // we don't need to remove emails because they're done by date
        }
        break;
      case "Bounce":
        await emailBounced(eventEmail);
        console.log("email bounced - remove from mailouts");
        break;
      case "SpamComplaint":
        await emailSpamComplaint(eventEmail);
        console.log("email spam complaint - remove from mailouts");
        break;
      default:
        console.log("Unhandled event with message Id:");
        console.log(postmarkEvent.MessageID ?? "");
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
