export function isDarkTheme() {
  return document.documentElement.classList.contains("dark");
}

export function subscribeToTheme(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const updateSystemTheme = () => {
    if (!localStorage.getItem("theme")) {
      document.documentElement.classList.toggle("dark", media.matches);
      callback();
    }
  };
  window.addEventListener("theme-change", callback);
  media.addEventListener("change", updateSystemTheme);
  return () => {
    window.removeEventListener("theme-change", callback);
    media.removeEventListener("change", updateSystemTheme);
  };
}

export function toggleTheme() {
  const dark = !isDarkTheme();
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
  window.dispatchEvent(new Event("theme-change"));
}
