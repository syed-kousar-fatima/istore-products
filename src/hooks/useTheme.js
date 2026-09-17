import { useCallback } from "react";
import { useTheme as useThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const context = useThemeContext();

  const toggle = useCallback(() => {
    context.toggleTheme();
  }, [context]);

  const dark = useCallback(() => {
    context.setDarkMode();
  }, [context]);

  const light = useCallback(() => {
    context.setLightMode();
  }, [context]);

  return {
    ...context,
    toggle,
    dark,
    light,
  };
};

export default useTheme;
export { useTheme };