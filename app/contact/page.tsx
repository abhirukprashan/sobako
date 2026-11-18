"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";

const DETAILS = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+94 77 726 0532",
    href: "tel:+94777260532",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@sobakoproducts.com",
    href: "mailto:info@sobakoproducts.com",
  },
  {
    icon: MapPin,
    label: "Visit",
    value: "Colombo, Sri Lanka",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat, 9am – 6pm",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const field =
    "w-full border border-hair bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-ink placeholder:text-ink/35";

  return (
    <div>
      {/* Hero */}
      <section className="hair-b px-6 py-12 text-center md:px-10 md:py-20">
        <Reveal>
          <span className="label text-botanical">Contact</span>
          <h1 className="mt-5 font-serif text-4xl md:text-6xl">
            Say hello
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink/60">
            Questions about an order, wholesale enquiries or just a recipe to
            share — we would love to hear from you.
          </p>
        </Reveal>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Form */}
        <div className="border-b px-6 py-12 md:px-10 md:py-16 lg:border-b-0 lg:border-r">
          <Reveal>
            <h2 className="label mb-8">Send a Message</h2>
            {sent ? (
              <div className="max-w-md border border-hair px-6 py-10 text-center">
                <p className="font-serif text-2xl">Message received</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  Thank you for reaching out. Our team will get back to you
                  within one business day.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="pill mt-6 text-[11px] uppercase tracking-widest"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (form.name && form.email && form.message) setSent(true);
                }}
                className="max-w-md space-y-5"
              >
                <div>
                  <label htmlFor="name" className="label mb-2 block text-ink/50">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label mb-2 block text-ink/50">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="label mb-2 block text-ink/50">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="How can we help?"
                    className={`${field} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 py-4 text-[11px] uppercase tracking-widest transition-opacity duration-300 hover:opacity-90"
                  style={{
                    background: "var(--botanical)",
                    color: "var(--cream)",
                  }}
                >
                  Send Message <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </form>
            )}
          </Reveal>
        </div>

        {/* Details */}
        <div className="px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <h2 className="label mb-8">Reach Us Directly</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {DETAILS.map((d) => {
                const Icon = d.icon;
                const content = (
                  <>
                    <Icon
                      size={18}
                      strokeWidth={1.25}
                      style={{ color: "var(--botanical)" }}
                    />
                    <span className="label mt-4 block text-ink/40">
                      {d.label}
                    </span>
                    <span className="mt-1 block text-sm">{d.value}</span>
                  </>
                );
                return d.href ? (
                  <a
                    key={d.label}
                    href={d.href}
                    className="transition-opacity hover:opacity-60"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={d.label}>{content}</div>
                );
              })}
            </div>

            <div className="mt-12 border-t border-hair pt-8">
              <span className="label text-ink/40">Follow Along</span>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {["Instagram", "Facebook", "TikTok", "YouTube"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="transition-opacity hover:opacity-60"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
