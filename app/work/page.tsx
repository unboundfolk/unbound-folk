import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { WorkPage } from "@/components/marketing-site";
import type { WorkItem } from "@/components/marketing-site";

export const metadata: Metadata = {
  title: "Work — Unbound Folk",
  description:
    "Projects we're proud of — creative, systems, and AI work built around real problems that real businesses needed solved.",
  alternates: { canonical: "/work" },
};

export default function Page() {
  const dir = path.join(process.cwd(), "content/work");
  const workItems = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as WorkItem)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return <WorkPage items={workItems} />;
}
