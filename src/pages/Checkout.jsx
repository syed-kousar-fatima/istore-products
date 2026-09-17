import React, { useMemo, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShieldCheck,
  Smartphone,
  Truck,
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};

  const cart = outletContext.cart || [];
  const onPlaceOrder =
    outletContext.onPlaceOrder || outletContext.placeOrder;
  const onClearCart =
    outletContext.onClearCart || outletContext.clearCart;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const [errors, setErrors] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);

  const summary = useMemo(() => {
    const subtotal = cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          (Number(item.quantity) || 1),
      0
    );

    const shipping = subtotal >= 100000 || subtotal === 0 ? 0 : 999;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
    };
  }, [cart]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    const requiredFields = [
      ["firstName", "First name is required"],
      ["lastName", "Last name is required"],
      ["email", "Email is required"],
      ["phone", "Phone number is required"],
      ["address", "Address is required"],
      ["city", "City is required"],
      ["state", "State is required"],
      ["pincode", "Pincode is required"],
    ];

    requiredFields.forEach(([field, message]) => {
      if (!form[field].trim()) {
        newErrors[field] = message;
      }
    });

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (
      form.phone &&
      !/^[0-9]{10}$/.test(form.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (
      form.pincode &&
      !/^[0-9]{6}$/.test(form.pincode)
    ) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    if (form.paymentMethod === "card") {
      if (!form.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      }

      if (!form.expiry.trim()) {
        newErrors.expiry = "Expiry date is required";
      }

      if (!form.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      }
    }

    if (form.paymentMethod === "upi") {
      if (!form.upiId.trim()) {
        newErrors.upiId = "UPI ID is required";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (placingOrder) return;

    if (!cart.length) {
      navigate("/cart");
      return;
    }

    if (!validate()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    if (!onPlaceOrder) {
      console.error("Place Order handler is missing");
      return;
    }

    setPlacingOrder(true);

    const orderId = `iStore-${Date.now()
      .toString()
      .slice(-8)}`;

    const order = {
      id: orderId,
      orderId,
      items: cart.map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 1,
      })),
      customer: {
        firstName: form.firstName,
        lastName: form.lastName,
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
      },
      shippingAddress: {
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      },
      paymentMethod: form.paymentMethod,
      subtotal: summary.subtotal,
      shipping: summary.shipping,
      tax: summary.tax,
      total: summary.total,
      status: "processing",
      createdAt: new Date().toISOString(),
    };

    try {
      const createdOrder = await Promise.resolve(
        onPlaceOrder(order)
      );

      const finalOrderId =
        createdOrder?.id ||
        createdOrder?.orderId ||
        orderId;

      onClearCart?.();

      navigate(
        `/order-confirmation?orderId=${encodeURIComponent(
          finalOrderId
        )}`,
        {
          replace: true,
          state: {
            orderId: finalOrderId,
          },
        }
      );
    } catch (error) {
      console.error("Order placement failed:", error);
      setPlacingOrder(false);
    }
  };

  if (!cart.length) {
    return (
      <main className="min-h-screen bg-black px-4 py-24 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <Truck className="h-9 w-9 text-white/70" />
          </div>

          <h1 className="text-3xl font-semibold sm:text-4xl">
            Your cart is empty
          </h1>

          <p className="mt-4 text-white/50">
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-black transition hover:bg-[#2997FF] hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#2997FF]";

  const errorClass =
    "mt-1 text-xs text-red-400";

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#2997FF]">
            Secure Checkout
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Complete your order.
          </h1>

          <p className="mt-3 text-white/45">
            Enter your details and choose your preferred payment method.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="space-y-6">
              <section className="rounded-[28px] border border-white/10 bg-[#101010] p-5 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      Contact Information
                    </h2>
                    <p className="text-sm text-white/40">
                      We'll use this to send your order updates.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-white/60">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <p className={errorClass}>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-white/60">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <p className={errorClass}>
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-white/60">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className={errorClass}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-white/60">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && (
                      <p className={errorClass}>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-white/10 bg-[#101010] p-5 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      Shipping Address
                    </h2>
                    <p className="text-sm text-white/40">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/60">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="House number, street, area"
                    />
                    {errors.address && (
                      <p className={errorClass}>
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="text-sm text-white/60">
                        City
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className={errorClass}>
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-white/60">
                        State
                      </label>
                      <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="State"
                      />
                      {errors.state && (
                        <p className={errorClass}>
                          {errors.state}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-white/60">
                        Pincode
                      </label>
                      <input
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Pincode"
                      />
                      {errors.pincode && (
                        <p className={errorClass}>
                          {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-white/10 bg-[#101010] p-5 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <CreditCard className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      Payment Method
                    </h2>
                    <p className="text-sm text-white/40">
                      Choose how you want to pay.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      id: "card",
                      label: "Card",
                      icon: CreditCard,
                    },
                    {
                      id: "upi",
                      label: "UPI",
                      icon: Smartphone,
                    },
                    {
                      id: "cod",
                      label: "Cash on Delivery",
                      icon: Truck,
                    },
                  ].map((method) => {
                    const Icon = method.icon;

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            paymentMethod: method.id,
                          }))
                        }
                        className={`rounded-2xl border p-4 text-left transition ${
                          form.paymentMethod === method.id
                            ? "border-[#2997FF] bg-[#2997FF]/10"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20"
                        }`}
                      >
                        <Icon className="mb-3 h-5 w-5" />

                        <p className="text-sm font-semibold">
                          {method.label}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {form.paymentMethod === "card" && (
                  <div className="mt-6 grid gap-4">
                    <div>
                      <label className="text-sm text-white/60">
                        Card Number
                      </label>
                      <input
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="1234 5678 9012 3456"
                        inputMode="numeric"
                      />
                      {errors.cardNumber && (
                        <p className={errorClass}>
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm text-white/60">
                          Expiry
                        </label>
                        <input
                          name="expiry"
                          value={form.expiry}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="MM/YY"
                        />
                        {errors.expiry && (
                          <p className={errorClass}>
                            {errors.expiry}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm text-white/60">
                          CVV
                        </label>
                        <input
                          name="cvv"
                          value={form.cvv}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="123"
                          type="password"
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <p className={errorClass}>
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {form.paymentMethod === "upi" && (
                  <div className="mt-6">
                    <label className="text-sm text-white/60">
                      UPI ID
                    </label>

                    <input
                      name="upiId"
                      value={form.upiId}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="yourname@upi"
                    />

                    {errors.upiId && (
                      <p className={errorClass}>
                        {errors.upiId}
                      </p>
                    )}
                  </div>
                )}

                {form.paymentMethod === "cod" && (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/55">
                    Pay when your iStore order is delivered to your
                    address.
                  </div>
                )}
              </section>
            </div>

            <aside className="h-fit lg:sticky lg:top-24">
              <div className="rounded-[28px] border border-white/10 bg-[#101010] p-5 sm:p-7">
                <h2 className="text-xl font-semibold">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedStorage || ""}-${item.selectedColor || ""}`}
                      className="flex gap-3"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.05]">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          Qty: {Number(item.quantity) || 1}
                        </p>
                      </div>

                      <p className="text-sm font-semibold">
                        ₹
                        {(
                          Number(item.price || 0) *
                          (Number(item.quantity) || 1)
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="my-6 h-px bg-white/10" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-white/50">
                    <span>Subtotal</span>
                    <span>
                      ₹{summary.subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-white/50">
                    <span>Shipping</span>
                    <span>
                      {summary.shipping === 0
                        ? "Free"
                        : `₹${summary.shipping.toLocaleString(
                            "en-IN"
                          )}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-white/50">
                    <span>Tax</span>
                    <span>
                      ₹{summary.tax.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="my-6 h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <span className="text-base text-white/60">
                    Total
                  </span>

                  <span className="text-2xl font-semibold">
                    ₹{summary.total.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={placingOrder}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-semibold text-black transition-all hover:bg-[#2997FF] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {placingOrder ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Place Order
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-white/30">
                  Your order will be saved and you'll be redirected
                  to the order confirmation page.
                </p>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;