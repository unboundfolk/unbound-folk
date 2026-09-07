import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

async function isAuthed() {
  const store = await cookies();
  return store.get("cms_auth")?.value === "1";
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "Only JPG/PNG/WebP/GIF allowed" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    // Write locally (dev) + commit to GitHub (production)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(uploadDir, { recursive: true });
    fs.writeFileSync(path.join(uploadDir, filename), buffer);

    // Commit image to GitHub so it persists on Vercel
    await commitImageToGitHub(`public/uploads/${filename}`, buffer).catch((e) =>
      console.warn("[cms/upload] GitHub commit skipped:", e.message)
    );

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error("[cms/upload POST]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

async function commitImageToGitHub(repoPath: string, buffer: Buffer) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || "unboundfolk";
  const repo = process.env.GITHUB_REPO || "unbound-folk";
  if (!token) return;

  // Check if file already exists (to get SHA for update)
  const checkRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${repoPath}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" } }
  );
  const existing = checkRes.ok ? (await checkRes.json() as { sha?: string }) : null;

  const body: Record<string, unknown> = {
    message: `cms: upload ${repoPath}`,
    content: buffer.toString("base64"),
    branch: "main",
  };
  if (existing?.sha) body.sha = existing.sha;

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${repoPath}`,
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
