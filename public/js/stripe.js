/* eslint-disable */
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51NMt3dD1RDCIX8YPcCiP9QzLJsQFhgNLTB0W0Ux95f37VDMy9q7bz3MDqPnD3hVEoMYhEAGgebR18vlhwZHjvOxE004N1DeIWW'
);
export const bookTour = async (tourID) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourID}`);
    // console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
