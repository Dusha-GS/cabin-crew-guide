// DISABLED — legacy Whop webhook. Payments migrated to Stripe (see stripe-webhook.js).
export const handler = async () => ({
  statusCode: 410,
  body: JSON.stringify({ error: "This endpoint has been retired." }),
});
