export type Category = "RICE" | "PORRIDGE" | "HERBAL" | "PASTA" | "FLOUR";

export const CATEGORY_LABELS: Record<Category, string> = {
  RICE: "Traditional Rice",
  PORRIDGE: "Porridge",
  HERBAL: "Herbal Porridge",
  PASTA: "Pasta",
  FLOUR: "Flour",
};

export interface Product {
  slug: string;
  name: string;
  category: Category;
  weight: string;
  price: number; // in LKR
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  origin: string;
  ingredients: string;
  cooking: string[];
  pairing: string;
  featured?: boolean;
  bestseller?: boolean;
}

export function formatLKR(n: number) {
  return `Rs ${n.toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const products: Product[] = [
  {
    slug: "kalu-heenati-rice",
    name: "Kalu Heenati Traditional Rice",
    category: "RICE",
    weight: "1kg",
    price: 595,
    rating: 5,
    reviews: 64,
    images: ["/products/kalu-heenati-rice.png", img("photo-1536304929831-ee1ca9d44906"), img("photo-1557872943-16a5ac26437e")],
    description:
      "A deep red heritage rice treasured across Sri Lanka for generations. Nutty, hearty, and rich in fibre and antioxidants — the wholesome heart of a traditional table.",
    origin:
      "Grown by smallholder farmers using time-honoured methods, naturally red and unpolished to keep the goodness of the bran intact.",
    ingredients: "100% unpolished Kalu Heenati red rice.",
    cooking: [
      "Rinse 1 cup of rice until the water runs clear.",
      "Add 2½ cups of water and a pinch of salt.",
      "Bring to a boil, then simmer covered for 25–30 minutes.",
      "Rest off the heat for 5 minutes and fluff before serving.",
    ],
    pairing:
      "Beautiful with dhal, pol sambol, and a classic Sri Lankan vegetable curry.",
    featured: true,
    bestseller: true,
  },
  {
    slug: "suwandel-rice",
    name: "Suwandel Heritage Rice",
    category: "RICE",
    weight: "1kg",
    price: 650,
    rating: 5,
    reviews: 48,
    images: ["/products/suwandel-rice-4kg-sri-lanka.png"],
    description:
      "The fragrant 'sweet-smelling' white heritage rice, soft and delicately aromatic. A festive favourite once reserved for special occasions.",
    origin: "A revived ancient variety, cultivated naturally without chemical inputs.",
    ingredients: "100% Suwandel heritage rice.",
    cooking: [
      "Rinse 1 cup of rice gently.",
      "Add 2 cups of water and a pinch of salt.",
      "Bring to a boil, then simmer covered for 15 minutes.",
      "Rest for 5 minutes and fluff with a fork.",
    ],
    pairing: "Perfect for milk rice (kiribath), festive plates, and mild curries.",
    featured: true,
  },
  {
    slug: "batapola-rice",
    name: "Batapola Traditional Rice",
    category: "RICE",
    weight: "1kg",
    price: 525,
    rating: 4,
    reviews: 31,
    images: ["/products/batapolal-rice-sri-lanka.png",img("photo-1586201375761-83865001e31c")],
    description:
      "A wholesome everyday traditional rice with a satisfying bite and gentle earthiness — nourishing comfort for daily meals.",
    origin: "Traditionally cultivated and minimally processed to retain nutrients.",
    ingredients: "100% Batapola traditional rice.",
    cooking: [
      "Rinse 1 cup of rice until clear.",
      "Add 2¼ cups of water and a pinch of salt.",
      "Boil, then simmer covered for 20 minutes.",
      "Rest for 5 minutes before serving.",
    ],
    pairing: "An everyday match for curries, stir-fries, and fried rice.",
    bestseller: true,
  },
  {
    slug: "heenati-rice-porridge",
    name: "Heenati Rice Porridge",
    category: "PORRIDGE",
    weight: "200g",
    price: 495,
    rating: 5,
    reviews: 52,
    images: ["/products/heenati-rice-porridge-sri-lanka.png",img("photo-1484723091739-30a097e8f929")],
    description:
      "A nourishing instant kanda made from red Heenati rice — Sri Lanka's beloved wholesome breakfast, warm and comforting in minutes.",
    origin: "Milled from traditional Heenati red rice and gently blended.",
    ingredients: "Heenati red rice, coconut milk powder, natural flavour.",
    cooking: [
      "Add one sachet to a cup.",
      "Pour in 150ml of hot water.",
      "Stir well until smooth and creamy.",
      "Add jaggery or a pinch of salt to taste.",
    ],
    pairing: "Lovely with jaggery, treacle, or a slice of ripe banana.",
    featured: true,
    bestseller: true,
  },
  {
    slug: "suwandel-rice-porridge",
    name: "Suwandel Rice Porridge",
    category: "PORRIDGE",
    weight: "200g",
    price: 495,
    rating: 5,
    reviews: 40,
    images: ["/products/suwandel-rice-porridge-sri-lanka.png"],
    description:
      "A mild, aromatic porridge made from fragrant Suwandel rice — a gentle, soothing start to the morning.",
    origin: "Blended from naturally grown Suwandel heritage rice.",
    ingredients: "Suwandel rice, coconut milk powder, natural flavour.",
    cooking: [
      "Empty one sachet into a cup.",
      "Add 150ml of hot water.",
      "Stir until creamy and smooth.",
      "Sweeten with jaggery to taste.",
    ],
    pairing: "Delicious with kithul treacle and grated coconut.",
    featured: true,
  },
  {
    slug: "horse-gram-porridge",
    name: "Horse Gram Porridge",
    category: "PORRIDGE",
    weight: "200g",
    price: 495,
    rating: 4,
    reviews: 27,
    images: ["/products/horse-gram-porridge-sri-lanka.png",img("photo-1484723091739-30a097e8f929")],
    description:
      "A traditional superfood kanda rich in protein and iron — earthy, hearty, and deeply nourishing.",
    origin: "Made from sun-dried horse gram, a time-honoured Sri Lankan pulse.",
    ingredients: "Horse gram, red rice, coconut milk powder.",
    cooking: [
      "Add one sachet to a cup.",
      "Pour in 150ml of hot water.",
      "Stir thoroughly until smooth.",
      "Season with a pinch of salt.",
    ],
    pairing: "Best enjoyed warm with a dash of pepper and lime.",
    bestseller: true,
  },
  {
    slug: "curry-leaves-yaki-naran-porridge",
    name: "Curry Leaves & Yaki Naran Herbal Porridge",
    category: "HERBAL",
    weight: "250g",
    price: 1495,
    rating: 5,
    reviews: 19,
    images: ["/products/curry-leaves-yaki-naran-rice-porridge-sri-lanka.png",img("photo-1512621776951-a57141f2eefd")],
    description:
      "A traditional herbal kola kanda blending curry leaves and yaki naran — a wellness ritual passed down through generations.",
    origin: "Hand-blended from fresh green herbs and red rice, sun-dried in small lots.",
    ingredients: "Red rice, curry leaves, yaki naran, coconut milk powder.",
    cooking: [
      "Add one sachet to a cup.",
      "Pour in 180ml of hot water.",
      "Stir well and let it steep for a minute.",
      "Sip warm, ideally first thing in the morning.",
    ],
    pairing: "A wholesome morning tonic on its own, with jaggery on the side.",
    featured: true,
  },
  {
    slug: "heenbovitiya-herbal-porridge",
    name: "Heenbovitiya Herbal Porridge",
    category: "HERBAL",
    weight: "250g",
    price: 1495,
    rating: 5,
    reviews: 16,
    images: ["/products/heenbovitiya-rice-porridge-sri-lanka.png",img("photo-1512621776951-a57141f2eefd")],
    description:
      "A traditional herbal wellness blend built around heenbovitiya, prized in Ayurvedic practice for its soothing, restorative qualities.",
    origin: "Blended from wild-harvested herbs and traditional red rice.",
    ingredients: "Red rice, heenbovitiya, coconut milk powder.",
    cooking: [
      "Empty one sachet into a cup.",
      "Add 180ml of hot water.",
      "Stir and rest for a minute.",
      "Enjoy warm.",
    ],
    pairing: "A calming herbal porridge, perfect before the day begins.",
    bestseller: true,
  },
  {
    slug: "blue-butterfly-pea-pasta",
    name: "Blue Butterfly Pea Pasta",
    category: "PASTA",
    weight: "300g",
    price: 595,
    rating: 5,
    reviews: 33,
    images: [ "/products/blue-butterfly-pea-pasta-sri-lanka.png",img("photo-1612874742237-6526221588e3")],
    description:
      "Striking naturally blue pasta coloured with butterfly pea flower — a playful, nutritious twist on an everyday favourite.",
    origin: "Made with semolina and real butterfly pea flower, free from artificial colour.",
    ingredients: "Durum wheat semolina, butterfly pea flower.",
    cooking: [
      "Bring a pot of salted water to a boil.",
      "Add the pasta and cook for 8–10 minutes.",
      "Drain, reserving a little pasta water.",
      "Toss with your sauce of choice.",
    ],
    pairing: "Vivid with a simple garlic-lime olive oil or a creamy white sauce.",
    featured: true,
  },
  {
    slug: "corn-pasta",
    name: "Corn Pasta",
    category: "PASTA",
    weight: "300g",
    price: 595,
    rating: 4,
    reviews: 22,
    images: ["/products/corn-pasta-sri-lanka.jpg",img("photo-1551462147-37885acc36f1")],
    description:
      "A light, naturally gluten-friendly pasta made from golden corn — wholesome, mellow, and easy to love.",
    origin: "Milled from quality corn and extruded into a tender everyday pasta.",
    ingredients: "Corn flour, water.",
    cooking: [
      "Boil in plenty of salted water.",
      "Cook for 7–9 minutes until tender.",
      "Drain gently — corn pasta is delicate.",
      "Finish immediately in a warm sauce.",
    ],
    pairing: "Great with tomato-basil or a light vegetable sauté.",
    bestseller: true,
  },
  {
    slug: "corn-pittu-flour",
    name: "Corn Pittu Flour",
    category: "FLOUR",
    weight: "400g",
    price: 640,
    rating: 5,
    reviews: 24,
    images: ["/products/corn-pittu-flour-premium-sri-lankan-corn-flour-400g.png",img("photo-1574323347407-f5e1ad6d020b")],
    description:
      "Premium Sri Lankan corn flour, ready for soft, fragrant pittu and other traditional steamed delights.",
    origin: "Finely milled from quality corn for a smooth, consistent texture.",
    ingredients: "100% roasted corn flour.",
    cooking: [
      "Combine flour with a little salt.",
      "Sprinkle in water gradually, mixing to a crumb.",
      "Layer with grated coconut in a pittu mould.",
      "Steam for 8–10 minutes until fluffy.",
    ],
    pairing: "Serve with coconut milk, lunu miris, and ripe banana.",
    featured: true,
  },
  {
    slug: "red-rice-flour",
    name: "Red Rice Flour",
    category: "FLOUR",
    weight: "400g",
    price: 580,
    rating: 4,
    reviews: 18,
    images: ["/products/lanka-basmati-rice-4kg-sri-lanka.png",img("photo-1509440159596-0249088772ff")],
    description:
      "Nutritious red rice flour for hoppers, string hoppers, and wholesome home baking — stone-milled to keep the bran.",
    origin: "Milled from traditional red rice in small, careful batches.",
    ingredients: "100% red rice flour.",
    cooking: [
      "Mix flour with warm water to a smooth batter or dough.",
      "Rest for 15 minutes.",
      "Shape or pour as your recipe requires.",
      "Steam or cook until set.",
    ],
    pairing: "The base for red string hoppers and rustic flatbreads.",
    bestseller: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function featuredProducts() {
  return products.filter((p) => p.featured).slice(0, 4);
}

export function bestsellers() {
  return products.filter((p) => p.bestseller).slice(0, 4);
}

export function relatedProducts(slug: string, count = 3) {
  const current = getProduct(slug);
  return products
    .filter((p) => p.slug !== slug && p.category === current?.category)
    .concat(products.filter((p) => p.slug !== slug && p.category !== current?.category))
    .slice(0, count);
}
