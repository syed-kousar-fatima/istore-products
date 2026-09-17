import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const ShippingAddress = ({ formData, onChange, errors = {} }) => {
  const fields = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "John",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Doe",
      type: "text",
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      type: "email",
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "+91 98765 43210",
      type: "tel",
    },
    {
      name: "address",
      label: "Street Address",
      placeholder: "123 Main Street",
      type: "text",
      full: true,
    },
    {
      name: "apartment",
      label: "Apartment, Suite, etc. (Optional)",
      placeholder: "Apartment 4B",
      type: "text",
      full: true,
    },
    {
      name: "city",
      label: "City",
      placeholder: "Bengaluru",
      type: "text",
    },
    {
      name: "state",
      label: "State",
      placeholder: "Karnataka",
      type: "text",
    },
    {
      name: "postalCode",
      label: "Postal Code",
      placeholder: "560001",
      type: "text",
    },
  ];

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
          <MapPin size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">
            Shipping Address
          </h2>
          <p className="mt-1 text-xs text-text-secondary sm:text-sm">
            Where should we deliver your order?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.full ? "sm:col-span-2" : ""}
          >
            <label className="mb-2 block text-xs font-medium text-text-secondary sm:text-sm">
              {field.label}
            </label>

            <input
              type={field.type}
              value={formData[field.name] || ""}
              onChange={(event) =>
                onChange(field.name, event.target.value)
              }
              placeholder={field.placeholder}
              autoComplete={field.name}
              className={`min-h-11 w-full rounded-xl border bg-background px-3.5 py-3 text-sm text-white outline-none transition-all placeholder:text-text-muted focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10 sm:min-h-12 sm:px-4 ${
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
      </div>
    </motion.section>
  );
};

export default ShippingAddress;