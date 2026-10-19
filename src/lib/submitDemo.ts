/**
 * Every form on this site is front-end only. This is the whole "backend":
 * a simulated round-trip that resolves and keeps nothing.
 *
 * Deliberately not a fetch to anywhere — there is no endpoint, and adding one
 * would make the site quietly start collecting real addresses.
 */
export async function submitDemo(values: Record<string, unknown>) {
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));
  if (process.env.NODE_ENV === "development") {
    console.info("[orla] form submitted (discarded):", Object.keys(values));
  }
  return { ok: true as const };
}
