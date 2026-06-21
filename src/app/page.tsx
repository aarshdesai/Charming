import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/* ── Hero: asymmetric 50/50 split — text left, photo right */
function Hero() {
  return (
    <section className="min-h-[100dvh] grid md:grid-cols-2 items-center">
      <div className="px-8 md:px-16 py-20 md:py-0 flex flex-col justify-center">
        <Reveal>
          <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-[#123718] mb-8">
            Your story,
            <br />
            <em>worn close.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base text-[#123718]/60 leading-relaxed max-w-[40ch] mb-10">
            Choose your charms. We set them by hand. Every piece is yours alone.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="flex items-center gap-6 flex-wrap">
            <Link
              href="/customize"
              className="inline-block text-xs tracking-[0.18em] uppercase px-7 py-3.5 bg-[#123718] text-[#F3E8DC] hover:bg-[#0F2A1F] transition-colors duration-200 active:scale-[0.98]"
            >
              Design Yours
            </Link>
            <Link
              href="/shop"
              className="text-xs tracking-[0.18em] uppercase text-[#123718]/50 hover:text-[#123718] transition-colors duration-200"
            >
              Browse charms
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-8 text-[10px] tracking-[0.2em] uppercase text-[#123718]/40">
            <span>Chosen by you</span>
            <span className="text-[#882121]">+</span>
            <span>Charm bar experience</span>
            <span className="text-[#882121]">+</span>
            <span>Made for you</span>
          </div>
        </Reveal>
      </div>

      {/* Editorial photo — full height on desktop */}
      <div className="relative h-[70vw] md:h-[100dvh] bg-[#0F2A1F]">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/ocean-necklace.jpg`}
          alt="Handcrafted ocean charm necklace on dark green satin"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-[#0F2A1F]/25 mix-blend-multiply" />
      </div>
    </section>
  );
}

/* ── Process: vertical numbered steps — NOT equal cards */
function Process() {
  const steps = [
    {
      n: "01",
      title: "Choose a base",
      body: "Start with a necklace chain, charm bracelet, or anklet. Each is handcrafted in 14k gold-fill.",
    },
    {
      n: "02",
      title: "Add your charms",
      body: "Browse over 20 handcrafted options — symbols, nature motifs, initials, and gemstones.",
    },
    {
      n: "03",
      title: "We make it by hand",
      body: "Every order is assembled in our Sacramento studio and ships within five to seven days.",
    },
  ];

  return (
    <section className="px-8 md:px-16 py-28 max-w-[1400px] mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-[#123718]">
            How it
            <br />
            <em>works</em>
          </h2>
        </Reveal>

        <div className="flex flex-col divide-y divide-[#123718]/10">
          {steps.map(({ n, title, body }, i) => (
            <Reveal key={n} delay={i * 0.08}>
              <div className="py-8 grid grid-cols-[3rem_1fr] gap-6 items-start">
                <span className="font-display text-4xl text-[#882121] leading-none font-light">
                  {n}
                </span>
                <div>
                  <p className="text-sm font-medium tracking-wide text-[#123718] mb-2">{title}</p>
                  <p className="text-sm text-[#123718]/55 leading-relaxed max-w-[42ch]">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Bento: charm categories, 4 cells, asymmetric grid with visual variety */
function BentoGrid() {
  return (
    <section className="px-8 md:px-16 pb-28 max-w-[1400px] mx-auto">
      <Reveal>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#123718]/40 mb-6">
          The Collection
        </p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-3 h-[80vw] md:h-[520px]">
        {/* Symbols: dark green, large symbol glyph, spans 2 rows */}
        <Reveal className="row-span-2 bg-[#0F2A1F] flex flex-col justify-end p-6 md:p-8 overflow-hidden">
          <span className="font-display text-[6rem] md:text-[8rem] text-[#F3E8DC]/10 leading-none mb-4 select-none block">
            ✦
          </span>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#F3E8DC]/40 mb-1">Symbols</p>
          <p className="font-display text-xl md:text-2xl text-[#F3E8DC] leading-tight">
            Stars, moons &amp; more
          </p>
        </Reveal>

        {/* Nature: editorial photo */}
        <Reveal className="relative col-span-1 md:col-span-2 bg-[#123718] overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/charm-flatlay.jpg`}
            alt="Gold charm collection — horseshoe, butterfly, clover and more"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 50vw, 67vw"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#F3E8DC]/60 mb-1">Nature</p>
            <p className="font-display text-xl md:text-2xl text-[#F3E8DC] leading-tight">
              Leaves, blooms &amp; feathers
            </p>
          </div>
        </Reveal>

        {/* Initials: cream with oversized letter */}
        <Reveal className="bg-[#FFFAF4] flex flex-col justify-between p-5 md:p-6 overflow-hidden">
          <span className="font-display text-[4rem] md:text-[5.5rem] text-[#123718]/08 leading-none select-none">
            A
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#123718]/40 mb-1">Initials</p>
            <p className="font-display text-lg text-[#123718] leading-tight">Script letters</p>
          </div>
        </Reveal>

        {/* Gems: editorial photo */}
        <Reveal className="relative bg-[#123718] overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/horseshoe-necklace.jpg`}
            alt="Gold horseshoe charm necklace on dark green satin"
            fill
            className="object-cover opacity-75"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#F3E8DC]/60 mb-1">Gems</p>
            <p className="font-display text-lg text-[#F3E8DC] leading-tight">
              Ruby, sapphire &amp; opal
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Story: full-bleed dark green, editorial photo + quote */
function Story() {
  return (
    <section className="bg-[#0F2A1F] px-8 md:px-16 py-28">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1fr_1.4fr] gap-16 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] bg-[#123718] overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/charm-flatlay.jpg`}
              alt="Charming Sacramento charm collection"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <blockquote>
            <p className="font-display text-[clamp(2rem,4.5vw,3.5rem)] text-[#F3E8DC] leading-[1.15] italic mb-8">
              "Jewelry should feel like memory, not merchandise."
            </p>
            <footer className="text-xs tracking-[0.18em] uppercase text-[#F3E8DC]/40">
              Founder, Charming Sacramento
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Closing CTA: manifesto style (centered is right here — closing statement) */
function ClosingCta() {
  return (
    <section className="px-8 md:px-16 py-32 text-center">
      <Reveal>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight text-[#123718] mb-8 max-w-[14ch] mx-auto">
          Ready to make it <em>yours?</em>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <Link
          href="/customize"
          className="inline-block text-xs tracking-[0.18em] uppercase px-10 py-4 bg-[#123718] text-[#F3E8DC] hover:bg-[#0F2A1F] transition-colors duration-200 active:scale-[0.98]"
        >
          Design Yours
        </Link>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <BentoGrid />
      <Story />
      <ClosingCta />
    </>
  );
}
