import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { HomePage } from "@/components/marketing-site";
import type { HomepageData, WorkItem, FaqItem } from "@/components/marketing-site";

export const metadata: Metadata = {
  title: "Unbound Folk — Creative Studio & Systems Partner",
  description:
    "Unbound Folk is a creative-tech studio in Malaysia. We help growing businesses look sharper and run smarter through brand design, AI-assisted content, custom software, and workflow automation.",
  alternates: { canonical: "/" },
};

function readJson<T>(filePath: string): T {
  const abs = path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(abs, "utf-8")) as T;
}

function readJsonDir<T>(dir: string): T[] {
  const abs = path.join(process.cwd(), dir);
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJson<T>(`${dir}/${f}`));
}

export default function Page() {
  const homepage = readJson<HomepageData>("content/pages/homepage.json");

  const workItems = readJsonDir<WorkItem>("content/work").sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  const faqs = readJsonDir<FaqItem>("content/faqs").sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return <HomePage homepage={homepage} workItems={workItems} faqs={faqs} />;
}
