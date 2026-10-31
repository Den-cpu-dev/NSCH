import Image from "next/image";
import { BRAND } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-neutral-200 bg-white/60 px-6 py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="mb-3">
            <Image
              src="/logo.png"
              alt={BRAND.name}
              width={160}
              height={52}
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="mt-2 max-w-sm text-sm text-neutral-500">
            Retreats, active adventures, and boutique stays — planned with
            intention.
          </p>
        </div>
        <form className="flex w-full max-w-sm gap-2" action="#contact">
          <input
            type="email"
            required
            placeholder="Your email"
            className="h-11 flex-1 rounded-full border border-neutral-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <button
            type="submit"
            className="h-11 rounded-full bg-neutral-950 px-5 text-sm text-white"
          >
            Join
          </button>
        </form>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-neutral-400">
        © {new Date().getFullYear()} {BRAND.name}. Editorial travel, nowhere
        boring.
      </p>
    </footer>
  );
}
