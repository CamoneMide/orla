import type { Metadata } from "next";

import { contact } from "@/content/forms";
import { faq } from "@/content/home";
import { product } from "@/config/product";
import { Faq } from "@/components/sections/Faq";
import { Closer } from "@/components/sections/Closer";
import { Reveal } from "@/components/ui/Reveal";
import { Split } from "@/components/ui/Type";
import { DemoForm } from "@/components/forms/DemoForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your home. A person reads every message.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative z-10 bg-warm pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-page">
          <Reveal className="grid overflow-hidden rounded-lg border border-line md:grid-cols-2">
            {/* Left column */}
            <div className="bg-ground p-8 md:p-10">
              <p
                className="h-display text-faint"
                aria-hidden="true"
                style={{ lineHeight: 0.95 }}
              >
                {contact.ghost}
              </p>

              <Split
                heading={contact.heading}
                as="h1"
                className="mt-2 max-w-[14ch]"
              />

              <p className="mt-6 max-w-[36ch] font-body text-20 leading-[1.6] text-ink-2">
                {contact.body}
              </p>

              <div className="mt-10 border-t border-line pt-6">
                <p className="micro mb-4 text-ink-3">{contact.followLabel}</p>
                <ul className="flex flex-col gap-2.5">
                  {product.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-body text-14 uppercase tracking-[-0.02em] text-ink-2 transition-colors duration-200 hover:text-ink"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <p className="micro mb-3 text-ink-3">{contact.writeLabel}</p>
                <a
                  href={`mailto:${product.contact.email}`}
                  className="font-display text-24 font-medium text-ink underline-offset-4 hover:underline"
                >
                  {product.contact.email}
                </a>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <p className="micro mb-4 text-ink-3">{contact.businessLabel}</p>
                <div className="grid gap-8 sm:grid-cols-2">
                  {product.contact.studios.map((s) => (
                    <address
                      key={s.label}
                      className="not-italic font-body text-14 uppercase leading-[1.6] tracking-[-0.02em] text-ink-2"
                    >
                      <span className="block text-ink">{s.label}</span>
                      {s.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — the form */}
            <div className="bg-ground p-8 md:border-l md:border-line md:p-10">
              <DemoForm
                numbered
                fields={contact.fields}
                submitLabel={contact.submit}
                note={contact.note}
                success={contact.success}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Faq data={faq} className="bg-ground" />
      <Closer />
    </>
  );
}
