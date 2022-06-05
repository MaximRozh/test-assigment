import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const id =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
  "pk_test_51Kyv4qJLtNQoiNqYTYdQ5sQ8cXHNKh8uj3MVCzZZ5g4QWL0FGJ2oT9RsJZlXOiFk3HQxuXS1mPiABAcE0kQijHhK00wzB7V8Dv";

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(id);
  }

  return stripePromise;
};

export default getStripe;
