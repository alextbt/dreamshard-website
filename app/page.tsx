"use client";
import { useEffect, useState } from "react";

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
    contact: "mailto:frameperfectstudio.dev@gmail.com", // change si besoin
  };

const [glitchOn, setGlitchOn] = useState(false);

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

  const FEATURES = [
    {
      title: "Role Play Game (RPG), made in pixel art",
      desc: "A nocturnal and mysterious artistic direction, with dreams that change themes (dreamlike, fantasy, sci-fi, etc..",
    },
    {
      title: "Two main game modes",
      desc: "Arena mode (available at launch) + Story mode (will be released gradually after the game's release).",
    },
    {
      title: "Complex and vast",
      desc: "Both game modes are significant and offer a wide variety of gameplay possibilities.",
    },
  ];

  const STORY_POINTS = [
    "Complex plot in several acts",
    "High school students see their dreams come true... but at what cost?",
    "Shifting themes and deep lore",
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
    { phase: "Second semester of 2026", title: "Pre-release development phase", desc: "Story mode developement period, planning to release the prologue of the game in late 2026." },
    { phase: "November 2026", title: "Pre-release demo", desc: "A demo for the prologue of DreamShard's story mode will be available. Depending on your feedback on this demo, act 1 will be developed, aiming at a early 2027 release." },
    { phase: "Christmas 2026", title: "DreamShard release date", desc: "For the first time, DreamShard will be fully available for both game modes, Arena and Story (Prologue only)." },
  ];

  const FAQ = [
    { q: "When can we try out the game?", a: "Not until May 2026 at best. Follow the given roadmap to follow the progession of the game." },
    { q: "How much will DreamShard cost?", a: "For now, DreamShard should not be officially released considering the used sprites, animations and soundtracks that are not ours. If the game manages to become 100% original, it will probably be released on Steam for a maximum of €5-10." },
    { q: "On which plateform can I play the game?", a: "Only on PC... and on any PC (given the pixel art graphics)." },
    { q: "Isn't pixel art a bit odd for a game nowadays?", a: "Beyond the nostalgic aspect that pixel art can have, it is also a process still widely used by some independent developers. The game's appearance has no influence on its gameplay quality: my game will be perfectly playable, attractive, and smooth. You'd be surprised at what can be done with pixels..." },
    { q: "What's an RPG?", a: "RPG stands for Role Playing Game, meaning that you will play a specific character and that you will progress through the game by developing your character, both statistically and personally. DreamShard borrows heavily from the JRPG style, or Japanese RPG format, particularly in its turn-based gameplay. " },
    { q: "How is DreamShard played?", a: "You will explore and fight with your team against different enemies. The game is turn-based, during a fight, you prepare your actions, and execute them before/after the enemy. Then, it's the enemy's turn to attack, and the process begins again. Read the Gameplay loop part for more informations." },
    { q: "How long to beat DreamShard?", a: "In Arena mode, you can do series of 20-30 min runs, depending on how good you play. For story mode, for the prologue only, it's expected to last 5 to 10 hours to finish it. The full story mode (if all acts ever release), is expected to last as long as the prologue x6, so 30 hours minimum." },
    { q: "Is DreamShard hard?", a: "Although I love challenging games, DreamShard can be finished easily considering the game gives other options if you want to avoid using the most timing-relient and harder game mechanics. However, to complete the Arena gamemode or to finish the Story at 100% completion, you will have to die and retry a lot."}
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span
  className={`font-semibold tracking-wide ds-pixel ds-glitch ${glitchOn ? "ds-glitch--on" : ""}`}
  data-text="DreamShard"
>
  DreamShard
</span>

          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-200 md:flex">
            <a className="hover:text-white" href="#about">About</a>
            <a className="hover:text-white" href="#modes">Modes</a>
            <a className="hover:text-white" href="#gameplay">Gameplay</a>
            <a className="hover:text-white" href="#media">Medias</a>
            <a className="hover:text-white" href="#roadmap">Roadmap</a>
            <a className="hover:text-white" href="#faq">FAQ</a>
          </nav>

          <a
            href={LINKS.follow}
            className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
          >
            Follow the development
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-950/60 to-zinc-950" />
          {/* “Pixel-ish” texture via gradients only (pas d’images requises) */}
          <div className="absolute inset-0 opacity-40 ds-grid" />
          <div className="absolute inset-0 opacity-25 ds-scanlines" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-200">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              First phase of development — images & demo to come
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl ds-pixel">
              DreamShard
            </h1>

            <p className="text-base leading-relaxed text-zinc-200 md:text-lg">
              DreamShard is a <span className="text-white font-semibold">2D pixel art RPG</span> where
              <span className="text-white font-semibold"> dreams come true</span>.
              </p>
            <p className="text-base leading-relawed text-zinc-200 md:text-lg">
              The game has 2 main gamemodes: an <span className="text-white font-semibold">Arena mode</span> (challenges, fights, hidden secrets)
              scheduled to release first, and a <span className="text-white font-semibold">Story mode</span> in acts (with a prologue),
              on highschoolers facing consequences of their materialized dreams.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
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
        </div>
      </section>

      {/* About / Features */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl ds-pixel">
              What&apos;s DreamShard?
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              It’s an RPG where the universe changes depending on dreams and nightmares : sometimes beautiful, often brutal,
              a lot of settings are to be expected. The player progesses through fights, challenges, revelations, with a rather dark ambiance.
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-zinc-200">
                ✦ The projet aims <span className="text-white font-semibold">at making you feel</span> the strangeness of a dream being real and all of it’s abuses.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition
           hover:-translate-y-1 hover:bg-white/[0.07] hover:border-white/20
           hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.6)]">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes */}
      <section id="modes" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 className="text-2xl font-semibold md:text-3xl ds-pixel">Two gamemodes</h2>
        <p className="mt-2 text-zinc-300 max-w-3xl">
          DreamShard has 2 gamemodes: an arena roguelike and a story driven adventure.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition
           hover:-translate-y-1 hover:bg-red-300/[0.07] hover:border-red-500/20
           hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.6)]">
            <p className="text-xs text-zinc-300">Expected for mid-2026</p>
            <h3 className="mt-2 text-xl font-semibold">Roguelike mode — The Arena</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              The Arena mode in DreamShard is a fast-paced, replayable experience built around a combat arena.
              Each run places the player inside an arena filled with successive waves of enemies. Between these waves, the player chooses how to grow stronger, shaping a unique build. 
              While upgrades are erased between runs, the player keeps progressing with unique perks that unlocks through multiple attempts.
              A key element of this mode is character and builds diversity: all charcters are played differently with specific perks, upgrades and gameplay, dramatically changing how the arena is approached 
              and how combat unfolds. This gamemode focuses on mastery, replayability, and discovery through gameplay, with hidden events and subtle narrative hints woven into the action.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition
           hover:-translate-y-1 hover:bg-blue-300/[0.07] hover:border-blue-600/20
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
          </div>
        </div>
      </section>

      {/* Visual preview (no trailer yet) */}
      <section id="preview" className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
          <div className="flex items-end justify-between gap-4 pb-4">
            <div>
              <h2 className="text-xl font-semibold md:text-2xl ds-pixel">Visual overview</h2>
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
        </div>
      </section>

      {/* Gameplay loop */}
      <section id="gameplay" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold md:text-3xl ds-pixel">Gameplay loop</h2>
          <p className="text-zinc-300">How do you play DreamShard?</p>
        </div>

<div className="mt-8 grid gap-4 md:grid-cols-2">
  {GAMEPLAY_LOOP.map((s, idx) => (
    <div
      key={s.title}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 transition
           hover:-translate-y-1 hover:bg-white/[0.07] hover:border-white/20
           hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.6)]"

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
    </div>
  ))}
</div>
      </section>

      {/* Media placeholders */}
      <section id="media" className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold md:text-3xl ds-pixel">Medias</h2>
          <p className="text-zinc-300">
            No images of the game ? Why ?
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {["Screenshot 1", "Screenshot 2", "GIF 1", "Key art"].map((label) => (
            <div
              key={label}
              className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="absolute inset-0 ds-scanlines opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center p-3 text-center text-xs text-zinc-300">
                {label} — soon
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold md:text-3xl ds-pixel">Roadmap</h2>
          <p className="mt-2 text-zinc-300">
            The development roadmap
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ROADMAP.map((r) => (
              <div key={r.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-zinc-300">{r.phase}</p>
                <p className="mt-1 font-semibold">{r.title}</p>
                <p className="mt-2 text-sm text-zinc-300">{r.desc}</p>
              </div>
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
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <h2 className="text-2xl font-semibold md:text-3xl ds-pixel">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold">{item.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 pb-10">
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
