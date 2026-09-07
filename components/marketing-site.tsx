"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  DatabaseZap,
  Gauge,
  Layers3,
  LineChart,
  Mail,
  Menu,
  MonitorCog,
  Palette,
  Phone,
  Play,
  Sparkles,
  WandSparkles,
  Workflow,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── TinaCMS content types ───────────────────────────────────────────────────
export interface HomepageData {
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  problem: {
    headline: string;
    subtitle: string;
    cards: Array<{ label: string; title: string; copy: string }>;
  };
  pillarsEyebrow?: string;
  pillarsTitle?: string;
  pillarsCreativeTitle?: string;
  pillarsCreativeDescription?: string;
  pillarsCreativeServices?: string[];
  pillarsCreativeImage?: string;
  pillarsCreativeHref?: string;
  pillarsSystemsTitle?: string;
  pillarsSystemsDescription?: string;
  pillarsSystemsServices?: string[];
  pillarsSystemsImage?: string;
  pillarsSystemsHref?: string;
  why?: {
    title: string;
    subtitle: string;
    points: string[];
  };
  process?: {
    title: string;
    steps: Array<{ num: string; title: string; copy: string }>;
  };
  cta: {
    title: string;
    copy: string;
    button: string;
  };
}

export interface WorkItem {
  title: string;
  category: string;
  tags: string[];
  image: string;
  problem: string;
  solution: string;
  outcome: string;
  order?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  order?: number;
}

export interface SubPageHeroData {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  cta: string;
}

export interface FeatureItemData {
  title: string;
  copy: string;
}

export interface CreativePageData {
  hero: SubPageHeroData;
  featuresEyebrow: string;
  featuresTitle: string;
  features: FeatureItemData[];
  scopeEyebrow: string;
  scopeTitle: string;
  scopeCopy: string;
  ctaTitle: string;
  ctaCta: string;
  extraFaqs: FaqItem[];
}

export interface SystemsPageData {
  hero: SubPageHeroData;
  featuresEyebrow: string;
  featuresTitle: string;
  features: FeatureItemData[];
  useCasesEyebrow: string;
  useCasesTitle: string;
  useCases: string[];
  ctaTitle: string;
  ctaCta: string;
  extraFaqs: FaqItem[];
}

export interface AboutPageData {
  hero: SubPageHeroData;
  beliefEyebrow: string;
  beliefTitle: string;
  beliefs: Array<{ title: string; copy: string }>;
}

