import { useCallback, useMemo } from "react";
import { useOrder as useOrderContext } from "../context/OrderContext";

const useOrder = () => {
  const context = useOrderContext();

  const getOrderById = useCallback(
    (orderId) => context.getOrder(orderId),
    [context]
  );

  const createNewOrder = useCallback(
    (orderData) => context.createOrder(orderData),
    [context]
  );

  const updateStatus = useCallback(
    (orderId, status) => context.updateOrderStatus(orderId, status),
    [context]
  );

  const selectOrderById = useCallback(
    (orderId) => context.selectOrder(orderId),
    [context]
  );

  const hasOrders = context.orders.length > 0;

  const completedOrders = useMemo(
    () =>
      context.orders.filter((order) =>
        ["delivered", "completed"].includes(
          String(order.status).toLowerCase()
        )
      ),
    [context.orders]
  );

  const activeOrders = useMemo(
    () =>
      context.orders.filter(
        (order) =>
          !["delivered", "completed", "cancelled"].includes(
            String(order.status).toLowerCase()
          )
      ),
    [context.orders]
  );

  const totalSpent = useMemo(
    () =>
      context.orders.reduce(
        (total, order) => total + (Number(order.total) || 0),
        0
      ),
    [context.orders]
  );

  return {
    ...context,
    getOrderById,
    createNewOrder,
    updateStatus,
    selectOrderById,
    hasOrders,
    activeOrders,
    completedOrders,
    totalSpent,
  };
};

export default useOrder;
export { useOrder };