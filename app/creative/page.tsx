import type { Metadata } from "next";
import { TinaCreativePage } from "@/components/tina-pages";
import type { CreativePageData, FaqItem, GlobalData } from "@/components/marketing-site";
import { readJson, readJsonDir } from "@/lib/content";

export const metadata: Metadata = {
  title: "Creative — Unbound Folk",
  description:
    "Brand visuals, motion graphics, 3D product content, and AI-assisted creative for businesses that want to show up looking like they mean it. Based in Malaysia.",
  alternates: { canonical: "/creative" },
};

export default function Page() {
  const data = readJson<CreativePageData>("content/creative/creative.json");
  const global = readJson<GlobalData>("content/global/global.json");
  const sharedFaqs = readJsonDir<FaqItem>("content/faqs").sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  return <TinaCreativePage initialData={data} sharedFaqs={sharedFaqs} global={global} />;
}
