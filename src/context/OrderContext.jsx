// context/OrderContext.jsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const OrderContext = createContext(null);

const getStoredOrders = () => {
  try {
    const stored = localStorage.getItem("iStore-orders");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `iStore-${timestamp}-${random}`;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(getStoredOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem("iStore-orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = useCallback((orderData) => {
    const order = {
      ...orderData,
      id: orderData.id || generateOrderId(),
      orderId: orderData.orderId || orderData.id || generateOrderId(),
      status: orderData.status || "confirmed",
      createdAt: orderData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: orderData.items || orderData.products || [],
      products: orderData.products || orderData.items || [],
    };

    setOrders((current) => [order, ...current]);
    setSelectedOrder(order);

    return order;
  }, []);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((current) =>
      current.map((order) =>
        String(order.id) === String(orderId) ||
        String(order.orderId) === String(orderId)
          ? {
              ...order,
              status,
              updatedAt: new Date().toISOString(),
            }
          : order
      )
    );

    setSelectedOrder((current) =>
      current &&
      (String(current.id) === String(orderId) ||
        String(current.orderId) === String(orderId))
        ? {
            ...current,
            status,
            updatedAt: new Date().toISOString(),
          }
        : current
    );
  }, []);

  const getOrder = useCallback(
    (orderId) =>
      orders.find(
        (order) =>
          String(order.id) === String(orderId) ||
          String(order.orderId) === String(orderId)
      ) || null,
    [orders]
  );

  const selectOrder = useCallback(
    (orderId) => {
      const order = getOrder(orderId);
      setSelectedOrder(order);
      return order;
    },
    [getOrder]
  );

  const deleteOrder = useCallback((orderId) => {
    setOrders((current) =>
      current.filter(
        (order) =>
          String(order.id) !== String(orderId) &&
          String(order.orderId) !== String(orderId)
      )
    );

    setSelectedOrder((current) =>
      current &&
      String(current.id) === String(orderId)
        ? null
        : current
    );
  }, []);

  const clearOrders = useCallback(() => {
    setOrders([]);
    setSelectedOrder(null);
  }, []);

  const orderCount = orders.length;

  const latestOrder = orders[0] || null;

  const value = useMemo(
    () => ({
      orders,
      setOrders,
      selectedOrder,
      setSelectedOrder,
      orderCount,
      latestOrder,
      createOrder,
      updateOrderStatus,
      getOrder,
      selectOrder,
      deleteOrder,
      clearOrders,
    }),
    [
      orders,
      selectedOrder,
      orderCount,
      latestOrder,
      createOrder,
      updateOrderStatus,
      getOrder,
      selectOrder,
      deleteOrder,
      clearOrders,
    ]
  );

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used inside OrderProvider");
  }

  return context;
};

export default OrderContext;