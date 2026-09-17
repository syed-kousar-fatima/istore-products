import {
  CreditCard,
  Smartphone,
  WalletCards,
  Banknote,
} from "lucide-react";

const paymentMethods = [
  {
    id: "card",
    name: "Credit / Debit Card",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
    enabled: true,
  },
  {
    id: "upi",
    name: "UPI",
    description: "Google Pay, PhonePe, Paytm and more",
    icon: Smartphone,
    enabled: true,
  },
  {
    id: "wallet",
    name: "Digital Wallet",
    description: "Secure digital wallet payment",
    icon: WalletCards,
    enabled: true,
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
    enabled: true,
  },
];

export default paymentMethods;