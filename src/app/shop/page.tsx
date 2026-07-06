import type { Metadata } from "next";
import Link from "next/link";
import { CHARMS, CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/charms";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt3D } from "@/components/ui/Tilt3D";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Shop Charms — Charming Sacramento",
  description: "Browse our full collection of handcrafted charms.",
};

export default function ShopPage() {
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    charms: CHARMS.filter((c) => c.category === cat),
  }));

  return (
    <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-16 md:py-24">
      {/* Page header */}
      <Reveal>
        <div className="mb-16 md:mb-24 grid md:grid-cols-[1fr_auto] items-end gap-6">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight text-[#123718]">
              The charms
            </h1>
            <p className="text-sm text-[#123718]/50 mt-3 max-w-[40ch]">
              Every charm is cast and finished by hand. Mix freely, combine with any base.
            </p>
          </div>
          <Link
            href="/customize"
            className="inline-block text-xs tracking-[0.18em] uppercase px-7 py-3.5 bg-[#123718] text-[#F3E8DC] hover:bg-[#0F2A1F] transition-colors duration-150 active:scale-[0.98] whitespace-nowrap self-start md:self-end"
          >
            Design Yours
          </Link>
        </div>
      </Reveal>

      {/* Charm categories */}
      <div className="space-y-20">
        {byCategory.map(({ cat, charms }, ci) => (
          <section key={cat}>
            <Reveal delay={ci * 0.05}>
              <h2 className="font-display text-2xl text-[#123718] mb-8 pb-4 border-b border-[#123718]/10">
                {CATEGORY_LABELS[cat]}
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-[#123718]/08">
              {charms.map((charm, i) => (
                <Reveal key={charm.id} delay={i * 0.04}>
                  <Link
                    href="/customize"
                    className="group bg-[#F3E8DC] flex flex-col items-center gap-4 p-6 md:p-8 hover:bg-[#FFFAF4] transition-colors duration-150"
                  >
                    <Tilt3D className="w-20 h-20">
                      {charm.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${BASE_PATH}${charm.image}`}
                          alt={charm.name}
                          className="w-20 h-20 object-contain drop-shadow-[0_8px_14px_rgba(18,55,24,0.28)]"
                        />
                      ) : (
                        <span className="w-20 h-20 flex items-center justify-center text-4xl leading-none select-none">
                          {charm.emoji}
                        </span>
                      )}
                    </Tilt3D>
                    <div className="text-center">
                      <p className="text-xs font-medium tracking-wide text-[#123718] mb-1">
                        {charm.name}
                      </p>
                      <p className="text-[10px] text-[#123718]/40 mb-2">{charm.description}</p>
                      <p className="text-sm font-display text-[#882121]">${charm.price}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA */}
      <Reveal>
        <div className="mt-24 py-16 border-t border-[#123718]/10 text-center">
          <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-[#123718] mb-6">
            Ready to build your piece?
          </p>
          <Link
            href="/customize"
            className="inline-block text-xs tracking-[0.18em] uppercase px-10 py-4 bg-[#123718] text-[#F3E8DC] hover:bg-[#0F2A1F] transition-colors duration-150 active:scale-[0.98]"
          >
            Design Yours
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
