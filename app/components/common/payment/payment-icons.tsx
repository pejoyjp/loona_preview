import AmericanExpress from "~/assets/payment-icons/american-express.svg";
import ApplePay from "~/assets/payment-icons/apple-pay.svg";
import GooglePay from "~/assets/payment-icons/google-pay.svg";
import Mastercard from "~/assets/payment-icons/mastercard.svg";
import MetaPay from "~/assets/payment-icons/meta-pay.svg";
import Paypal from "~/assets/payment-icons/paypal.svg";
import Venmo from "~/assets/payment-icons/venmo.svg";
import Visa from "~/assets/payment-icons/visa.svg";
import Discover from "~/assets/payment-icons/discover.svg";

const paymentMethodsData = [
  { name: "Visa", icon: Visa },
  { name: "American Express", icon: AmericanExpress },
  { name: "Apple Pay", icon: ApplePay },
  { name: "Discover", icon: Discover },
  { name: "Meta Pay", icon: MetaPay },
  { name: "Google Pay", icon: GooglePay },
  { name: "Mastercard", icon: Mastercard },
  { name: "PayPal", icon: Paypal },
  { name: "Venmo", icon: Venmo },
];

export function PaymentIcons() {
  return (
    <div className="flex flex-wrap  items-center gap-4 md:justify-between pb-6">
      {paymentMethodsData.map((method) => (
        <div key={method.name} title={method.name}>
          <img src={method.icon} alt={method.name} className="w-9 h-6 object-contain" />
        </div>
      ))}
    </div>
  );
}
