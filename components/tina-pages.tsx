"use client";

/**
 * Tina visual-editor wrappers.
 *
 * Each page has ONE useTina() call for its primary CMS document.
 * This is the minimum needed for live field updates in the visual editor.
 *
 * Work items, FAQs, and global settings are passed as static props —
 * changes to those collections save normally and redeploy via Vercel.
 */

import { useTina } from "tinacms/dist/react";

import {
  HomepageDocument,
  CreativePageDocument,
  SystemsPageDocument,
  AboutPageDocument,
  GlobalDocument,
  WorkConnectionDocument,
  FaqConnectionDocument,
} from "@/tina/__generated__/types";

import {
  HomePage,
  CreativePage,
  SystemsPage,
  AboutPage,
  WorkPage,
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
  return (
    <HomePage
      homepage={data.homepage as HomepageData}
      workItems={workItems}
      faqs={faqs}
      global={global}
    />
  );
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
  return (
    <CreativePage
      data={data.creativePage as CreativePageData}
      sharedFaqs={sharedFaqs}
      global={global}
    />
  );
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
  return (
    <SystemsPage
      data={data.systemsPage as SystemsPageData}
      sharedFaqs={sharedFaqs}
      global={global}
    />
  );
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
  return (
    <AboutPage
      data={data.aboutPage as AboutPageData}
      global={global}
    />
  );
}

// ─── Global Settings ───────────────────────────────────────────────────────
// Separate wrapper so footer updates show live on any page that uses it.

interface TinaGlobalProps {
  initialGlobal: GlobalData;
  children: (global: GlobalData) => React.ReactNode;
}

export function TinaGlobal({ initialGlobal, children }: TinaGlobalProps) {
  const { data } = useTina({
    query: GlobalDocument,
    variables: { relativePath: "global.json" },
    data: { global: initialGlobal },
  });
  return <>{children(data.global as GlobalData)}</>;
}

// ─── Work Page ─────────────────────────────────────────────────────────────

interface TinaWorkPageProps {
  workItems: WorkItem[];
  global: GlobalData;
}

export function TinaWorkPage({ workItems, global }: TinaWorkPageProps) {
  // Work items are a list collection — useTina with connection doc
  const { data } = useTina({
    query: WorkConnectionDocument,
    variables: {},
    data: {
      workConnection: {
        totalCount: workItems.length,
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
          startCursor: "",
          endCursor: "",
        },
        edges: workItems.map((item) => ({ cursor: "", node: item })),
      },
    },
  });

  // Extract items from live or static connection
  const liveItems: WorkItem[] = (
    (data as { workConnection?: { edges?: Array<{ node?: WorkItem } | null> | null } })
      .workConnection?.edges ?? []
  )
    .map((e) => e?.node)
    .filter((n): n is WorkItem => !!n)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return <WorkPage items={liveItems.length ? liveItems : workItems} global={global} />;
}
