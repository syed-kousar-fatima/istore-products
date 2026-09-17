import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  TAX_RATE,
} from "./constants";

export const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase();

  return `NOVA-${timestamp}-${random}`;
};

export const calculateSubtotal = (items = []) => {
  return items.reduce(
    (total, item) =>
      total +
      (Number(item.price) || 0) *
        (Number(item.quantity) || 1),
    0
  );
};

export const calculateDiscount = (subtotal, coupon) => {
  if (!coupon || !coupon.type) {
    return 0;
  }

  if (coupon.type === "percentage") {
    return Math.min(
      subtotal,
      subtotal * ((Number(coupon.value) || 0) / 100)
    );
  }

  if (coupon.type === "fixed") {
    return Math.min(
      subtotal,
      Number(coupon.value) || 0
    );
  }

  return 0;
};

export const calculateTax = (
  subtotal,
  discount = 0,
  taxRate = TAX_RATE
) => {
  return Math.max(0, subtotal - discount) * taxRate;
};

export const calculateOrderTotal = ({
  subtotal = 0,
  discount = 0,
  shipping = 0,
  tax = 0,
}) => {
  return Math.max(
    0,
    Number(subtotal) -
      Number(discount) +
      Number(shipping) +
      Number(tax)
  );
};

export const calculateOrderSummary = (
  items = [],
  coupon = null,
  shipping = 0,
  taxRate = TAX_RATE
) => {
  const subtotal = calculateSubtotal(items);
  const discount = calculateDiscount(subtotal, coupon);
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * taxRate;
  const total = calculateOrderTotal({
    subtotal,
    discount,
    shipping,
    tax,
  });

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
  };
};

export const getOrderStatusLabel = (status) => {
  return (
    ORDER_STATUS_LABELS[String(status).toLowerCase()] ||
    "Order Placed"
  );
};

export const getStatusIndex = (status) => {
  const statuses = [
    ORDER_STATUS.PLACED,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PREPARING,
    ORDER_STATUS.SHIPPED,
    ORDER_STATUS.DELIVERED,
  ];

  const index = statuses.indexOf(
    String(status).toLowerCase()
  );

  return index === -1 ? 0 : index;
};

export const getTrackingSteps = (status) => {
  const currentIndex = getStatusIndex(status);

  const steps = [
    {
      id: ORDER_STATUS.PLACED,
      label: "Order Placed",
      description: "Your order has been received.",
    },
    {
      id: ORDER_STATUS.CONFIRMED,
      label: "Order Confirmed",
      description: "Your order has been confirmed.",
    },
    {
      id: ORDER_STATUS.PREPARING,
      label: "Preparing Order",
      description: "Your products are being prepared.",
    },
    {
      id: ORDER_STATUS.SHIPPED,
      label: "Shipped",
      description: "Your order is on its way.",
    },
    {
      id: ORDER_STATUS.DELIVERED,
      label: "Delivered",
      description: "Your order has been delivered.",
    },
  ];

  return steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex,
    current: index === currentIndex,
  }));
};

export const createOrder = ({
  items = [],
  customer = {},
  payment = {},
  coupon = null,
  shipping = 0,
}) => {
  const summary = calculateOrderSummary(
    items,
    coupon,
    shipping
  );

  const id = generateOrderId();
  const createdAt = new Date().toISOString();

  return {
    id,
    orderId: id,
    items,
    products: items,
    customer,
    payment,
    coupon,
    ...summary,
    status: ORDER_STATUS.CONFIRMED,
    createdAt,
    updatedAt: createdAt,
  };
};

export const normalizeOrder = (order = {}) => {
  const items = order.items || order.products || [];

  const summary = calculateOrderSummary(
    items,
    order.coupon || null,
    Number(order.shipping) || 0
  );

  return {
    ...order,
    id: order.id || order.orderId || generateOrderId(),
    orderId:
      order.orderId ||
      order.id ||
      generateOrderId(),
    items,
    products: order.products || items,
    ...summary,
    status:
      order.status || ORDER_STATUS.CONFIRMED,
    createdAt:
      order.createdAt || new Date().toISOString(),
    updatedAt:
      order.updatedAt || new Date().toISOString(),
  };
};

export const sortOrdersByDate = (
  orders = [],
  direction = "desc"
) => {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();

    return direction === "asc"
      ? dateA - dateB
      : dateB - dateA;
  });
};

export const getOrderItemCount = (order) => {
  const items = order?.items || order?.products || [];

  return items.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 1),
    0
  );
};

export const getEstimatedDelivery = (
  createdAt,
  days = 5
) => {
  const date = new Date(
    createdAt || Date.now()
  );

  date.setDate(date.getDate() + days);

  return date;
};