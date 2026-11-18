import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const RECIPES = [
  {
    title: "Kola Kanda with Coconut",
    category: "Breakfast",
    time: "20 min",
    serves: "2",
    image: u("photo-1512621776951-a57141f2eefd"),
    copy: "The island's original green porridge — herbal, soothing and best eaten warm with a little jaggery.",
    href: "/shop?cat=HERBAL",
  },
  {
    title: "Kalu Heenati Red Rice & Dhal",
    category: "Everyday",
    time: "40 min",
    serves: "4",
    image: u("photo-1547592180-85f173990554"),
    copy: "A nutty heritage rice bowl with creamy tempered dhal and pol sambol on the side.",
    href: "/products/kalu-heenati-rice",
  },
  {
    title: "Herbal Porridge with Jaggery",
    category: "Wellness",
    time: "25 min",
    serves: "2",
    image: u("photo-1490645935967-10de6ba17061"),
    copy: "Our heenbovitiya blend simmered in thick coconut milk and finished with kithul jaggery.",
    href: "/shop?cat=PORRIDGE",
  },
  {
    title: "Stone-Milled Flour Roti",
    category: "Baking",
    time: "35 min",
    serves: "6",
    image: u("photo-1509440159596-0249088772ff"),
    copy: "Soft, layered roti made with whole-grain flour — perfect with curry or a smear of butter.",
    href: "/shop?cat=FLOUR",
  },
  {
    title: "Suwandel Rice & Coconut Milk",
    category: "Festive",
    time: "30 min",
    serves: "4",
    image: u("photo-1586201375761-83865001e31c"),
    copy: "Fragrant Suwandel rice cooked in coconut milk — the celebration dish of a Sri Lankan table.",
    href: "/products/suwandel-rice",
  },
  {
    title: "Pasta with Curry Leaf & Garlic",
    category: "Weeknight",
    time: "20 min",
    serves: "2",
    image: u("photo-1551183053-bf91a1d81141"),
    copy: "A pantry pasta tossed with curry leaves, garlic and chilli — Sri Lankan flavour, Italian comfort.",
    href: "/shop?cat=PASTA",
  },
];

export default function RecipesPage() {
  const [featured, ...rest] = RECIPES;

  return (
    <div>
      {/* Hero */}
      <section className="hair-b px-6 py-12 text-center md:px-10 md:py-20">
        <Reveal>
          <span className="label text-botanical">Recipes</span>
          <h1 className="mt-5 font-serif text-4xl md:text-6xl">
            From our kitchen
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink/60">
            Simple, generous recipes built on traditional rice, herbal porridge
            and stone-milled flour — the way we cook at home.
          </p>
        </Reveal>
      </section>

      {/* Featured recipe */}
      <section className="grid grid-cols-1 lg:grid-cols-2 hair-b">
        <ParallaxImage
          src={featured.image}
          alt={featured.title}
          className="min-h-[320px] border-b lg:border-b-0 lg:border-r lg:min-h-[520px]"
        />
        <div className="flex flex-col justify-center px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <span
              className="label"
              style={{ color: "var(--botanical)" }}
            >
              {featured.category}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">
              {featured.copy}
            </p>
            <div className="mt-6 flex items-center gap-6 text-[10px] uppercase tracking-widest text-ink/50">
              <span className="inline-flex items-center gap-2">
                <Clock size={13} strokeWidth={1.5} /> {featured.time}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users size={13} strokeWidth={1.5} /> Serves {featured.serves}
              </span>
            </div>
            <Link
              href={featured.href}
              className="pill mt-8 inline-flex self-start gap-2 text-[11px] uppercase tracking-widest"
            >
              Shop Ingredients <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((r, i) => (
          <Reveal
            key={r.title}
            delay={(i % 3) * 80}
            className={`border-b md:border-r ${
              i % 2 === 1 ? "md:border-r-0 lg:border-r" : ""
            } ${i % 3 === 2 ? "lg:border-r-0" : ""}`}
          >
            <article className="group flex h-full flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-[#eee9df]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.image}
                  alt={r.title}
                  className="h-full w-full object-cover transition-transform duration-[600ms] ease-apple group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col px-6 py-7">
                <span
                  className="label"
                  style={{ color: "var(--botanical)" }}
                >
                  {r.category}
                </span>
                <h3 className="mt-3 font-serif text-xl leading-snug">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {r.copy}
                </p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-ink/45">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} strokeWidth={1.5} /> {r.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={12} strokeWidth={1.5} /> {r.serves}
                    </span>
                  </div>
                  <Link
                    href={r.href}
                    aria-label={`Shop ingredients for ${r.title}`}
                    className="label inline-flex items-center gap-1.5 transition-opacity hover:opacity-60"
                  >
                    Shop <ArrowRight size={12} strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section
        className="flex flex-col items-center gap-4 px-6 py-14 text-center md:px-10 md:py-20"
        style={{ background: "var(--botanical)", color: "var(--cream)" }}
      >
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl">
            Cooked something good?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/75">
            Share your Sobako creation with us on Instagram — we love seeing
            what lands on your table.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-full border border-cream/60 px-7 py-3 text-[11px] uppercase tracking-widest transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            Stock Your Pantry
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
