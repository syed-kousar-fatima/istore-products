import React, { useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Package,
  Search,
  Truck,
  MapPin,
  Clock3,
} from "lucide-react";

const TrackOrder = () => {
  const navigate = useNavigate();
  const { orderId: routeOrderId } = useParams();
  const outletContext = useOutletContext() || {};

  const orders = outletContext.orders || [];
  const onTrackOrder =
    outletContext.onTrackOrder || outletContext.trackOrder;

  const [searchId, setSearchId] = useState(
    routeOrderId || ""
  );
  const [order, setOrder] = useState(() => {
    if (!routeOrderId) return null;

    return (
      orders.find(
        (item) =>
          String(item.id).toLowerCase() ===
            String(routeOrderId).toLowerCase() ||
          String(item.orderId).toLowerCase() ===
            String(routeOrderId).toLowerCase()
      ) || null
    );
  });

  const [error, setError] = useState("");

  const findOrder = (id) => {
    const normalizedId = String(id || "")
      .trim()
      .toLowerCase();

    if (!normalizedId) return null;

    if (typeof onTrackOrder === "function") {
      const trackedOrder = onTrackOrder(id);

      if (trackedOrder) {
        return trackedOrder;
      }
    }

    return (
      orders.find(
        (item) =>
          String(item.id || "").toLowerCase() ===
            normalizedId ||
          String(item.orderId || "").toLowerCase() ===
            normalizedId
      ) || null
    );
  };

  const handleTrackOrder = (event) => {
    event.preventDefault();

    const trimmedId = searchId.trim();

    if (!trimmedId) {
      setError("Please enter your order ID.");
      setOrder(null);
      return;
    }

    const foundOrder = findOrder(trimmedId);

    if (!foundOrder) {
      setError(
        "Order not found. Please check your order ID and try again."
      );
      setOrder(null);
      return;
    }

    setError("");
    setOrder(foundOrder);

    navigate(
      `/track-order/${encodeURIComponent(
        foundOrder.id || foundOrder.orderId
      )}`,
      {
        replace: true,
      }
    );
  };

  const tracking = useMemo(() => {
    const status = String(order?.status || "processing")
      .toLowerCase()
      .replace(/\s+/g, "_");

    const statusMap = {
      processing: 0,
      confirmed: 1,
      shipped: 2,
      out_for_delivery: 3,
      delivered: 4,
    };

    const currentStep =
      statusMap[status] !== undefined
        ? statusMap[status]
        : 0;

    const createdAt = order?.createdAt
      ? new Date(order.createdAt)
      : new Date();

    const shippedDate = new Date(createdAt);
    shippedDate.setDate(shippedDate.getDate() + 1);

    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    return {
      currentStep,
      createdAt,
      shippedDate,
      deliveryDate,
      status,
    };
  }, [order]);

  const steps = [
    {
      title: "Order Placed",
      description: "Your order has been received.",
      icon: CheckCircle2,
    },
    {
      title: "Order Confirmed",
      description: "Your order has been confirmed.",
      icon: Check,
    },
    {
      title: "Shipped",
      description: "Your package is on its way.",
      icon: Package,
    },
    {
      title: "Out for Delivery",
      description: "Your package is arriving soon.",
      icon: Truck,
    },
    {
      title: "Delivered",
      description: "Your order has been delivered.",
      icon: MapPin,
    },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#2997FF]">
            iStore Delivery
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Track your order.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
            Enter your iStore order ID to see the latest delivery
            status and tracking details.
          </p>
        </div>

        <form
          onSubmit={handleTrackOrder}
          className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />

            <input
              type="text"
              value={searchId}
              onChange={(event) => {
                setSearchId(event.target.value);
                setError("");
              }}
              placeholder="Enter order ID e.g. iStore-12345678"
              className="h-14 w-full rounded-full border border-white/10 bg-[#101010] pl-12 pr-5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#2997FF]"
            />
          </div>

          <button
            type="submit"
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:bg-[#2997FF] hover:text-white"
          >
            <Search className="h-4 w-4" />
            Track Order
          </button>
        </form>

        {error && (
          <div className="mx-auto mb-8 max-w-2xl rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {!order && !error && (
          <div className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-[#101010] p-8 text-center sm:p-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <Package className="h-7 w-7 text-white/50" />
            </div>

            <h2 className="text-xl font-semibold">
              Enter your order ID
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              Your tracking information will appear here after
              you enter a valid iStore order ID.
            </p>
          </div>
        )}

        {order && (
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-[#101010] p-5 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Order ID
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    {order.id || order.orderId}
                  </h2>

                  <p className="mt-2 text-sm text-white/40">
                    Placed on {formatDate(tracking.createdAt)}
                  </p>
                </div>

                <div className="rounded-full bg-[#2997FF]/10 px-4 py-2 text-sm font-medium capitalize text-[#2997FF]">
                  {String(order.status || "processing").replace(
                    /_/g,
                    " "
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[#101010] p-5 sm:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold">
                  Delivery Status
                </h2>

                <p className="mt-2 text-sm text-white/40">
                  Follow your order from placement to delivery.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-[19px] top-5 h-[calc(100%-40px)] w-px bg-white/10 sm:left-6" />

                <div
                  className="absolute left-[19px] top-5 w-px bg-[#2997FF] transition-all duration-700 sm:left-6"
                  style={{
                    height: `${Math.min(
                      tracking.currentStep,
                      steps.length - 1
                    ) * 25}%`,
                  }}
                />

                <div className="relative space-y-8">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const completed =
                      index <= tracking.currentStep;
                    const current =
                      index === tracking.currentStep;

                    return (
                      <div
                        key={step.title}
                        className="flex gap-5"
                      >
                        <div
                          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:h-12 sm:w-12 ${
                            completed
                              ? "border-[#2997FF] bg-[#2997FF] text-white"
                              : "border-white/10 bg-[#151515] text-white/25"
                          } ${
                            current
                              ? "shadow-[0_0_25px_rgba(41,151,255,0.35)]"
                              : ""
                          }`}
                        >
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>

                        <div className="pt-1">
                          <h3
                            className={`font-semibold ${
                              completed
                                ? "text-white"
                                : "text-white/30"
                            }`}
                          >
                            {step.title}
                          </h3>

                          <p
                            className={`mt-1 text-sm ${
                              completed
                                ? "text-white/45"
                                : "text-white/20"
                            }`}
                          >
                            {step.description}
                          </p>

                          {current && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-[#2997FF]">
                              <Clock3 className="h-3.5 w-3.5" />
                              Current status
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <div className="grid gap-6 md:grid-cols-2">
              <section className="rounded-[28px] border border-white/10 bg-[#101010] p-5 sm:p-7">
                <h2 className="text-lg font-semibold">
                  Delivery Information
                </h2>

                <div className="mt-5 space-y-4 text-sm">
                  <div>
                    <p className="text-white/30">
                      Estimated Delivery
                    </p>
                    <p className="mt-1 font-medium">
                      {formatDate(tracking.deliveryDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-white/30">
                      Shipping Address
                    </p>

                    <p className="mt-1 leading-6 text-white/70">
                      {order.shippingAddress?.address ||
                        "Address unavailable"}
                      <br />
                      {order.shippingAddress?.city || ""}
                      {order.shippingAddress?.city &&
                      order.shippingAddress?.state
                        ? ", "
                        : ""}
                      {order.shippingAddress?.state || ""}
                      <br />
                      {order.shippingAddress?.pincode || ""}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-white/10 bg-[#101010] p-5 sm:p-7">
                <h2 className="text-lg font-semibold">
                  Order Details
                </h2>

                <div className="mt-5 space-y-4">
                  {(order.items || []).map((item, index) => (
                    <div
                      key={`${item.id || item.name}-${index}`}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.04]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Package className="h-5 w-5 text-white/30" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-white/35">
                          Quantity:{" "}
                          {Number(item.quantity) || 1}
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

                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-white/40">
                      Total
                    </span>

                    <span className="text-lg font-semibold">
                      ₹
                      {Number(
                        order.total || 0
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/products"
                className="rounded-full bg-white px-7 py-3 text-center text-sm font-semibold text-black transition hover:bg-[#2997FF] hover:text-white"
              >
                Continue Shopping
              </Link>

              <button
                type="button"
                onClick={() => {
                  setSearchId("");
                  setOrder(null);
                  setError("");
                  navigate("/track-order");
                }}
                className="rounded-full border border-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Track Another Order
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TrackOrder;