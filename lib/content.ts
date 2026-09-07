import fs from "fs";
import path from "path";

export function readJson<T>(filePath: string): T {
  const abs = path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(abs, "utf-8")) as T;
}

export function readJsonDir<T>(dir: string): T[] {
  const abs = path.join(process.cwd(), dir);
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJson<T>(`${dir}/${f}`));
}
