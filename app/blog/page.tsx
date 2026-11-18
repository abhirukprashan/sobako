import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const POSTS = [
  {
    category: "Heritage",
    date: "12 November 2026",
    title: "Why Kalu Heenati deserves a place in your kitchen",
    excerpt:
      "The deep red grain that once fed whole villages is rich in fibre, antioxidants and quiet, nutty flavour. Here is how to cook it right.",
    image: u("photo-1586201375761-83865001e31c"),
    href: "/products/kalu-heenati-rice",
  },
  {
    category: "Wellness",
    date: "28 October 2026",
    title: "Kola kanda, the original Sri Lankan breakfast",
    excerpt:
      "A bowl of green herbal porridge has been the island's morning ritual for centuries. We trace its roots — and its quiet power.",
    image: u("photo-1512621776951-a57141f2eefd"),
    href: "/shop?cat=HERBAL",
  },
  {
    category: "Kitchen",
    date: "9 October 2026",
    title: "Stone-milling: why slower flour tastes better",
    excerpt:
      "Modern roller mills strip flavour along with the germ. Stone milling keeps the whole grain — and the character — intact.",
    image: u("photo-1509440159596-0249088772ff"),
    href: "/shop?cat=FLOUR",
  },
  {
    category: "Recipes",
    date: "21 September 2026",
    title: "Three pantry dinners built on red rice",
    excerpt:
      "From a quick dhal bowl to a slow Sunday curry, these weeknight plates let heritage rice do the heavy lifting.",
    image: u("photo-1547592180-85f173990554"),
    href: "/recipes",
  },
  {
    category: "Sourcing",
    date: "2 September 2026",
    title: "Meet the farmers behind our harvest",
    excerpt:
      "We travelled to Anuradhapura to meet the families who grow our rice — and to learn how fair prices change a village.",
    image: u("photo-1500382017468-9049fed747ef"),
    href: "/about",
  },
  {
    category: "Kitchen",
    date: "14 August 2026",
    title: "A beginner's guide to heritage rice varieties",
    excerpt:
      "Suwandel, Batapolal, Kahamala — each grain has its own texture and story. Our field guide helps you choose.",
    image: u("photo-1536304929831-ee1ca9d44906"),
    href: "/shop?cat=RICE",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <div>
      {/* Hero */}
      <section className="hair-b px-6 py-12 text-center md:px-10 md:py-20">
        <Reveal>
          <span className="label text-botanical">Our Blog</span>
          <h1 className="mt-5 font-serif text-4xl md:text-6xl">
            The Sobako Journal
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink/60">
            Stories from the paddy, notes from the kitchen, and a little pantry
            wisdom — written for people who care where their food comes from.
          </p>
        </Reveal>
      </section>

      {/* Featured */}
      <section className="grid grid-cols-1 lg:grid-cols-2 hair-b">
        <div className="relative overflow-hidden border-b lg:border-b-0 lg:border-r">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.image}
            alt={featured.title}
            className="h-full max-h-[520px] w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-ink/45">
              <span style={{ color: "var(--botanical)" }}>
                {featured.category}
              </span>
              <span>·</span>
              <span>{featured.date}</span>
            </div>
            <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">
              {featured.excerpt}
            </p>
            <Link
              href={featured.href}
              className="pill mt-8 inline-flex self-start gap-2 text-[11px] uppercase tracking-widest"
            >
              Read Story <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal
            key={p.title}
            delay={(i % 3) * 80}
            className={`border-b md:border-r ${
              i % 3 === 2 ? "md:border-r-0" : ""
            }`}
          >
            <article className="group flex h-full flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-[#eee9df]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-[600ms] ease-apple group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col px-6 py-7 md:px-7">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-ink/45">
                  <span style={{ color: "var(--botanical)" }}>
                    {p.category}
                  </span>
                  <span>·</span>
                  <span>{p.date}</span>
                </div>
                <h3 className="mt-4 font-serif text-xl leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {p.excerpt}
                </p>
                <Link
                  href={p.href}
                  className="label mt-5 inline-flex items-center gap-2 pt-1 transition-opacity hover:opacity-60"
                >
                  Read More <ArrowRight size={12} strokeWidth={1.5} />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Newsletter */}
      <NewsletterBand />
    </div>
  );
}

function NewsletterBand() {
  return (
    <section
      className="px-6 py-14 text-center md:px-10 md:py-20"
      style={{ background: "var(--botanical)", color: "var(--cream)" }}
    >
      <Reveal>
        <span className="label text-cream/70">Join The Table</span>
        <h2 className="mt-4 font-serif text-3xl md:text-4xl">
          New stories, straight to your inbox
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/75">
          Seasonal recipes, harvest notes and early access to new releases.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-full border border-cream/60 px-7 py-3 text-[11px] uppercase tracking-widest transition-colors duration-300 hover:bg-cream hover:text-ink"
        >
          Get In Touch
        </Link>
      </Reveal>
    </section>
  );
}
