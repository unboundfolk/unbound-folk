import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content");

async function isAuthed() {
  const store = await cookies();
  return store.get("cms_auth")?.value === "1";
}

function safePath(rel: string) {
  const abs = path.resolve(CONTENT_ROOT, rel);
  if (!abs.startsWith(CONTENT_ROOT + path.sep) && abs !== CONTENT_ROOT) {
    throw new Error("Path traversal blocked");
  }
  return abs;
}

// ── GET /api/cms/content?collection=homepage ─────────────────────────────────
export async function GET(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const collection = searchParams.get("collection");
  const file = searchParams.get("file"); // specific file within a dir collection

  if (!collection) {
    return NextResponse.json({ error: "Missing collection" }, { status: 400 });
  }

  try {
    if (file) {
      // Single file read within a directory collection
      const abs = safePath(path.join(collection, file));
      const data = JSON.parse(fs.readFileSync(abs, "utf-8"));
      return NextResponse.json({ data });
    }

    // Check if it's a directory collection or single file
    const dirAbs = safePath(collection);
    const stat = fs.statSync(dirAbs);

    if (stat.isDirectory()) {
      // Return all JSON files in the directory
      const files = fs.readdirSync(dirAbs).filter((f) => f.endsWith(".json"));
      const items = files.map((f) => ({
        filename: f,
        data: JSON.parse(fs.readFileSync(path.join(dirAbs, f), "utf-8")),
      }));
      return NextResponse.json({ items });
    } else {
      // Single file (the collection IS the file path)
      const data = JSON.parse(fs.readFileSync(dirAbs, "utf-8"));
      return NextResponse.json({ data });
    }
  } catch (err) {
    console.error("[cms/content GET]", err);
    return NextResponse.json({ error: "Read failed" }, { status: 500 });
  }
}

// ── POST /api/cms/content ────────────────────────────────────────────────────
// Body: { collection, file?, data }
// collection = "homepage/homepage.json" for single files
// collection = "work", file = "ai-content.json" for dir items
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { collection, file, data } = body as {
      collection: string;
      file?: string;
      data: unknown;
    };

    const relPath = file ? path.join(collection, file) : collection;
    const abs = safePath(relPath);
    const json = JSON.stringify(data, null, 2);

    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, json, "utf-8");

    // Optionally commit to GitHub so Vercel redeploys
    await commitToGitHub(relPath, json).catch((e) =>
      console.warn("[cms/content] GitHub commit skipped:", e.message)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[cms/content POST]", err);
    return NextResponse.json({ error: "Write failed" }, { status: 500 });
  }
}

// ── DELETE /api/cms/content ──────────────────────────────────────────────────
// Body: { collection, file } — removes a single item file
export async function DELETE(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { collection, file } = await req.json();
    if (!file) return NextResponse.json({ error: "file required" }, { status: 400 });

    const abs = safePath(path.join(collection, file));
    if (fs.existsSync(abs)) fs.unlinkSync(abs);

    // Delete from GitHub too
    await deleteFromGitHub(path.join(collection, file)).catch((e) =>
      console.warn("[cms/content] GitHub delete skipped:", e.message)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[cms/content DELETE]", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

// ── GitHub helpers (optional — requires GITHUB_TOKEN env var) ────────────────

async function getGitHubSha(apiPath: string, token: string, owner: string, repo: string) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${apiPath}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) return null;
  const json = await res.json() as { sha?: string };
  return json.sha ?? null;
}

async function commitToGitHub(relPath: string, content: string) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || "unboundfolk";
  const repo = process.env.GITHUB_REPO || "unbound-folk";
  if (!token) return;

  const apiPath = `content/${relPath}`;
  const sha = await getGitHubSha(apiPath, token, owner, repo);

  const body: Record<string, unknown> = {
    message: `cms: update ${relPath}`,
    content: Buffer.from(content).toString("base64"),
    branch: "main",
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${apiPath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub PUT failed (${res.status}): ${text}`);
  }
}

async function deleteFromGitHub(relPath: string) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || "unboundfolk";
  const repo = process.env.GITHUB_REPO || "unbound-folk";
  if (!token) return;

  const apiPath = `content/${relPath}`;
  const sha = await getGitHubSha(apiPath, token, owner, repo);
  if (!sha) return;

  await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${apiPath}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: `cms: delete ${relPath}`, sha, branch: "main" }),
  });
}
