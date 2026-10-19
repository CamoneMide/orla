import { create } from "zustand";

type UiState = {
  menuOpen: boolean;
  /**
   * True while the page curtain hides the page (the intro, or a navigation
   * between its cover and its lift). The reveal system waits on it, so
   * above-the-fold reveals play as the curtain lifts instead of behind it.
   *
   * Starts true when `js-ready` is already on <html>: that class is set by the
   * blocking script in <head> exactly when the intro is going to run, and the
   * store has to agree before any effect reads it — the reveal hook mounts
   * ahead of the curtain in the tree.
   */
  covered: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  setCovered: (covered: boolean) => void;
};

export const useUi = create<UiState>((set) => ({
  menuOpen: false,
  covered:
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("js-ready"),
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  setCovered: (covered) => set({ covered }),
}));

/** Resolves once the curtain is off the page (immediately if it already is). */
export function whenUncovered(): Promise<void> {
  return new Promise((resolve) => {
    if (!useUi.getState().covered) return resolve();
    const stop = useUi.subscribe((s) => {
      if (s.covered) return;
      stop();
      resolve();
    });
  });
}
