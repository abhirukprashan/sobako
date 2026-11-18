import Link from "next/link";
import { ArrowRight, Package, Ship, BadgeCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

const CATEGORIES = [
  {
    id: "rice",
    name: "Rice",
    copy: "Heritage and everyday rice varieties in bulk, milled to your specification and packed for export.",
  },
  {
    id: "spices",
    name: "Spices",
    copy: "Ceylon cinnamon, cloves, cardamom, pepper and more — sourced from trusted growing regions.",
  },
  {
    id: "brine",
    name: "Brine",
    copy: "Traditional brined and pickled products prepared with time-honoured recipes and modern hygiene standards.",
  },
  {
    id: "kithul",
    name: "Kithul & Coconut Based Products",
    copy: "Kithul treacle, jaggery and coconut-based staples with authentic island flavour.",
  },
  {
    id: "ready-to-eat",
    name: "Ready to Eat",
    copy: "Convenient, shelf-stable meals that keep the taste of a home-cooked Sri Lankan kitchen.",
  },
  {
    id: "curry-mixes",
    name: "Curry Mixes",
    copy: "Authentic spice blends for classic dishes, ground fresh and blended for consistency.",
  },
  {
    id: "dehydrated",
    name: "Dehydrated Fruits & Vegetables",
    copy: "Naturally dried produce that retains colour, nutrition and flavour for food manufacturers.",
  },
  {
    id: "sobako",
    name: "Sobako Products",
    copy: "Our own retail range of porridge, flour and pasta — available for wholesale and private label.",
  },
];

const STEPS = [
  {
    icon: Package,
    title: "Tell Us Your Needs",
    copy: "Share your product list, volumes, packaging and destination. We'll match you with the right supply.",
  },
  {
    icon: BadgeCheck,
    title: "Sample & Approve",
    copy: "We send samples for your team to taste and test. Specifications and pricing are agreed up front.",
  },
  {
    icon: Ship,
    title: "Pack & Ship",
    copy: "Orders are prepared in small batches, documented and shipped with reliable logistics partners.",
  },
];

export default function B2BPage() {
  return (
    <div>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-between border-b px-6 py-12 md:px-10 md:py-16 lg:border-b-0 lg:border-r">
          <Reveal>
            <span className="label text-botanical">Wholesale & Export</span>
            <h1 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">
              Sobako
              <br />
              for business
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/70">
              Reliable supply of authentic Sri Lankan rice, spices, coconut
              products and ready-to-eat foods — for retailers, distributors,
              hotels and food manufacturers around the world.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/contact"
              className="pill mt-10 inline-flex self-start gap-2 text-[11px] uppercase tracking-widest"
            >
              Request a Quote <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
        <ParallaxImage
          src={u("photo-1586528116311-ad8dd3c8310d")}
          alt="Packaged goods ready for wholesale"
          className="min-h-[340px] lg:min-h-[640px]"
        />
      </section>

      {/* Categories */}
      <section className="hair-t">
        <Divider label="Our B2B Range" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <Reveal
              key={c.id}
              delay={(i % 2) * 80}
              className={`scroll-mt-28 border-b px-6 py-9 md:px-10 ${
                i % 2 === 0 ? "md:border-r" : ""
              }`}
            >
              <div id={c.id} className="scroll-mt-28">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-sans text-lg font-semibold uppercase tracking-tight md:text-xl">
                    {c.name}
                  </h2>
                  <span className="label text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">
                  {c.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="hair-t grid grid-cols-1 md:grid-cols-3">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal
              key={s.title}
              delay={i * 80}
              className={`px-6 py-10 md:px-10 md:py-14 ${
                i < STEPS.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
              }`}
            >
              <Icon
                size={22}
                strokeWidth={1.25}
                style={{ color: "var(--botanical)" }}
              />
              <h3 className="mt-5 font-sans text-base font-semibold uppercase tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {s.copy}
              </p>
            </Reveal>
          );
        })}
      </section>

      {/* CTA */}
      <section
        className="flex flex-col items-center gap-4 px-6 py-14 text-center md:px-10 md:py-20"
        style={{ background: "var(--botanical)", color: "var(--cream)" }}
      >
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl">
            Let&apos;s build a supply partnership
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/75">
            Tell us what you need and our team will respond within two business
            days with samples, specifications and pricing.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full border border-cream/60 px-7 py-3 text-[11px] uppercase tracking-widest transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            Contact Our Team
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="hair-b px-6 py-6 md:px-10">
      <h2 className="label">{label}</h2>
    </div>
  );
}
