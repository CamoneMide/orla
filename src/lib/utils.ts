export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Measured off the original. Every reveal on the site uses these. */
export const EASE_QUINT = [0.22, 1, 0.36, 1] as const;
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;
export const DUR = { clip: 0.35, move: 1.2, fade: 0.2 } as const;

/** `?ready=1` renders the resting state with no intro — verification depends on it. */
export function skipMotion(): boolean {
  if (typeof window === "undefined") return false;
  const q = new URLSearchParams(window.location.search);
  if (q.get("ready") === "1") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function formatMoney(amount: number, currency = "EUR") {
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : "";
  return `${symbol}${amount.toLocaleString("en-IE")}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
