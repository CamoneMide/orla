"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion } from "motion/react";
import { useState, type ReactNode } from "react";

const loadMotionFeatures = () =>
  import("@/lib/motionFeatures").then((mod) => mod.default);

/**
 * `strict` makes a stray `motion.*` component throw instead of quietly pulling
 * the full bundle back into the initial JS — use `m.*` from "motion/react-m".
 * Every Motion animation here starts on a click (nav, accordion), well after
 * the features have arrived.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: false, retry: 1 },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <LazyMotion features={loadMotionFeatures} strict>
        {children}
      </LazyMotion>
    </QueryClientProvider>
  );
}
