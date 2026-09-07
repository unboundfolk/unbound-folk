import type { Metadata } from "next";
import { AboutPage } from "@/components/marketing-site";
import type { AboutPageData, GlobalData } from "@/components/marketing-site";
import { readJson } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Unbound Folk",
  description:
    "Unbound Folk is a creative-tech studio in Malaysia. We built the studio because growing businesses need both strong brand presence and efficient operations — and most vendors only cover one side.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  const data = readJson<AboutPageData>("content/about/about.json");
  const global = readJson<GlobalData>("content/global/global.json");
  return <AboutPage data={data} global={global} />;
}
