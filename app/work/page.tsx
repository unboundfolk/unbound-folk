import type { Metadata } from "next";
import { TinaWorkPage } from "@/components/tina-pages";
import type { WorkItem, GlobalData } from "@/components/marketing-site";
import { readJson, readJsonDir } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Unbound Folk",
  description:
    "Projects we're proud of — creative, systems, and AI work built around real problems that real businesses needed solved.",
  alternates: { canonical: "/work" },
};

export default function Page() {
  const workItems = readJsonDir<WorkItem>("content/work").sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  const global = readJson<GlobalData>("content/global/global.json");
  return <TinaWorkPage workItems={workItems} global={global} />;
}
