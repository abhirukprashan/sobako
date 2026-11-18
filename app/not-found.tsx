import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-5xl" style={{ color: "var(--botanical)" }}>
        Sobako
      </h1>
      <p className="label">404 — This shelf is empty</p>
      <Link href="/" className="pill mt-2 text-[11px] uppercase tracking-widest">
        Back to Home
      </Link>
    </div>
  );
}
