import { useCallback, useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const getInitialValue = () => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue === null) {
        return typeof initialValue === "function"
          ? initialValue()
          : initialValue;
      }

      return JSON.parse(storedValue);
    } catch {
      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    }
  };

  const [value, setValue] = useState(getInitialValue);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  const setStoredValue = useCallback((newValue) => {
    setValue((currentValue) =>
      typeof newValue === "function"
        ? newValue(currentValue)
        : newValue
    );
  }, []);

  const removeStoredValue = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }

    setValue(
      typeof initialValue === "function"
        ? initialValue()
        : initialValue
    );
  }, [key, initialValue]);

  return [value, setStoredValue, removeStoredValue];
};

export { useLocalStorage };

export default useLocalStorage;