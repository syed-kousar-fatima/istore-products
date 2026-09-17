import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import ShippingAddress from "./ShippingAddress";
import PaymentMethods from "./PaymentMethods";
import CouponSection from "./CouponSection";
import BillingDetails from "./BillingDetails";
import OrderSummary from "./OrderSummary";

const CheckoutForm = ({
  cart = [],
  onSubmit,
  onBack,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    billingSameAsShipping: true,
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingPostalCode: "",
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    ...initialData,
  });

  const [coupon, setCoupon] = useState(null);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
    ];

    const nextErrors = {};

    required.forEach((field) => {
      if (!String(formData[field] || "").trim()) {
        nextErrors[field] = "This field is required";
      }
    });

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!formData.billingSameAsShipping) {
      ["billingAddress", "billingCity", "billingState", "billingPostalCode"].forEach(
        (field) => {
          if (!String(formData[field] || "").trim()) {
            nextErrors[field] = "This field is required";
          }
        }
      );
    }

    if (formData.paymentMethod === "card") {
      ["cardName", "cardNumber", "expiry", "cvv"].forEach((field) => {
        if (!String(formData[field] || "").trim()) {
          nextErrors[field] = "This field is required";
        }
      });
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    onSubmit?.({
      ...formData,
      coupon,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[1800px]"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-8 2xl:grid-cols-[minmax(0,1fr)_460px] 3xl:gap-12">
        <div className="space-y-5 sm:space-y-6 lg:space-y-7">
          <ShippingAddress
            formData={formData}
            onChange={updateField}
            errors={errors}
          />

          <PaymentMethods
            formData={formData}
            onChange={updateField}
            errors={errors}
          />

          <BillingDetails
            formData={formData}
            onChange={updateField}
            errors={errors}
          />

          <CouponSection
            coupon={coupon}
            onApply={setCoupon}
          />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary
            cart={cart}
            coupon={coupon}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-white/20 hover:text-white sm:min-h-12 sm:px-6"
        >
          <ArrowLeft size={17} />
          Back to Cart
        </motion.button>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-apple-blue px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:bg-apple-blue-light sm:min-h-14 sm:w-auto sm:min-w-[220px] sm:px-8 sm:text-base lg:min-w-[250px]"
        >
          <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
          <LockKeyhole size={17} className="relative" />
          <span className="relative">Place Order</span>
          <ArrowRight
            size={18}
            className="relative transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-text-muted sm:text-sm">
        <CheckCircle2 size={15} className="shrink-0 text-green-400" />
        Secure checkout with encrypted payment
      </div>
    </form>
  );
};

export default CheckoutForm;