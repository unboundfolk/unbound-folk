"use client";

/**
 * Tina visual-editor wrappers.
 *
 * Every collection has its own useTina() call so ALL content can be edited
 * with live preview in the TinaCMS admin iframe.
 *
 * On normal site visits useTina() is a no-op — it returns the static data
 * passed in, so there is zero performance cost.
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

// ─── helpers ──────────────────────────────────────────────────────────────

/** Shape the initial work items array into the TinaCloud connection format */
function toWorkConnection(items: WorkItem[]) {
  return {
    workConnection: {
      totalCount: items.length,
      pageInfo: { hasPreviousPage: false, hasNextPage: false, startCursor: "", endCursor: "" },
      edges: items.map((item) => ({ cursor: "", node: item })),
    },
  };
}

/** Shape the initial faqs array into the TinaCloud connection format */
function toFaqConnection(items: FaqItem[]) {
  return {
    faqConnection: {
      totalCount: items.length,
      pageInfo: { hasPreviousPage: false, hasNextPage: false, startCursor: "", endCursor: "" },
      edges: items.map((item) => ({ cursor: "", node: item })),
    },
  };
}

/** Extract work items from a TinaCloud connection response */
function fromWorkConnection(conn: { workConnection?: { edges?: Array<{ node?: WorkItem | null } | null> | null } | null }): WorkItem[] {
  return (conn.workConnection?.edges ?? [])
    .map((e) => e?.node)
    .filter((n): n is WorkItem => !!n)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Extract faqs from a TinaCloud connection response */
function fromFaqConnection(conn: { faqConnection?: { edges?: Array<{ node?: FaqItem | null } | null> | null } | null }): FaqItem[] {
  return (conn.faqConnection?.edges ?? [])
    .map((e) => e?.node)
    .filter((n): n is FaqItem => !!n)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// ─── Homepage ──────────────────────────────────────────────────────────────

interface TinaHomePageProps {
  initialData: HomepageData;
  workItems: WorkItem[];
  faqs: FaqItem[];
  global: GlobalData;
}

export function TinaHomePage({ initialData, workItems, faqs, global: globalData }: TinaHomePageProps) {
  // Homepage content
  const { data: hp } = useTina({
    query: HomepageDocument,
    variables: { relativePath: "homepage.json" },
    data: { homepage: initialData },
  });

  // Work items (live when editing any work item)
  const { data: wk } = useTina({
    query: WorkConnectionDocument,
    variables: {},
    data: toWorkConnection(workItems),
  });

  // FAQs (live when editing any faq)
  const { data: fq } = useTina({
    query: FaqConnectionDocument,
    variables: {},
    data: toFaqConnection(faqs),
  });

  // Global / footer
  const { data: gl } = useTina({
    query: GlobalDocument,
    variables: { relativePath: "global.json" },
    data: { global: globalData },
  });

  return (
    <HomePage
      homepage={hp.homepage as HomepageData}
      workItems={fromWorkConnection(wk)}
      faqs={fromFaqConnection(fq)}
      global={gl.global as GlobalData}
    />
  );
}

// ─── Creative Page ─────────────────────────────────────────────────────────

interface TinaCreativePageProps {
  initialData: CreativePageData;
  sharedFaqs: FaqItem[];
  global: GlobalData;
}

export function TinaCreativePage({ initialData, sharedFaqs, global: globalData }: TinaCreativePageProps) {
  const { data: pd } = useTina({
    query: CreativePageDocument,
    variables: { relativePath: "creative.json" },
    data: { creativePage: initialData },
  });

  const { data: fq } = useTina({
    query: FaqConnectionDocument,
    variables: {},
    data: toFaqConnection(sharedFaqs),
  });

  const { data: gl } = useTina({
    query: GlobalDocument,
    variables: { relativePath: "global.json" },
    data: { global: globalData },
  });

  return (
    <CreativePage
      data={pd.creativePage as CreativePageData}
      sharedFaqs={fromFaqConnection(fq)}
      global={gl.global as GlobalData}
    />
  );
}

// ─── Systems Page ──────────────────────────────────────────────────────────

interface TinaSystemsPageProps {
  initialData: SystemsPageData;
  sharedFaqs: FaqItem[];
  global: GlobalData;
}

export function TinaSystemsPage({ initialData, sharedFaqs, global: globalData }: TinaSystemsPageProps) {
  const { data: pd } = useTina({
    query: SystemsPageDocument,
    variables: { relativePath: "systems.json" },
    data: { systemsPage: initialData },
  });

  const { data: fq } = useTina({
    query: FaqConnectionDocument,
    variables: {},
    data: toFaqConnection(sharedFaqs),
  });

  const { data: gl } = useTina({
    query: GlobalDocument,
    variables: { relativePath: "global.json" },
    data: { global: globalData },
  });

  return (
    <SystemsPage
      data={pd.systemsPage as SystemsPageData}
      sharedFaqs={fromFaqConnection(fq)}
      global={gl.global as GlobalData}
    />
  );
}

// ─── About Page ────────────────────────────────────────────────────────────

interface TinaAboutPageProps {
  initialData: AboutPageData;
  global: GlobalData;
}

export function TinaAboutPage({ initialData, global: globalData }: TinaAboutPageProps) {
  const { data: pd } = useTina({
    query: AboutPageDocument,
    variables: { relativePath: "about.json" },
    data: { aboutPage: initialData },
  });

  const { data: gl } = useTina({
    query: GlobalDocument,
    variables: { relativePath: "global.json" },
    data: { global: globalData },
  });

  return (
    <AboutPage
      data={pd.aboutPage as AboutPageData}
      global={gl.global as GlobalData}
    />
  );
}

// ─── Work Page ─────────────────────────────────────────────────────────────

interface TinaWorkPageProps {
  workItems: WorkItem[];
  global: GlobalData;
}

export function TinaWorkPage({ workItems, global: globalData }: TinaWorkPageProps) {
  const { data: wk } = useTina({
    query: WorkConnectionDocument,
    variables: {},
    data: toWorkConnection(workItems),
  });

  const { data: gl } = useTina({
    query: GlobalDocument,
    variables: { relativePath: "global.json" },
    data: { global: globalData },
  });

  return (
    <WorkPage
      items={fromWorkConnection(wk)}
      global={gl.global as GlobalData}
    />
  );
}
