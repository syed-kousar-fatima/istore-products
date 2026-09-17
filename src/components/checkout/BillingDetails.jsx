import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const BillingDetails = ({ formData, onChange, errors = {} }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-card p-4 sm:p-6 lg:rounded-3xl lg:p-8 2xl:p-10"
    >
      <div className="mb-5 flex items-center gap-3 sm:mb-7">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-apple-blue/10 text-apple-blue sm:h-11 sm:w-11">
          <FileText size={19} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">
            Billing Details
          </h2>
          <p className="mt-1 text-xs text-text-secondary sm:text-sm">
            Choose where your billing information should be sent.
          </p>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-3.5 transition-colors hover:border-white/20 sm:p-4">
        <input
          type="checkbox"
          checked={Boolean(formData.billingSameAsShipping)}
          onChange={(e) =>
            onChange("billingSameAsShipping", e.target.checked)
          }
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#0071E3]"
        />

        <span>
          <span className="block text-sm font-medium text-white sm:text-base">
            Billing address same as shipping
          </span>
          <span className="mt-1 block text-xs leading-5 text-text-secondary sm:text-sm">
            Use the shipping address for billing.
          </span>
        </span>
      </label>

      {!formData.billingSameAsShipping && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-5 grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 sm:gap-5"
        >
          {[
            {
              name: "billingAddress",
              label: "Billing Address",
              placeholder: "Street address",
              full: true,
            },
            {
              name: "billingCity",
              label: "City",
              placeholder: "City",
            },
            {
              name: "billingState",
              label: "State",
              placeholder: "State",
            },
            {
              name: "billingPostalCode",
              label: "Postal Code",
              placeholder: "Postal code",
            },
          ].map((field) => (
            <div
              key={field.name}
              className={field.full ? "sm:col-span-2" : ""}
            >
              <label className="mb-2 block text-xs font-medium text-text-secondary sm:text-sm">
                {field.label}
              </label>

              <input
                value={formData[field.name] || ""}
                onChange={(e) =>
                  onChange(field.name, e.target.value)
                }
                placeholder={field.placeholder}
                className={`min-h-11 w-full rounded-xl border bg-background px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-text-muted focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10 sm:min-h-12 ${
                  errors[field.name]
                    ? "border-red-500/70"
                    : "border-border"
                }`}
              />

              {errors[field.name] && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default BillingDetails;