export interface GlobalData {
  footer: {
    tagline: string;
    email: string;
    phone: string;
    location: string;
  };
}
// ─────────────────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Home", href: "/" },
  { label: "Creative", href: "/creative" },
  { label: "Systems", href: "/systems" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

const creativeServices = [
  "3D Product Visuals",
  "Motion Graphics",
  "Social Media Content",
  "Brand Identity",
  "Graphic Design",
  "AI-Assisted Content",
];

const systemServices = [
  "Internal Tools",
  "CRM Systems",
  "Automation",
  "AI Workflows",
  "Dashboards",
  "Custom Software",
];

const workItems = [
  {
    title: "Botanical Launch System",
    category: "Creative",
    tags: ["Creative", "AI"],
    image: "/1.jpg",
    problem: "A skincare brand was launching new SKUs every quarter but their content kept looking rushed — inconsistent photos, mismatched copy, no visual rhythm.",
    solution: "We built a modular AI-assisted content system covering PDPs, ad creatives, and social drops — all under one visual direction.",
    outcome: "Each launch now ships with a full content set in less time, and the brand finally looks as good as the products.",
  },
  {
    title: "Lead Flow Command Center",
    category: "Automation",
    tags: ["Systems", "Automation"],
    image: "/13.jpg",
    problem: "A service team was juggling WhatsApp, Google Forms, and four different spreadsheets to track leads. Things fell through the cracks constantly.",
    solution: "We designed a CRM workflow with lead scoring, automatic task routing, and timed follow-up reminders built around how their team actually works.",
    outcome: "No more missed follow-ups. The team spends less time tracking and more time closing.",
  },
  {
    title: "F&B Motion Content Kit",
    category: "Motion",
    tags: ["Creative", "Motion"],
    image: "/8.jpg",
    problem: "A consumer brand had great products but their social content looked homemade. They needed motion assets that matched the premium side of what they sell.",
    solution: "We created animated product scenes, looping transitions, and a set of reusable content templates they can run each campaign.",
    outcome: "Their feed now stops scrolls. The templates mean each new promo takes hours, not days.",
  },
  {
    title: "Approval Workflow Portal",
    category: "Systems",
    tags: ["Systems", "Automation"],
    image: "/10.jpg",
    problem: "Every approval lived in a different chat thread. Nobody knew what was pending, who was responsible, or whether something had actually been signed off.",
    solution: "We built a lightweight internal portal for raising requests, tracking statuses, leaving comments, and keeping an audit trail everyone can see.",
    outcome: "Approvals that used to take three days now clear in one. And when something stalls, it's obvious why.",
  },
  {
    title: "AI Content Production Desk",
    category: "AI",
    tags: ["AI", "Creative", "Systems"],
    image: "/12.jpg",
    problem: "A small content team was maxed out. More SKUs, more channels, same headcount — the math didn't work.",
    solution: "We set up an AI-assisted production pipeline with custom prompt systems, visual briefs, and a review layer that kept quality high.",
    outcome: "Output doubled without hiring. The team now focuses on creative direction rather than execution.",
  },
  {
    title: "SME Brand Refresh",
    category: "Branding",
    tags: ["Branding", "Creative"],
    image: "/14.jpg",
    problem: "The company had been around for years but their branding hadn't kept up. Online, they looked smaller and less credible than they actually were.",
    solution: "We refreshed the identity with updated logo direction, a proper colour and type system, and digital-first brand templates.",
    outcome: "They started winning pitches they were previously losing. The first impression finally matched the reality.",
  },
];

const faqs = [
  {
    q: "What exactly does Unbound Folk do?",
    a: "We help Malaysian businesses on two fronts: how they look, and how they work. That means creative content, brand visuals, and AI-assisted production on one side — and custom software, CRM systems, and workflow automation on the other. Some clients need one. Some need both.",
  },
  {
    q: "Who do you typically work with?",
    a: "Founders, growing SMEs, e-commerce brands, and operations teams who've hit the ceiling of what spreadsheets and chat threads can handle. If your business is growing but your content or internal processes can't keep up, that's usually where we come in.",
  },
  {
    q: "Can you handle both creative work and system-building for us?",
    a: "Yes, and honestly that's where we do our best work. When the brand looks sharp and the operations run clean, everything compounds. We've intentionally built both capabilities so you don't have to stitch together two different vendors.",
  },
];

const pageEase = [0.16, 1, 0.3, 1] as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Section({
  eyebrow,
  title,
  copy,
  children,
  className,
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cx("relative px-5 py-20 sm:px-6 lg:px-8 lg:py-28", className)}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || copy) && (
          <Reveal className="mb-10 max-w-3xl">
            {eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-lime-300">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">{title}</h2>}
            {copy && <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">{copy}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: pageEase, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-200",
        variant === "primary" && "bg-lime-300 text-slate-950 shadow-[0_18px_60px_rgba(190,242,100,0.22)] hover:bg-lime-200",
        variant === "secondary" && "border border-white/15 bg-white/8 text-white backdrop-blur hover:border-white/25 hover:bg-white/12",
        variant === "ghost" && "text-white hover:text-lime-200"
      )}
    >
      {children}
    </Link>
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: pageEase }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/12 bg-slate-950/75 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl"
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/uf-logo.svg" alt="Unbound Folk logo" width={34} height={34} className="rounded-lg" priority />
          <span className="text-sm font-bold tracking-tight text-white">Unbound Folk</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                pathname === item.href ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <ButtonLink href="/contact">Book Call <ArrowUpRight size={15} /></ButtonLink>
        </div>
        <button
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/12 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-white hover:bg-white/8"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-lime-300 px-5 text-sm font-bold text-slate-950"
            >
              Book a Discovery Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer({ global }: { global?: GlobalData }) {
  const footer = global?.footer;
  const email = footer?.email ?? "hello@unboundfolk.com";
  const phone = footer?.phone ?? "+60 18-986 5212";
  const location = footer?.location ?? "Malaysia";
  const tagline = footer?.tagline ?? "A creative-tech studio helping growing businesses in Malaysia look sharper and run smarter.";
  const phoneHref = "https://wa.me/" + phone.replace(/[^0-9]/g, "");
  return (
    <footer className="border-t border-white/10 px-5 py-12 text-slate-300 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src="/uf-logo.svg" alt="Unbound Folk logo" width={36} height={36} />
            <span className="font-bold text-white">Unbound Folk</span>
          </div>
          <p className="max-w-md text-sm leading-6">{tagline}</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Explore</p>
          <div className="grid gap-2 text-sm">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="hover:text-lime-200">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Contact</p>
          <div className="grid gap-2 text-sm">
            <a href={`mailto:${email}`} className="hover:text-lime-200">{email}</a>
            <a href={phoneHref} className="hover:text-lime-200">{phone}</a>
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl text-xs text-slate-500">© {new Date().getFullYear()} Unbound Folk. All rights reserved.</div>
    </footer>
  );
}

export function SiteShell({ children, global }: { children: React.ReactNode; global?: GlobalData }) {
  return (
    <div
      className="min-h-screen overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, rgba(190, 242, 100, 0.18), transparent 28%), radial-gradient(circle at 80% 10%, rgba(56, 189, 248, 0.14), transparent 26%), radial-gradient(circle at 50% 45%, rgba(244, 114, 182, 0.08), transparent 30%), #05070a",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] select-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
      <SiteHeader />
      {children}
      <Footer global={global} />
      <Link
        href="/contact"
        className="fixed bottom-4 left-4 right-4 z-40 flex min-h-12 items-center justify-center rounded-full bg-lime-300 px-5 text-sm font-bold text-slate-950 shadow-2xl shadow-black/30 md:hidden"
      >
        Book a Discovery Call
      </Link>
    </div>
  );
}

