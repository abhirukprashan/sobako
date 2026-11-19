import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import ParallaxImage from "@/components/ParallaxImage";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

const VALUES = [
  {
    n: "01",
    title: "Grown Naturally",
    copy: "Heritage varieties cultivated without chemical inputs, the way generations of Sri Lankan farmers have done before us.",
  },
  {
    n: "02",
    title: "Small Batch",
    copy: "Every harvest is milled and packed in small batches so nothing sits on a shelf longer than it should.",
  },
  {
    n: "03",
    title: "Rooted Locally",
    copy: "We work directly with smallholder farming families across the island, paying fairly and investing in their land.",
  },
];

const STATS = [
  { value: "40+", label: "Farming Families" },
  { value: "12", label: "Heritage Varieties" },
  { value: "100%", label: "Naturally Grown" },
  { value: "Island-wide", label: "Delivery" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-between border-b px-6 py-12 md:px-10 md:py-16 lg:border-b-0 lg:border-r">
          <Reveal>
            <span className="label text-botanical">Our Story</span>
            <SplitText
              as="h1"
              lines={["Rooted in Sri", "Lankan soil"]}
              delay={120}
              stagger={75}
              className="mt-6 font-serif text-4xl leading-tight md:text-6xl"
            />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/70">
              Sobako began with a simple belief — that the grains and herbs our
              grandparents cooked with deserve a place on every modern table.
              We bring back traditional rice, herbal porridge and stone-milled
              flour, grown naturally and prepared with care.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/shop"
              className="pill mt-10 inline-flex self-start gap-2 text-[11px] uppercase tracking-widest"
            >
              Explore the Pantry <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
        <ParallaxImage
          src={u("photo-1500382017468-9049fed747ef")}
          alt="Rice fields in Sri Lanka"
          className="min-h-[360px] lg:min-h-[640px]"
        />
      </section>

      {/* Values */}
      <section className="hair-t grid grid-cols-1 md:grid-cols-3">
        {VALUES.map((v, i) => (
          <Reveal
            key={v.n}
            delay={i * 90}
            className={`px-6 py-10 md:px-10 md:py-14 ${
              i < VALUES.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
            }`}
          >
            <span
              className="label"
              style={{ color: "var(--botanical)" }}
            >
              {v.n}
            </span>
            <h2 className="mt-6 font-sans text-xl font-semibold uppercase tracking-tight">
              {v.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">{v.copy}</p>
          </Reveal>
        ))}
      </section>

      {/* Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 hair-t">
        <ParallaxImage
          src={u("photo-1592394533824-9440e5d68530")}
          alt="Hands holding freshly harvested grains"
          className="min-h-[320px] border-b lg:border-b-0 lg:border-r lg:min-h-[520px]"
        />
        <div className="flex flex-col justify-center px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <span className="label text-botanical">From Field to Table</span>
            <h2 className="mt-5 font-sans text-2xl font-semibold uppercase leading-tight tracking-tight md:text-3xl">
              A shorter journey
              <br />
              from the paddy
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/70">
              <p>
                We buy directly from the farmers who grow our rice, then mill
                gently to keep the bran and its goodness intact. No polishing,
                no blending, no shortcuts.
              </p>
              <p>
                Our porridge blends are ground fresh in small batches using
                herbs sourced from home gardens. What reaches your kitchen is
                as close to the harvest as we can make it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ background: "var(--botanical)", color: "var(--cream)" }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-10 text-center md:px-8 ${
              i < STATS.length - 1 ? "border-r border-white/20" : ""
            } ${i < 2 ? "border-b border-white/20 md:border-b-0" : ""}`}
          >
            <div className="font-serif text-3xl md:text-4xl">{s.value}</div>
            <div className="mt-2 text-[10px] uppercase tracking-widest text-cream/70">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="hair-t flex flex-col items-center gap-4 px-6 py-16 text-center md:px-10 md:py-20">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl">
            Taste the difference of real food
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/60">
            Traditional rice, herbal porridge and stone-milled flour — delivered
            island-wide, straight from the source.
          </p>
          <Link
            href="/shop"
            className="pill mt-8 inline-flex text-[11px] uppercase tracking-widest"
          >
            Shop Sobako
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
