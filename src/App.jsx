import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { motion } from "framer-motion";

import AppRoutes from "./routes/AppRoutes";

import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";

import SplashScreen from "./components/common/SplashScreen";

const App = () => {
  const [splashComplete, setSplashComplete] = useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <SplashScreen
                duration={5000}
                onComplete={() => setSplashComplete(true)}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: splashComplete ? 1 : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="min-h-screen w-full overflow-x-hidden bg-background text-text-primary"
              >
                <AppRoutes />
              </motion.div>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;