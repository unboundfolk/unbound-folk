import type { Metadata } from "next";
import { TinaHomePage } from "@/components/tina-pages";
import type { HomepageData, WorkItem, FaqItem, GlobalData } from "@/components/marketing-site";
import { readJson, readJsonDir } from "@/lib/content";

export const metadata: Metadata = {
  title: "Unbound Folk — Creative Studio & Systems Partner",
  description:
    "Unbound Folk is a creative-tech studio in Malaysia. We help growing businesses look sharper and run smarter through brand design, AI-assisted content, custom software, and workflow automation.",
  alternates: { canonical: "/" },
};

export default function Page() {
  const homepage = readJson<HomepageData>("content/homepage/homepage.json");
  const global = readJson<GlobalData>("content/global/global.json");
  const workItems = readJsonDir<WorkItem>("content/work").sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  const faqs = readJsonDir<FaqItem>("content/faqs").sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  return <TinaHomePage initialData={homepage} workItems={workItems} faqs={faqs} global={global} />;
}
