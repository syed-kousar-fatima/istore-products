import React from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  CreditCard,
  Smartphone,
  WalletCards,
} from "lucide-react";

const methods = [
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Visa, Mastercard, Amex",
    icon: CreditCard,
  },
  {
    id: "upi",
    title: "UPI",
    description: "Google Pay, PhonePe, Paytm",
    icon: Smartphone,
  },
  {
    id: "wallet",
    title: "Digital Wallet",
    description: "Secure digital payment",
    icon: WalletCards,
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
];

const PaymentMethods = ({ formData, onChange, errors = {} }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-card p-4 sm:p-6 lg:rounded-3xl lg:p-8 2xl:p-10"
    >
      <div className="mb-5 sm:mb-7">
        <h2 className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">
          Payment Method
        </h2>
        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
          Choose your preferred payment option.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {methods.map((method) => {
          const Icon = method.icon;
          const active = formData.paymentMethod === method.id;

          return (
            <motion.button
              key={method.id}
              type="button"
              onClick={() => onChange("paymentMethod", method.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-300 sm:p-4 ${
                active
                  ? "border-apple-blue bg-apple-blue/10"
                  : "border-border bg-background hover:border-white/20"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  active
                    ? "bg-apple-blue text-white"
                    : "bg-white/5 text-text-secondary"
                }`}
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white sm:text-base">
                  {method.title}
                </p>
                <p className="mt-1 truncate text-xs text-text-secondary">
                  {method.description}
                </p>
              </div>

              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  active
                    ? "border-apple-blue"
                    : "border-border"
                }`}
              >
                {active && (
                  <span className="h-2.5 w-2.5 rounded-full bg-apple-blue" />
                )}
              </span>
            </motion.button>
          );
        })}
      </div>

      {formData.paymentMethod === "card" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-5 grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 sm:gap-5"
        >
          <div className="sm:col-span-2">
            <label className="mb-2 block text-xs font-medium text-text-secondary sm:text-sm">
              Name on Card
            </label>
            <input
              value={formData.cardName || ""}
              onChange={(e) => onChange("cardName", e.target.value)}
              placeholder="John Doe"
              className={`min-h-11 w-full rounded-xl border bg-background px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-text-muted focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10 sm:min-h-12 ${
                errors.cardName
                  ? "border-red-500/70"
                  : "border-border"
              }`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-xs font-medium text-text-secondary sm:text-sm">
              Card Number
            </label>
            <input
              inputMode="numeric"
              value={formData.cardNumber || ""}
              onChange={(e) =>
                onChange("cardNumber", e.target.value)
              }
              placeholder="1234 5678 9012 3456"
              className={`min-h-11 w-full rounded-xl border bg-background px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-text-muted focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10 sm:min-h-12 ${
                errors.cardNumber
                  ? "border-red-500/70"
                  : "border-border"
              }`}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-text-secondary sm:text-sm">
              Expiry Date
            </label>
            <input
              value={formData.expiry || ""}
              onChange={(e) => onChange("expiry", e.target.value)}
              placeholder="MM/YY"
              className={`min-h-11 w-full rounded-xl border bg-background px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-text-muted focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10 sm:min-h-12 ${
                errors.expiry
                  ? "border-red-500/70"
                  : "border-border"
              }`}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-text-secondary sm:text-sm">
              CVV
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={formData.cvv || ""}
              onChange={(e) => onChange("cvv", e.target.value)}
              placeholder="•••"
              className={`min-h-11 w-full rounded-xl border bg-background px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-text-muted focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10 sm:min-h-12 ${
                errors.cvv
                  ? "border-red-500/70"
                  : "border-border"
              }`}
            />
          </div>
        </motion.div>
      )}

      {formData.paymentMethod === "upi" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5"
        >
          <label className="mb-2 block text-xs font-medium text-text-secondary sm:text-sm">
            UPI ID
          </label>
          <input
            placeholder="name@upi"
            className="min-h-11 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-text-muted focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10 sm:min-h-12"
          />
        </motion.div>
      )}

      {formData.paymentMethod === "wallet" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-xl border border-border bg-background p-4 text-sm text-text-secondary"
        >
          You will be redirected to your selected digital wallet to complete
          the payment securely.
        </motion.div>
      )}
    </motion.section>
  );
};

export default PaymentMethods;