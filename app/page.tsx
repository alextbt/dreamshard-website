"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ds-reveal ${visible ? "ds-reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function EntryGate({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [hit, setHit] = useState(false);

  const handleClick = () => {
    if (leaving) return;
    setHit(true);
    setTimeout(() => setLeaving(true), 280);
    setTimeout(onEnter, 900);
  };

  return (
    <div className={`ds-gate ${leaving ? "ds-gate--leaving" : ""}`}>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Enter the dream"
        className="ds-shard-button"
      >
        <span className={`ds-shard ${hit ? "ds-shard--hit" : ""}`} />
        <span className={`ds-shard-flash ${hit ? "ds-shard-flash--on" : ""}`} />
      </button>
      <p className="ds-eyebrow text-cyan-300/80">DreamShard</p>
      <p className="ds-gate-hint">Touch the shard to wake the dream</p>
    </div>
  );
}

function LucidityChaosMeter() {
  const [v, setV] = useState(0); // -1 (Chaos) ... 0 ... +1 (Lucidity)

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const loop = (t: number) => {
      const seconds = (t - start) / 1000;
      // oscille doucement entre -1 et +1
      const value = Math.sin(seconds * 0.7); // vitesse
      setV(value);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const percent = Math.round(v * 100); // -100..100

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between text-xs text-zinc-300">
        <span className="font-semibold text-zinc-200">Chaos</span>
        <span className="text-zinc-400">{percent}%</span>
        <span className="font-semibold text-zinc-200">Lucidity</span>
      </div>

      <div className="mt-3 relative h-3 overflow-hidden rounded-full border border-white/10 bg-white/5">
        <div
  className={`absolute inset-0 ds-meter-shimmer ${
    v < 0 ? "ds-meter-shimmer--chaos" : "ds-meter-shimmer--lucidity"
  }`}
/>

        {/* Remplissage depuis le centre */}
        <div
          className="absolute left-1/2 top-0 h-full w-1/2 origin-left ds-meter-fill ds-meter-fill--right"
          style={{ transform: `scaleX(${Math.max(0, v)})` }}
        />
        <div
          className="absolute right-1/2 top-0 h-full w-1/2 origin-right ds-meter-fill ds-meter-fill--left"
          style={{ transform: `scaleX(${Math.max(0, -v)})` }}
        />

        {/* Trait centre */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/30" />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-300">
        The gauge starts at <span className="text-zinc-100 font-semibold">0</span> and shifts toward
        <span className="text-zinc-100 font-semibold"> Lucidity</span> or
        <span className="text-zinc-100 font-semibold"> Chaos</span> depending on your choices.
      </p>
    </div>
  );
}

export default function Home() {

  const [isContactOpen, setIsContactOpen] = useState(false);

  const EMAIL = "frameperfectstudio.dev@gmail.com";

  const LINKS = {
    follow: "#roadmap",
  };

  const NAV_LINKS = [
    { href: "#about", label: "About" },
    { href: "#modes", label: "Modes" },
    { href: "#gameplay", label: "Gameplay" },
    { href: "#media", label: "Medias" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#faq", label: "FAQ" },
  ];

  const TITLE = "DreamShard";

  const ACCENT_BORDERS = [
    "border-l-cyan-400/60",
    "border-l-amber-400/60",
    "border-l-violet-400/60",
  ];

const [glitchOn, setGlitchOn] = useState(false);
const [titleGlitch, setTitleGlitch] = useState(false);
const [introOn, setIntroOn] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [mobileNavOpen, setMobileNavOpen] = useState(false);
const [gateOpen, setGateOpen] = useState(true);

useEffect(() => {
  const EVERY_MS = 10000;   // toutes les 10 secondes
  const DURATION_MS = 420;  // glitch plus long mais plus smooth


  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const intervalId = setInterval(() => {
    setGlitchOn(true);
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => setGlitchOn(false), DURATION_MS);
  }, EVERY_MS);

  return () => {
    clearInterval(intervalId);
    if (timeoutId) clearTimeout(timeoutId);
  };
}, []);

// Page intro: progressive title/content reveal, once the entry gate has been opened
useEffect(() => {
  if (gateOpen) return;
  const introTimer = setTimeout(() => setIntroOn(true), 80);
  const glitchOnTimer = setTimeout(() => setTitleGlitch(true), 80);
  const glitchOffTimer = setTimeout(() => setTitleGlitch(false), 80 + 550);
  return () => {
    clearTimeout(introTimer);
    clearTimeout(glitchOnTimer);
    clearTimeout(glitchOffTimer);
  };
}, [gateOpen]);

// Lock page scroll while the entry gate is up
useEffect(() => {
  document.documentElement.style.overflow = gateOpen ? "hidden" : "";
  return () => {
    document.documentElement.style.overflow = "";
  };
}, [gateOpen]);

// Header gets denser once the page has scrolled past the hero badge
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

const STORY_POINTS = [
    "Complex plot in several acts",
    "High school students see their dreams come true... but at what cost?",
    "Shifting themes and deep lore",
  ];

const ARENA_POINTS = [
    "Builds and character diversity: characters played differently, specific perks, upgrades, changing how the arena is approached.",
    "Focuses on mastery, replayability, and discovery through gameplay.",
    "Hidden events and subtle narrative are added into the arena... to escape?",
  ];

const GAMEPLAY_LOOP = [
  {
    title: "Explore",
    lead: "Discover DreamShard’s world and the secrets hidden inside its dreams.",
    bullets: [
      "Find equipment, items, and new playable characters",
      "Solve puzzles and uncover hidden events",
      "Learn more about the setting and its rules",
    ],
  },
  {
    title: "Battle — Core Principles",
    lead: "DreamShard uses a classic turn-based RPG structure where planning matters.",
    bullets: [
      "Choose between attacks, abilities, defense, or items",
      "Read enemy patterns and manage resources",
      "React on enemy turns with parries (perfect timing = bigger rewards)",
    ],
  },
  {
    title: "Battle — Lucidity & Chaos",
    lead: "Combat mastery comes from controlling a shared Lucidity gauge… or embracing Chaos.",
    bullets: [
      "Lucidity (positive): control, support, precision and strategy",
      "Chaos (negative): stronger, unstable abilities with higher risk",
      "At extreme Chaos, battles can become unpredictable and distorted",
    ],
    note: "The best players know when to stay stable — and when to push the dream to its limits.",
  },
  {
    title: "Grow",
    lead: "Every fight changes you — and reveals more of what’s really going on.",
    bullets: [
      "Earn rewards and prepare for harder challenges",
      "Choose how progression is distributed at save points",
      "Sometimes: absorb enemies to unlock darker power paths",
    ],
  },
];

  const ROADMAP = [
    { phase: "End of 2025", title: "Pre-alpha phase", desc: "Foundations, prototypes, artistic direction, key systems." },
    { phase: "First semester of 2026", title: "Alpha", desc: "Roguelike mode base developed in terms of substance, staging, and gameplay." },
    { phase: "May / June 2026", title: "Beta - Expected release period", desc: "DreamShard will be available for the first time, with only its Arena mode in version 1.0 for now." },
    { phase: "Second semester of 2026", title: "Pre-release development phase", desc: "Story mode development period, planning to release the prologue of the game in late 2026." },
    { phase: "November 2026", title: "Pre-release demo", desc: "A demo for the prologue of DreamShard's story mode will be available. Depending on your feedback on this demo, act 1 will be developed, aiming at a early 2027 release." },
    { phase: "Christmas 2026", title: "DreamShard release date", desc: "For the first time, DreamShard will be fully available for both game modes, Arena and Story (Prologue only)." },
  ];

  const FAQ = [
    { q: "When can we try out the game?", a: "Not until May 2026 at best. Follow the given roadmap to follow the progession of the game." },
    { q: "How much will DreamShard cost?", a: "For now, DreamShard should not be officially released considering the used sprites, animations and soundtracks that are not ours. If the game manages to become 100% original, it will probably be released on Steam for a maximum of €5-10." },
    { q: "On which platform can I play the game?", a: "Only on PC... and on any PC (given the pixel art graphics)." },
    { q: "Isn't pixel art a bit odd for a game nowadays?", a: "Beyond the nostalgic aspect that pixel art can have, it is also a process still widely used by some independent developers. The game's appearance has no influence on its gameplay quality: my game will be perfectly playable, attractive, and smooth. You'd be surprised at what can be done with pixels..." },
    { q: "What's an RPG?", a: "RPG stands for Role Playing Game, meaning that you will play a specific character and that you will progress through the game by developing your character, both statistically and personally. DreamShard borrows heavily from the JRPG style, or Japanese RPG format, particularly in its turn-based gameplay. " },
    { q: "How is DreamShard played?", a: "You will explore and fight with your team against different enemies. The game is turn-based, during a fight, you prepare your actions, and execute them before/after the enemy. Then, it's the enemy's turn to attack, and the process begins again. Read the Gameplay loop part for more informations." },
    { q: "How long to beat DreamShard?", a: "In Arena mode, you can do series of 20-30 min runs, depending on how good you play. For story mode, for the prologue only, it's expected to last 5 to 10 hours to finish it. The full story mode (if all acts ever release), is expected to last as long as the prologue x6, so 30 hours minimum." },
    { q: "Is DreamShard hard?", a: "Although I love challenging games, DreamShard can be finished easily considering the game gives other options if you want to avoid using the most timing-reliant and harder game mechanics. However, to complete the Arena gamemode or to finish the Story at 100% completion, you will have to die and retry a lot."}
  ];

  return (
    <main className="relative min-h-screen">
      {gateOpen && <EntryGate onEnter={() => setGateOpen(false)} />}

      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-zinc-950/90"
            : "border-transparent bg-zinc-950/50"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-3.5"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`font-semibold tracking-wide ds-pixel ds-glitch ${glitchOn ? "ds-glitch--on" : ""}`}
              data-text="DreamShard"
            >
              DreamShard
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-200 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative py-1 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={LINKS.follow}
              className="hidden rounded-xl bg-white px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100 sm:inline-block"
            >
              Follow the development
            </a>

            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-expanded={mobileNavOpen}
              aria-label="Toggle menu"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-white transition-transform duration-300 ${
                  mobileNavOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-white transition-opacity duration-300 ${
                  mobileNavOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-white transition-transform duration-300 ${
                  mobileNavOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileNavOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 text-sm text-zinc-200">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={LINKS.follow}
              onClick={() => setMobileNavOpen(false)}
              className="mt-2 rounded-xl bg-white px-3 py-2 text-center font-semibold text-zinc-950 hover:bg-zinc-100"
            >
              Follow the development
            </a>
          </nav>
        </div>
      </header>

    {/* Global background (gradient + soft glows) */}
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-black via-cyan-950/25 to-black" />
      <div className="absolute -top-40 left-1/2 h-175 w-175 -translate-x-1/2 rounded-full bg-cyan-500/14 blur-[140px]" />
      <div className="absolute -bottom-75 -right-50 h-150 w-150 rounded-full bg-violet-700/10 blur-[160px]" />
    </div>
    


      {/* Hero (simple, no overlays) */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-6 max-w-5xl">
          <p
            className={`ds-reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-200 ${
              introOn ? "ds-reveal--visible" : ""
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            First phase of development — images & demo to come
          </p>

          <p
            className={`ds-reveal ds-eyebrow text-amber-300/80 ${
              introOn ? "ds-reveal--visible" : ""
            }`}
            style={{ transitionDelay: "60ms" }}
          >
            A 2D-HD pixel art RPG
          </p>

          <h1
            className={`ds-glitch whitespace-nowrap text-4xl font-bold tracking-tight md:text-6xl ds-pixel ${
              titleGlitch ? "ds-glitch--on" : ""
            }`}
            data-text={TITLE}
          >
            {TITLE.split("").map((ch, i) => (
              <span
                key={i}
                className={`ds-letter ${introOn ? "ds-letter--visible" : ""}`}
                style={{ transitionDelay: `${120 + i * 35}ms` }}
              >
                {ch}
              </span>
            ))}
          </h1>

          <p
            className={`ds-reveal text-base leading-relaxed text-zinc-200 md:text-lg ${
              introOn ? "ds-reveal--visible" : ""
            }`}
            style={{ transitionDelay: "520ms" }}
          >
            DreamShard is a{" "}
            <span className="inline-flex items-center gap-1 text-white font-semibold">
              &quot;2D-HD RPG&quot;
            </span>{" "}
            in pixel art style where dreams come true — sometimes at a cost.
          </p>

          <a
            href="#what-is-2dhd"
            className={`ds-reveal mt-2 inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition ${
              introOn ? "ds-reveal--visible" : ""
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <span>↘</span>
            <span className="underline underline-offset-2">What is a 2D-HD RPG?</span>
          </a>

          <p
            className={`ds-reveal text-base leading-relaxed text-zinc-200 md:text-lg ${
              introOn ? "ds-reveal--visible" : ""
            }`}
            style={{ transitionDelay: "680ms" }}
          >
            The game has 2 main gamemodes: an{" "}
            <span className="text-white font-semibold">Arena mode</span> (challenges,
            fights, hidden secrets) scheduled to release first, and a{" "}
            <span className="text-white font-semibold">Story mode</span> in acts (with a
            prologue), on highschoolers facing consequences of their materialized dreams.
          </p>

          <div
            className={`ds-reveal ds-divider ${introOn ? "ds-reveal--visible" : ""}`}
            style={{ transitionDelay: "720ms" }}
          />

          <div
            className={`ds-reveal flex flex-col gap-3 sm:flex-row ${
              introOn ? "ds-reveal--visible" : ""
            }`}
            style={{ transitionDelay: "760ms" }}
          >
            <a
              href={LINKS.follow}
              className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-zinc-950 hover:bg-zinc-100"
            >
              Follow the development
            </a>
            <a
              href="#modes"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center font-semibold text-white hover:bg-white/10"
            >
              Gamemodes
            </a>
          </div>
        </div>
      </section>

      {/* Modes */}
      <section id="modes" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <Reveal>
          <p className="ds-eyebrow text-cyan-300/80">Two paths</p>
          <h2 className="mt-1 text-2xl font-semibold md:text-3xl ds-pixel">Two gamemodes</h2>
          <p className="mt-2 text-zinc-300 max-w-3xl">
            DreamShard has 2 gamemodes: an arena roguelike and a story driven adventure.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal delay={80} className="rounded-2xl border-y border-r border-white/10 border-l-4 border-l-amber-400/60 bg-white/5 p-5 transition
           hover:-translate-y-1 hover:bg-amber-300/[0.07] hover:border-amber-500/20
           hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.6)]">
            <p className="text-xs text-zinc-300">Expected for mid-2026</p>
            <h3 className="mt-2 text-xl font-semibold">Roguelike mode — The Arena</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              The Arena mode in DreamShard is a fast-paced, replayable experience built around a combat arena.
              Each run places the player inside an arena filled with successive waves of enemies. Between these waves, the player chooses how to grow stronger, shaping a unique build.
              While upgrades are erased between runs, the player keeps progressing with unique perks that unlock through multiple attempts.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {ARENA_POINTS.map((x) => <li key={x}>• {x}</li>)}
            </ul>
          </Reveal>

          <Reveal delay={160} className="rounded-2xl border-y border-r border-white/10 border-l-4 border-l-cyan-400/60 bg-white/5 p-5 transition
           hover:-translate-y-1 hover:bg-cyan-300/[0.07] hover:border-cyan-500/20
           hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.6)]">
            <p className="text-xs text-zinc-300">Expected for late 2026</p>
            <h3 className="mt-2 text-xl font-semibold">Story mode — Prologue and acts</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              In contrast, the Story mode of DreamShard is a structured, narrative-driven experience. It follows a set cast of characters through a multi-act storyline, where progression is persistent and
              choices carry long-term consequences. While the Arena mode is about surviving and adapting within a single run, the Story mode is about understanding the world, the characters, and the
              meaning behind the dreams that shape it.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {STORY_POINTS.map((x) => <li key={x}>• {x}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Visual preview (no trailer yet) */}
      <section id="preview" className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <Reveal className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
          <div className="flex items-end justify-between gap-4 pb-4">
            <div>
              <p className="ds-eyebrow text-amber-300/80">Media preview</p>
              <h2 className="mt-1 text-xl font-semibold md:text-2xl ds-pixel">Visual overview</h2>
              <p className="text-sm text-zinc-300">
                Trailer & gameplay will be displayed here when available. For now, enjoy the eternal darkness :)
              </p>
            </div>
            <a className="text-sm text-zinc-200 hover:text-white" href="#media">
              Go to medias →
            </a>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-zinc-300">
              Trailer soon — waiting for the almighty trailer of DreamShard.
            </div>
          </div>
        </Reveal>
      </section>

        {/* 2D-HD explaination */}
        <section
          id="what-is-2dhd"
          className="mx-auto max-w-6xl px-4 py-12 md:py-16 scroll-mt-24"
        >
          <Reveal className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur">
            <p className="ds-eyebrow text-cyan-300/80">Art direction</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-white ds-pixel">
              What is a 2D-HD RPG?
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3 md:items-center">
              <div className="md:col-span-2">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 aspect-1200/630">
                  <Image
                    src="/media/octopath-example.jpg"
                    alt="2D-HD RPG visual style example"
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 66vw, (min-width: 768px) 66vw, 100vw"
                  />
                </div>
              </div>

              {/* Explanation */}
              <div className="space-y-4 text-zinc-200 leading-relaxed md:text-lg">
                <p>
                  A <span className="text-white font-semibold">2D-HD RPG</span> blends{" "}
                  <span className="text-white font-semibold">2D pixel art characters</span>{" "}
                  with <span className="text-white font-semibold">3D environments</span>,
                  modern lighting, depth of field, and subtle post-processing.
                </p>

                <p>
                  A well-known example is{" "}
                  <span className="text-white font-semibold">Octopath Traveler</span>:
                  characters remain crisp 2D sprites, while the world is built in 3D with
                  rich lighting and depth — creating a “miniature diorama” feel without
                  changing the core 2D gameplay.
                </p>

                <a
                  href="https://en.wikipedia.org/wiki/HD-2D#:~:text=HD%2D2D%20or%20HD2D%20is,with%20fully%20three%2Ddimensional%20environments."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition"
                >
                  <span>More info</span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </section>

      {/* Gameplay loop */}
      <section id="gameplay" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <Reveal>
          <p className="ds-eyebrow text-amber-300/80">How to play</p>
          <h2 className="mt-1 text-2xl font-semibold md:text-3xl ds-pixel">Gameplay loop</h2>
          <p className="text-zinc-300">How do you play DreamShard?</p>
        </Reveal>

<div className="mt-8 grid gap-4 md:grid-cols-2">
  {GAMEPLAY_LOOP.map((s, idx) => (
    <Reveal
      key={s.title}
      delay={idx * 80}
      className={`rounded-2xl border-y border-r border-white/10 border-l-4 ${ACCENT_BORDERS[idx % ACCENT_BORDERS.length]} bg-white/5 p-5 transition
           hover:-translate-y-1 hover:bg-cyan-400/[0.06] hover:border-cyan-400/20
           hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.6)]`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold">
          {idx + 1}
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold">{s.title}</h3>

          {/* phrase courte */}
          <p className="mt-2 text-sm leading-relaxed text-zinc-200">
            {s.lead}
          </p>

          {/* bullets scannables */}
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {s.bullets.map((b: string) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          {/* note optionnelle */}
          {s.note && (
            <p className="mt-4 text-xs italic text-zinc-400 leading-relaxed">
              {s.note}
            </p>
          )}
        </div>
      </div>
      {s.title.startsWith("Battle — Lucidity") && <LucidityChaosMeter />}
    </Reveal>
  ))}
</div>
      </section>

      {/* Media placeholders */}
      <section id="media" className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <Reveal>
          <p className="ds-eyebrow text-violet-300/80">Screenshots &amp; clips</p>
          <h2 className="mt-1 text-2xl font-semibold md:text-3xl ds-pixel">Medias</h2>
          <p className="text-zinc-300">
            No images of the game ? Why ?
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {["Screenshot 1", "Screenshot 2", "GIF 1", "Key art"].map((label, idx) => (
            <Reveal
              key={label}
              delay={idx * 80}
              className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="absolute inset-0 ds-scanlines opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center p-3 text-center text-xs text-zinc-300">
                {label} — soon
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <Reveal className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="ds-eyebrow text-cyan-300/80">Timeline</p>
          <h2 className="mt-1 text-2xl font-semibold md:text-3xl ds-pixel">Roadmap</h2>
          <p className="mt-2 text-zinc-300">
            The development roadmap
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ROADMAP.map((r, idx) => (
              <Reveal
                key={r.title}
                delay={idx * 60}
                className={`rounded-2xl border-y border-r border-white/10 border-l-4 ${ACCENT_BORDERS[idx % ACCENT_BORDERS.length]} bg-black/20 p-5`}
              >
                <p className="text-sm text-zinc-300">{r.phase}</p>
                <p className="mt-1 font-semibold">{r.title}</p>
                <p className="mt-2 text-sm text-zinc-300">{r.desc}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-zinc-950 hover:bg-zinc-100"
            >
              Contact me !
            </button>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <Reveal>
          <p className="ds-eyebrow text-amber-300/80">Questions</p>
          <h2 className="mt-1 text-2xl font-semibold md:text-3xl ds-pixel">FAQ</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {FAQ.map((item, idx) => (
            <Reveal key={item.q} delay={(idx % 2) * 80} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold">{item.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.a}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} DreamShard</p>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#modes">Modes</a>
            <a className="hover:text-white" href="#roadmap">Roadmap</a>
            <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="hover:text-white"
          >
            Contact
          </button>
          </div>
        </div>
      </footer>

{/* Contact Modal */}
{isContactOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-label="Contact"
  >
    {/* Backdrop */}
    <button
      type="button"
      onClick={() => setIsContactOpen(false)}
      className="absolute inset-0 bg-black/70"
      aria-label="Close contact dialog"
    />

    {/* Modal */}
    <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-xl">
      <div className="absolute inset-0 rounded-3xl ds-scanlines opacity-20 pointer-events-none" />

      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold ds-pixel">Contact</h3>
          <button
            type="button"
            onClick={() => setIsContactOpen(false)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <p className="text-sm leading-relaxed text-zinc-200">
          You can send us an email about anything about the game at this address:
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold text-white break-all">{EMAIL}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-zinc-950 hover:bg-zinc-100"
          >
            Open email
          </a>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(EMAIL);
            }}
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center font-semibold text-white hover:bg-white/10"
          >
            Copy address
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </main>
  );
}
