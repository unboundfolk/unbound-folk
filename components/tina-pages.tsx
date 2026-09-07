"use client";

/**
 * Tina visual-editor wrappers.
 *
 * Each component:
 *  1. Accepts static JSON data read server-side (fast, no cloud dependency).
 *  2. Passes it through useTina, which activates live field updates only when
 *     the page is loaded inside the TinaCMS admin iframe (visual editor mode).
 *  3. In normal site visits useTina is a no-op — it just returns the static data.
 */

import { useTina } from "tinacms/dist/react";

import {
  HomepageDocument,
  CreativePageDocument,
  SystemsPageDocument,
  AboutPageDocument,
} from "@/tina/__generated__/types";

import {
  HomePage,
  CreativePage,
  SystemsPage,
  AboutPage,
} from "@/components/marketing-site";

import type {
  HomepageData,
  CreativePageData,
  SystemsPageData,
  AboutPageData,
  WorkItem,
  FaqItem,
  GlobalData,
} from "@/components/marketing-site";

// ─── Homepage ──────────────────────────────────────────────────────────────

interface TinaHomePageProps {
  initialData: HomepageData;
  workItems: WorkItem[];
  faqs: FaqItem[];
  global: GlobalData;
}

export function TinaHomePage({ initialData, workItems, faqs, global }: TinaHomePageProps) {
  const { data } = useTina({
    query: HomepageDocument,
    variables: { relativePath: "homepage.json" },
    data: { homepage: initialData },
  });

  const hp = data.homepage as HomepageData;
  return <HomePage homepage={hp} workItems={workItems} faqs={faqs} global={global} />;
}

// ─── Creative Page ─────────────────────────────────────────────────────────

interface TinaCreativePageProps {
  initialData: CreativePageData;
  sharedFaqs: FaqItem[];
  global: GlobalData;
}

export function TinaCreativePage({ initialData, sharedFaqs, global }: TinaCreativePageProps) {
  const { data } = useTina({
    query: CreativePageDocument,
    variables: { relativePath: "creative.json" },
    data: { creativePage: initialData },
  });

  const pd = data.creativePage as CreativePageData;
  return <CreativePage data={pd} sharedFaqs={sharedFaqs} global={global} />;
}

// ─── Systems Page ──────────────────────────────────────────────────────────

interface TinaSystemsPageProps {
  initialData: SystemsPageData;
  sharedFaqs: FaqItem[];
  global: GlobalData;
}

export function TinaSystemsPage({ initialData, sharedFaqs, global }: TinaSystemsPageProps) {
  const { data } = useTina({
    query: SystemsPageDocument,
    variables: { relativePath: "systems.json" },
    data: { systemsPage: initialData },
  });

  const pd = data.systemsPage as SystemsPageData;
  return <SystemsPage data={pd} sharedFaqs={sharedFaqs} global={global} />;
}

// ─── About Page ────────────────────────────────────────────────────────────

interface TinaAboutPageProps {
  initialData: AboutPageData;
  global: GlobalData;
}

export function TinaAboutPage({ initialData, global }: TinaAboutPageProps) {
  const { data } = useTina({
    query: AboutPageDocument,
    variables: { relativePath: "about.json" },
    data: { aboutPage: initialData },
  });

  const pd = data.aboutPage as AboutPageData;
  return <AboutPage data={pd} global={global} />;
}
