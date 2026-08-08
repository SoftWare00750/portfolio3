import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch (e) {
    // localStorage may be unavailable (private browsing, etc.) - fall back
  }
  return "light";
};

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Keep <html data-theme="..."> and localStorage in sync whenever the
  // theme changes, so the loading screen and every themed color variable
  // (which read the data-theme attribute) update immediately, and the
  // choice is remembered on future visits/refreshes.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore write failures
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, setTheme, toggleTheme };
}
