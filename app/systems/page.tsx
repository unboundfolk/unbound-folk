import type { Metadata } from "next";
import { SystemsPage } from "@/components/marketing-site";
import type { SystemsPageData, FaqItem, GlobalData } from "@/components/marketing-site";
import { readJson, readJsonDir } from "@/lib/content";

export const metadata: Metadata = {
  title: "Systems — Unbound Folk",
  description:
    "Custom software, automation, CRM systems, and AI workflows for businesses that have outgrown spreadsheets and manual processes. Built for Malaysian SMEs.",
  alternates: { canonical: "/systems" },
};

export default function Page() {
  const data = readJson<SystemsPageData>("content/pages/systems.json");
  const global = readJson<GlobalData>("content/pages/global.json");
  const sharedFaqs = readJsonDir<FaqItem>("content/faqs").sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  return <SystemsPage data={data} sharedFaqs={sharedFaqs} global={global} />;
}