function HeroVisual() {
  const labels = [
    { label: "Creative", icon: Palette, className: "left-1 top-7" },
    { label: "AI", icon: BrainCircuit, className: "right-4 top-2" },
    { label: "Automation", icon: Workflow, className: "left-8 bottom-8" },
    { label: "Systems", icon: MonitorCog, className: "right-2 bottom-16" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.9, ease: pageEase, delay: 0.15 }}
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      <div className="absolute inset-8 rounded-[2rem] border border-white/10 bg-white/8 shadow-2xl shadow-black/30 backdrop-blur-xl" />
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-16 overflow-hidden rounded-[2rem] border border-white/15"
      >
        <Image src="/12.jpg" alt="Premium AI-assisted product visual by Unbound Folk" fill sizes="(max-width: 768px) 80vw, 520px" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-200">Creative-tech studio</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">Look sharp. Run clean.</p>
        </div>
      </motion.div>
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/20 blur-3xl" />
      {labels.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            animate={{ y: [0, index % 2 ? 10 : -10, 0] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
            className={cx("absolute flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur", item.className)}
          >
            <Icon size={17} className="text-lime-200" />
            {item.label}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

const SHOWREEL_URL = "https://pub-bbbfbd5704db4bcb97e12fd006199ff8.r2.dev/UF-Showreel-2026.mp4";
const LOOP_URL = "https://pub-bbbfbd5704db4bcb97e12fd006199ff8.r2.dev/UF-Showreel-2026%20(1).mp4";

function ShowreelModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3, ease: pageEase }}
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close showreel"
          >
            <X size={18} />
          </button>
          <video
            src={SHOWREEL_URL}
            controls
            autoPlay
            className="aspect-video w-full"
            aria-label="Unbound Folk Showreel 2026"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function HeroSection({ hero }: { hero: HomepageData["hero"] }) {
  const reduce = useReducedMotion();
  const [showReel, setShowReel] = useState(false);
  return (
    <>
    {showReel && <ShowreelModal onClose={() => setShowReel(false)} />}
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src={LOOP_URL} type="video/mp4" />
        <Image src="/12.jpg" alt="" fill className="object-cover" priority aria-hidden="true" />
      </video>

      {/* ── 70% dark overlay + frosted glass blur ── */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[10px]" aria-hidden="true" />

      {/* ── Additional gradient for text legibility ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/80 via-transparent to-[#05070a]/40" aria-hidden="true" />

      {/* ── Centred content ── */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-5 pb-24 pt-32 text-center sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: pageEase }}
          className="flex max-w-4xl flex-col items-center"
        >
          {/* Pill badge */}
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-lime-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
            {hero.badge}
          </span>

          {/* Headline */}
          <h1 className="text-5xl font-bold leading-[0.9] tracking-tighter text-white drop-shadow-xl sm:text-6xl lg:text-7xl xl:text-[6rem]">
            {hero.headline}<br />
            <span className="text-lime-300">{hero.headlineAccent}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/75 drop-shadow-sm">
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/contact">
              {hero.ctaPrimary} <ArrowRight size={16} />
            </ButtonLink>
            <button
              onClick={() => setShowReel(true)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/15"
            >
              <Play size={14} fill="currentColor" /> {hero.ctaSecondary}
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 pt-2"
        >
          <div className="h-1.5 w-1 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
    </>
  );
}

export function HomePage({
  homepage,
  workItems: workItemsFromCms,
  faqs: faqsFromCms,
  global,
}: {
  homepage?: HomepageData;
  workItems?: WorkItem[];
  faqs?: FaqItem[];
  global?: GlobalData;
}) {
  const hero = homepage?.hero;
  const problem = homepage?.problem;
  const cta = homepage?.cta;

  return (
    <SiteShell global={global}>
      <main>
        <HeroSection hero={hero ?? {
          badge: "Creative Studio + Systems Partner · Malaysia",
          headline: "Sharp Brand.",
          headlineAccent: "Smart Systems.",
          subtitle: "We help businesses in Malaysia stand out visually and operate smarter — through creative design, AI, and custom-built systems.",
          ctaPrimary: "Book a Discovery Call",
          ctaSecondary: "Play Showreel",
        }} />
        <ProblemSection problem={problem} />
        <PillarsSection homepage={homepage} />
        <WhySection why={homepage?.why} />
        <ProcessSection process={homepage?.process} />
        <WorkPreview items={workItemsFromCms} />
        <FAQSection items={faqsFromCms?.map((f) => ({ q: f.question, a: f.answer }))} />
        <CTASection
          title={cta?.title}
          copy={cta?.copy}
          cta={cta?.button}
        />
      </main>
    </SiteShell>
  );
}

function TrustSection() {
  const items = [
    "Founders", "SME Teams", "E-commerce Brands", "Service Companies",
    "Operations Teams", "Creative Leads", "Product Studios", "Growing Businesses",
    "Startups", "Retail Brands", "Tech Companies", "Agencies",
  ];
  const doubled = [...items, ...items];
  return (
    <section className="overflow-hidden border-y border-white/[0.07] bg-white/[0.015] py-4">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#05070a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#05070a] to-transparent" />
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
          {doubled.map((item, i) => (
            <span key={i} className="mx-8 shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              {item}
              <span className="ml-8 text-lime-300/25">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const DEFAULT_PROBLEM: HomepageData["problem"] = {
  headline: "Most Businesses Are Losing on Two Fronts at Once.",
  subtitle: "Externally, your brand isn't making the impression it should. Internally, your team is burning time on things that should be automatic. Both are fixable — and more connected than you think.",
  cards: [
    { label: "01", title: "How you look", copy: "First impressions happen fast. If your visuals, content, or brand feel inconsistent or dated, customers move on before you get to say anything." },
    { label: "02", title: "How you operate", copy: "Manual follow-ups, scattered approvals, data in five places — these don't just slow your team down. They quietly cap how big you can grow." },
  ],
};

function ProblemSection({ problem }: { problem?: HomepageData["problem"] }) {
  const { headline, subtitle, cards } = problem ?? DEFAULT_PROBLEM;
  return (
    <section className="relative px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
              {headline}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
              {subtitle}
            </p>
          </Reveal>
          <div className="flex flex-col gap-4">
            {cards.map(({ label, title, copy }) => (
              <Reveal key={title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-lime-300/20 hover:bg-white/[0.05]">
                <span className="mb-4 block font-mono text-xs font-bold tracking-[0.18em] text-lime-300/50">{label}</span>
                <p className="text-xl font-bold text-white">{title}</p>
                <p className="mt-3 leading-7 text-slate-400">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarsSection({ homepage }: { homepage?: HomepageData }) {
  return (
    <Section eyebrow={homepage?.pillarsEyebrow ?? "What we do"} title={homepage?.pillarsTitle ?? "Two Things, Done Properly."}>
      <div className="grid gap-5 lg:grid-cols-2">
        <ServicePillar
          icon={<WandSparkles size={22} />}
          title={homepage?.pillarsCreativeTitle ?? "Creative"}
          description={homepage?.pillarsCreativeDescription ?? "Brand visuals, motion content, and AI-assisted production that make people stop and take notice."}
          services={homepage?.pillarsCreativeServices ?? creativeServices}
          href={homepage?.pillarsCreativeHref ?? "/creative"}
          image={homepage?.pillarsCreativeImage ?? "/14.jpg"}
        />
        <ServicePillar
          icon={<Cpu size={22} />}
          title={homepage?.pillarsSystemsTitle ?? "Systems"}
          description={homepage?.pillarsSystemsDescription ?? "Custom software, automation, and AI workflows that remove the friction holding your team back."}
          services={homepage?.pillarsSystemsServices ?? systemServices}
          href={homepage?.pillarsSystemsHref ?? "/systems"}
          image={homepage?.pillarsSystemsImage ?? "/13.jpg"}
        />
      </div>
    </Section>
  );
}

function ServicePillar({ icon, title, description, services, href, image }: { icon: React.ReactNode; title: string; description: string; services: string[]; href: string; image: string }) {
  return (
    <Reveal className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] shadow-2xl shadow-black/20">
      <Link href={href} className="block">
        <div className="relative h-72 overflow-hidden">
          <Image src={image} alt={`${title} by Unbound Folk`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-6 left-7 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-300 text-slate-950">{icon}</div>
        </div>
        <div className="p-7">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="mt-3 leading-7 text-slate-300">{description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {services.map((service) => (
              <span key={service} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-400">{service}</span>
            ))}
          </div>
          <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-lime-300 transition group-hover:gap-3">
            Explore {title} <ArrowRight size={15} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

const DEFAULT_WHY_POINTS = [
  "We think about brand and operations together, not in silos",
  "We build for the outcome, not to show off the tech",
  "We move fast without cutting corners on quality",
  "We use AI where it genuinely helps — and skip it where it doesn't",
  "We stay communicative and don't disappear mid-project",
];

function WhySection({ why }: { why?: HomepageData["why"] }) {
  const title = why?.title ?? "We're Built Differently on Purpose.";
  const subtitle = why?.subtitle ?? "A lot of studios do creative or tech. We do both — and that's not an accident. It's how we're designed to work.";
  const points = why?.points && why.points.length > 0 ? why.points : DEFAULT_WHY_POINTS;
  return (
    <section className="relative px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">{title}</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-300">{subtitle}</p>
          </Reveal>
          <div>
            {points.map((point, i) => (
              <Reveal
                key={i}
                delay={i * 0.04}
                className={cx("flex items-start gap-5 py-5", i < points.length - 1 && "border-b border-white/10")}
              >
                <Check className="mt-0.5 shrink-0 text-lime-300" size={17} />
                <p className="text-base font-medium leading-7 text-white">{point}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const DEFAULT_PROCESS_STEPS = [
  { num: "01", title: "Discover", copy: "We spend real time understanding your business — your goals, your blockers, and what good would actually look like." },
  { num: "02", title: "Define", copy: "We scope the right solution together. No guesswork, no overselling. Just clarity on what we're building and why." },
  { num: "03", title: "Build", copy: "We design, develop, and deliver. You're kept in the loop throughout — no black boxes, no surprises." },
  { num: "04", title: "Refine", copy: "After launch, we improve based on what we see. Good work doesn't stop at handoff." },
];

function ProcessSection({ process }: { process?: HomepageData["process"] }) {
  const title = process?.title ?? "Simple Process. No Runaround.";
  const steps = process?.steps && process.steps.length > 0 ? process.steps : DEFAULT_PROCESS_STEPS;
  return (
    <section className="relative px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">{title}</h2>
        </Reveal>
        <div>
          {steps.map((step, i) => (
            <Reveal
              key={i}
              delay={i * 0.05}
              className="grid items-start gap-y-2 border-t border-white/10 py-8 sm:grid-cols-[64px_1fr] sm:gap-x-6 md:grid-cols-[64px_200px_1fr] md:items-center md:gap-x-10"
            >
              <span className="font-mono text-sm font-bold tabular-nums text-lime-300/60">{step.num}</span>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-slate-300 leading-7 sm:col-start-2 md:col-start-auto">{step.copy}</p>
            </Reveal>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}

function WorkPreview({ items }: { items?: WorkItem[] }) {
  const displayItems = items && items.length > 0 ? items : workItems;
  const [featured, ...rest] = displayItems.slice(0, 3);
  return (
    <Section eyebrow="Selected work" title="A Few Things We're Proud Of">
      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] lg:col-span-2">
          <div className="relative h-72 overflow-hidden">
            <Image src={featured.image} alt={`${featured.title} case study`} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-950">{featured.category}</span>
          </div>
          <div className="p-7">
            <h3 className="text-2xl font-bold text-white">{featured.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{featured.outcome}</p>
            <Link href="/work" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-lime-300 transition hover:gap-3">
              View Project <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {rest.map((item) => <CaseCard key={item.title} item={item} />)}
        </div>
      </div>
    </Section>
  );
}

function FAQSection({ items = faqs }: { items?: typeof faqs }) {
  return (
    <Section title="Questions We Get Asked a Lot" className="py-16 lg:py-20">
      <div>
        {items.map((item) => (
          <details key={item.q} className="group border-t border-white/10 py-6 last-of-type:border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
              {item.q}
              <ChevronDown className="shrink-0 text-lime-300 transition-transform duration-300 group-open:rotate-180" size={18} />
            </summary>
            <p className="mt-5 max-w-3xl leading-7 text-slate-300">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function CTASection({ title = "Ready to Stop Leaving Growth on the Table?", copy = "Book a discovery call. We'll spend 30 minutes understanding where you're stuck — and tell you honestly whether we can help.", cta = "Book a Discovery Call" }) {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-lime-300 p-10 shadow-[0_40px_140px_rgba(190,242,100,0.22)] sm:p-14 lg:p-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tighter text-slate-950 sm:text-5xl">{title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">{copy}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-slate-950 px-8 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            {cta} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ item }: { item: (typeof workItems)[number] }) {
  return (
    <Reveal className="group overflow-hidden rounded-[1.5rem] border border-white/10">
      <div className="relative h-52 overflow-hidden">
        <Image src={item.image} alt={`${item.title} case study`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-950">{item.category}</span>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-base font-bold text-white">{item.title}</h3>
        </div>
      </div>
      <div className="border-t border-white/8 bg-white/[0.04] px-5 py-4">
        <p className="text-sm leading-5 text-slate-400">{item.outcome}</p>
        <Link href="/work" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-lime-300 transition hover:gap-2.5">
          View Project <ArrowUpRight size={12} />
        </Link>
      </div>
    </Reveal>
  );
}

// Default icons for creative features (by position)
const CREATIVE_FEATURE_ICONS = [Layers3, Palette, Play, Sparkles, Bot, WandSparkles];
// Default icons for systems features (by position)
const SYSTEMS_FEATURE_ICONS = [MonitorCog, DatabaseZap, BrainCircuit, Workflow, BarChart3, Code2, Gauge, LineChart];

export function CreativePage({
  data,
  sharedFaqs,
  global,
}: {
  data?: CreativePageData;
  sharedFaqs?: FaqItem[];
  global?: GlobalData;
}) {
  const hero = data?.hero;
  const allFaqs = [
    ...(sharedFaqs ?? faqs).map((f) => ({ q: "question" in f ? f.question : (f as {q:string}).q, a: "answer" in f ? f.answer : (f as {a:string}).a })),
    ...(data?.extraFaqs ?? [
      { q: "Do you do video shoots or photography?", a: "No. We don't do physical shoots or traditional video editing. Our work lives in the designed, animated, 3D, and AI-assisted space — which gives us more creative range with less logistical overhead for you." },
      { q: "Can you maintain brand consistency across different content types?", a: "That's actually the core of how we work. We build visual systems, not one-off posts — so whether it's a product visual, a social graphic, or a motion asset, they all feel like they come from the same place." },
    ]).map((f) => ({ q: "question" in f ? f.question : (f as {q:string}).q, a: "answer" in f ? f.answer : (f as {a:string}).a })),
  ];
  const features = data?.features && data.features.length > 0 ? data.features : [
    { title: "3D product visuals", copy: "Product scenes and visual concepts built for campaigns, PDPs, and launches — without a photoshoot." },
    { title: "Social media content", copy: "Designed posts, stories, and ad creatives that feel intentional, not templated." },
    { title: "Motion graphics", copy: "Animated assets for product reveals, promos, and social content that actually moves people." },
    { title: "Brand and graphic design", copy: "Logo direction, design systems, and digital templates that give your team something consistent to work with." },
    { title: "AI content production", copy: "AI-assisted visual variations and content sets — directed with taste, reviewed for quality." },
  ];
  const featureItems: Array<[string, string, React.ComponentType<{ size?: number; className?: string }>]> =
    features.map((f, i) => [f.title, f.copy, CREATIVE_FEATURE_ICONS[i % CREATIVE_FEATURE_ICONS.length]]);
  return (
    <SiteShell global={global}>
      <SubPageHero
        eyebrow={hero?.eyebrow ?? "Creative"}
        title={hero?.title ?? "Content That Earns Attention — Not Just Fills a Feed."}
        copy={hero?.copy ?? "We design brand visuals, motion graphics, and AI-assisted content for businesses that want to show up looking like they mean it."}
        image={hero?.image ?? "/8.jpg"}
        cta={hero?.cta ?? "Start a Creative Project"}
      />
      <Section eyebrow={data?.featuresEyebrow ?? "What we make"} title={data?.featuresTitle ?? "Sharp Work Across Every Format"}>
        <FeatureGrid items={featureItems} />
      </Section>
      <Section eyebrow={data?.scopeEyebrow ?? "Honest about scope"} title={data?.scopeTitle ?? "What We Don't Do"} copy={data?.scopeCopy ?? "We don't shoot video on location, edit long-form footage, run your marketing strategy, or design physical packaging. Keeping our scope tight is how we keep our quality high."} />
      <FAQSection items={allFaqs} />
      <CTASection title={data?.ctaTitle ?? "Let's Make Your Brand Look Like It Means Business."} cta={data?.ctaCta ?? "Start a Creative Project"} />
    </SiteShell>
  );
}

export function SystemsPage({
  data,
  sharedFaqs,
  global,
}: {
  data?: SystemsPageData;
  sharedFaqs?: FaqItem[];
  global?: GlobalData;
}) {
  const hero = data?.hero;
  const useCases = data?.useCases && data.useCases.length > 0 ? data.useCases : [
    "Lead management system",
    "Quotation & invoice workflow",
    "Task delegation system",
    "Client portal",
    "Inventory tracking",
    "Approval workflow",
    "AI document assistant",
    "Automated reporting dashboard",
  ];
  const allFaqs = [
    ...(sharedFaqs ?? faqs).map((f) => ({ q: "question" in f ? f.question : (f as {q:string}).q, a: "answer" in f ? f.answer : (f as {a:string}).a })),
    ...(data?.extraFaqs ?? [
      { q: "Do you build fully custom software?", a: "Yes. We build internal tools, CRM systems, dashboards, portals, and web apps tailored to your specific workflow — not off-the-shelf tools bent to fit." },
      { q: "What kinds of things can you automate?", a: "Almost anything repetitive: follow-ups, approvals, status updates, data routing, reminders, reporting. We start by mapping what your team actually does manually, then figure out what's worth automating." },
      { q: "When does AI actually make sense in a business system?", a: "When it saves real time or makes decisions better. Document parsing, smart routing, content drafting, classification, summarisation — these are areas where AI earns its keep. We won't bolt it on just to say it's there." },
    ]).map((f) => ({ q: "question" in f ? f.question : (f as {q:string}).q, a: "answer" in f ? f.answer : (f as {a:string}).a })),
  ];
  const features = data?.features && data.features.length > 0 ? data.features : [
    { title: "Custom internal tools", copy: "Built around how your team actually works — not how a generic SaaS vendor assumes you do." },
    { title: "CRM and client management", copy: "One place to track leads, clients, tasks, and follow-ups. No more chasing threads across three apps." },
    { title: "AI-powered workflows", copy: "Smart automation that handles drafting, routing, classifying, and summarising — with a human in the loop where it counts." },
    { title: "Process automation", copy: "Repeatable tasks — approvals, reminders, handoffs, data entry — automated properly so they stop eating time." },
    { title: "Dashboards and reporting", copy: "The numbers your team actually needs, presented clearly, updated automatically." },
    { title: "Custom web apps", copy: "Purpose-built portals and applications when existing tools genuinely can't do the job." },
  ];
  const featureItems: Array<[string, string, React.ComponentType<{ size?: number; className?: string }>]> =
    features.map((f, i) => [f.title, f.copy, SYSTEMS_FEATURE_ICONS[i % SYSTEMS_FEATURE_ICONS.length]]);
  return (
    <SiteShell global={global}>
      <SubPageHero
        eyebrow={hero?.eyebrow ?? "Systems"}
        title={hero?.title ?? "Your Team Is Too Good to Be Stuck Doing This Manually."}
        copy={hero?.copy ?? "We build the internal tools, automation, and AI workflows that take busywork off your plate — so your people can focus on the work that actually matters."}
        image={hero?.image ?? "/13.jpg"}
        cta={hero?.cta ?? "Build My System"}
      />
      <Section eyebrow={data?.featuresEyebrow ?? "What we build"} title={data?.featuresTitle ?? "From Messy Processes to Clean, Working Systems"}>
        <FeatureGrid items={featureItems} />
      </Section>
      <Section eyebrow={data?.useCasesEyebrow ?? "Things we've built"} title={data?.useCasesTitle ?? "Real Systems for Real Problems"}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item, i) => (
            <Reveal key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm font-semibold text-white">
              <Gauge className="mb-5 text-lime-200" size={20} />
              {item}
            </Reveal>
          ))}
        </div>
      </Section>
      <FAQSection items={allFaqs} />
      <CTASection title={data?.ctaTitle ?? "Ready to Build Something Your Team Will Actually Thank You For?"} cta={data?.ctaCta ?? "Build My System"} />
    </SiteShell>
  );
}

function SubPageHero({ eyebrow, title, copy, image, cta }: { eyebrow: string; title: string; copy: string; image: string; cta: string }) {
  return (
    <section className="px-5 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.82fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: pageEase }}>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-lime-200">{eyebrow}</p>
          <h1 className="text-5xl font-bold leading-[0.94] tracking-tighter sm:text-6xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{copy}</p>
          <div className="mt-9"><ButtonLink href="/contact">{cta} <ArrowRight size={16} /></ButtonLink></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: pageEase }} className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
          <Image src={image} alt={`${eyebrow} hero visual`} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureGrid({ items }: { items: Array<[string, string, React.ComponentType<{ size?: number; className?: string }>]> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map(([title, copy, Icon], i) => (
        <Reveal
          key={title}
          delay={i * 0.04}
          className={cx(
            "rounded-3xl border border-white/10 bg-white/[0.04] p-7",
            i === 0 && "md:col-span-2 lg:col-span-1"
          )}
        >
          <Icon size={22} className="mb-8 text-lime-300" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function WorkPage({ items, global }: { items?: WorkItem[]; global?: GlobalData }) {
  const allItems = items && items.length > 0 ? items : workItems;
  const filters = ["All", "Creative", "Systems", "AI", "Automation", "Branding", "Motion"];
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => active === "All" ? allItems : allItems.filter((item) => item.tags.includes(active) || item.category === active), [active, allItems]);

  return (
    <SiteShell global={global}>
      <SubPageHero
        eyebrow="Work"
        title="Projects That Solved Real Problems."
        copy="A selection of creative, systems, and AI work — each one built around a specific problem a real business needed solved."
        image="/10.jpg"
        cta="Discuss a Project"
      />
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={cx("rounded-full border px-4 py-2 text-sm font-semibold transition", active === filter ? "border-lime-300 bg-lime-300 text-slate-950" : "border-white/10 bg-white/[0.04] text-slate-300 hover:text-white")}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <Reveal key={item.title} className="group overflow-hidden rounded-[1.5rem] border border-white/10">
                {/* Full-bleed image with title overlay */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={`${item.title}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-950">{item.category}</span>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="text-xl font-bold text-white">{item.title}</h2>
                  </div>
                </div>
                {/* Case study text */}
                <div className="border-t border-white/8 bg-white/[0.04] p-5">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300/70">The situation</p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{item.problem}</p>
                    </div>
                    <div className="border-t border-white/8 pt-3">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300/70">What we built</p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{item.solution}</p>
                    </div>
                    <div className="border-t border-white/8 pt-3">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300/70">The result</p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{item.outcome}</p>
                    </div>
                  </div>
                  <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-lime-300 transition hover:gap-2.5">
                    Discuss a similar project <ArrowUpRight size={12} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </SiteShell>
  );
}

export function AboutPage({
  data,
  global,
}: {
  data?: AboutPageData;
  global?: GlobalData;
}) {
  const hero = data?.hero;
  const beliefs = data?.beliefs && data.beliefs.length > 0 ? data.beliefs : [
    { title: "What we believe", copy: "A business can look great online and still be a mess internally. It can run like a machine and still fail to make an impression. You need both sides working — and most studios only touch one." },
    { title: "How we work", copy: "We listen before we propose. We ask uncomfortable questions. We'd rather scope something smaller and do it well than overpromise and underdeliver." },
    { title: "Why clients stay", copy: "We're honest about timelines and limitations. We communicate during the project, not just at the start and end. And we measure success by whether the thing we built actually works for you." },
  ];

  return (
    <SiteShell global={global}>

      {/* ── Cinematic full-bleed hero (no split layout) ── */}
      <section className="relative min-h-[90dvh] overflow-hidden">
        {/* Background image */}
        <Image
          src={hero?.image ?? "/uploads/about-hero.jpg"}
          alt="About Unbound Folk"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

        {/* Content — left-aligned, vertical center */}
        <div className="relative flex min-h-[90dvh] flex-col justify-end px-5 pb-20 pt-32 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: pageEase }}
            className="max-w-2xl"
          >
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.26em] text-lime-300">
              {hero?.eyebrow ?? "About"}
            </p>
            <h1 className="text-5xl font-bold leading-[0.92] tracking-tighter text-white sm:text-6xl lg:text-7xl">
              {hero?.title ?? "We Started Unbound Folk Because Most Businesses Needed Both."}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              {hero?.copy ?? "Not just a creative agency. Not just a dev shop. A studio that understands brand and operations — and builds for both without making you manage two different vendors."}
            </p>
            <div className="mt-9">
              <ButtonLink href="/contact">
                {hero?.cta ?? "Book a Discovery Call"} <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider pull-quote ── */}
      <section className="border-y border-white/8 bg-white/[0.02] px-5 py-14 sm:px-8 lg:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-2xl font-medium leading-[1.4] tracking-tight text-white/70 sm:text-3xl"
        >
          "Most studios pick a lane — <span className="text-white font-semibold">creative</span> or <span className="text-white font-semibold">tech</span>. We built Unbound Folk to cover both, because we saw too many clients managing two vendors who didn't talk to each other."
        </motion.p>
      </section>

      {/* ── Beliefs — vertical numbered editorial layout ── */}
      <section className="px-5 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-lime-300">
              {data?.beliefEyebrow ?? "How we think"}
            </p>
            <h2 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl">
              {data?.beliefTitle ?? "Brand Gets You In the Door. Systems Keep You Standing."}
            </h2>
          </div>

          <div className="divide-y divide-white/10">
            {beliefs.map((belief, i) => (
              <Reveal key={i}>
                <div className="grid grid-cols-[5rem_1fr] gap-6 py-10 sm:grid-cols-[8rem_1fr] sm:gap-10 lg:grid-cols-[10rem_1fr]">
                  {/* Large decorative number */}
                  <span
                    className="select-none text-6xl font-bold leading-none tracking-tighter text-white/10 sm:text-8xl"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">{belief.title}</h3>
                    <p className="mt-4 text-lg leading-8 text-slate-300">{belief.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteShell>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Enter your company"),
  interest: z.enum(["Creative Solutions", "Intelligent Systems", "Both", "Not Sure Yet"]),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  description: z.string().min(20, "Tell us a little more about the project"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactPage({ global }: { global?: GlobalData } = {}) {
  const [sent, setSent] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interest: "Both",
      budget: "",
      timeline: "",
      description: "",
    },
  });

  function onSubmit() {
    setSent(true);
    form.reset();
  }

  return (
    <SiteShell global={global}>
      <section className="px-5 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: pageEase }}>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-lime-200">Contact / Booking</p>
            <h1 className="text-5xl font-bold leading-[0.94] tracking-tighter sm:text-6xl">Tell Us What's Not Working.</h1>
            <p className="mt-7 text-lg leading-8 text-slate-300">
              Whether it's how your brand looks, how your team operates, or both — fill in the form and we'll set up a call to talk it through properly.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-slate-300">
              <a href="mailto:hello@unboundfolk.com" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:text-white"><Mail size={18} className="text-lime-200" /> hello@unboundfolk.com</a>
              <a href="https://wa.me/60189865212" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:text-white"><Phone size={18} className="text-lime-200" /> +60 18-986 5212</a>
            </div>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">Prefer to pick a time directly?</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">A booking calendar is coming soon. For now, the form below gets to us fastest — we usually respond within one business day.</p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: pageEase, delay: 0.08 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-8"
          >
            {sent && (
              <div className="mb-5 rounded-2xl border border-lime-300/30 bg-lime-300/10 p-4 text-sm font-semibold text-lime-100">
                Got it — we'll be in touch within one business day.
              </div>
            )}
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" error={form.formState.errors.name?.message}><input {...form.register("name")} className="field" /></Field>
              <Field label="Email" error={form.formState.errors.email?.message}><input {...form.register("email")} className="field" type="email" /></Field>
              <Field label="Company" error={form.formState.errors.company?.message}><input {...form.register("company")} className="field" /></Field>
              <Field label="Service interest" error={form.formState.errors.interest?.message}>
                <select {...form.register("interest")} className="field">
                  <option>Creative Solutions</option>
                  <option>Intelligent Systems</option>
                  <option>Both</option>
                  <option>Not Sure Yet</option>
                </select>
              </Field>
              <Field label="Budget range" error={form.formState.errors.budget?.message}>
                <select {...form.register("budget")} className="field">
                  <option value="">Select range</option>
                  <option>Below RM5,000</option>
                  <option>RM5,000 - RM15,000</option>
                  <option>RM15,000 - RM40,000</option>
                  <option>RM40,000+</option>
                </select>
              </Field>
              <Field label="Preferred timeline" error={form.formState.errors.timeline?.message}>
                <select {...form.register("timeline")} className="field">
                  <option value="">Select timeline</option>
                  <option>As soon as possible</option>
                  <option>Within 1 month</option>
                  <option>1 - 3 months</option>
                  <option>Still exploring</option>
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Project description" error={form.formState.errors.description?.message}>
                  <textarea {...form.register("description")} className="field min-h-36 resize-none" />
                </Field>
              </div>
            </div>
            <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 text-sm font-bold text-slate-950 hover:bg-lime-200 sm:w-auto">
              Book a Discovery Call <ArrowRight size={16} />
            </button>
          </motion.form>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-white">
      {label}
      {children}
      {error && <span className="text-xs font-medium text-red-300">{error}</span>}
    </label>
  );
}
