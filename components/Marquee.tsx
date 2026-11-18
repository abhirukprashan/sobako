const VALUES = [
  "Traditional Heritage Rice",
  "Wholesome Herbal Porridge",
  "Stone-Milled Natural Flour",
  "No Artificial Additives",
  "Grown in Sri Lanka",
];

export default function Marquee() {
  const sequence = [...VALUES, ...VALUES, ...VALUES, ...VALUES];
  return (
    <div
      className="hair-b overflow-hidden py-3"
      style={{ background: "var(--botanical)", color: "var(--cream)" }}
    >
      <div className="marquee-track">
        {sequence.map((v, i) => (
          <span key={i} className="label mx-6 inline-flex items-center gap-6">
            {v}
            <span aria-hidden className="opacity-40">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
