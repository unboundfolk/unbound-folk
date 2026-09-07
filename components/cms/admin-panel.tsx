"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { FieldDef, Collection } from "@/lib/cms-schema";
import { COLLECTIONS } from "@/lib/cms-schema";

// ── Types ────────────────────────────────────────────────────────────────────

type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject;
type JsonObject = { [key: string]: JsonValue };

// ── Helpers ──────────────────────────────────────────────────────────────────

function get(obj: JsonObject, key: string): JsonValue {
  return obj[key] ?? "";
}

function set(obj: JsonObject, key: string, val: JsonValue): JsonObject {
  return { ...obj, [key]: val };
}

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ── Field renderers ───────────────────────────────────────────────────────────

function StringField({
  field,
  value,
  onChange,
}: {
  field: FieldDef & { type: "string" };
  value: JsonValue;
  onChange: (v: string) => void;
}) {
  const str = typeof value === "string" ? value : "";
  if (field.multiline) {
    return (
      <textarea
        value={str}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 resize-y"
      />
    );
  }
  return (
    <input
      type="text"
      value={str}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30"
    />
  );
}

function NumberField({
  value,
  onChange,
}: {
  value: JsonValue;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="number"
      value={typeof value === "number" ? value : ""}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-32 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30"
    />
  );
}

function ImageField({
  field,
  value,
  onChange,
}: {
  field: FieldDef & { type: "image" };
  value: JsonValue;
  onChange: (v: string) => void;
}) {
  const src = typeof value === "string" ? value : "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/cms/upload", { method: "POST", body: fd });
      const json = await res.json() as { url?: string; error?: string };
      if (json.url) onChange(json.url);
      else alert("Upload failed: " + (json.error ?? "unknown"));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-start gap-4">
      {src && (
        <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={field.label} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={src}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/filename.jpg"
          className="w-64 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "📁 Upload Image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>
    </div>
  );
}

function ListField({
  field,
  value,
  onChange,
}: {
  field: FieldDef & { type: "list" };
  value: JsonValue;
  onChange: (v: string[]) => void;
}) {
  const items = Array.isArray(value) ? (value as string[]) : [];
  const [draft, setDraft] = useState("");

  function add() {
    if (!draft.trim()) return;
    onChange([...items, draft.trim()]);
    setDraft("");
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1 text-xs text-zinc-200">
            {item}
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-zinc-400 hover:text-red-400"
            >×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Add item…"
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700"
        >Add</button>
      </div>
    </div>
  );
}

function ObjectField({
  field,
  value,
  onChange,
}: {
  field: FieldDef & { type: "object" };
  value: JsonValue;
  onChange: (v: JsonObject) => void;
}) {
  const obj = (typeof value === "object" && value !== null && !Array.isArray(value) ? value : {}) as JsonObject;
  return (
    <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      {field.fields.map((f) => (
        <FieldRow
          key={f.name}
          field={f}
          value={get(obj, f.name)}
          onChange={(v) => onChange(set(obj, f.name, v))}
        />
      ))}
    </div>
  );
}

function ObjectListField({
  field,
  value,
  onChange,
}: {
  field: FieldDef & { type: "objectList" };
  value: JsonValue;
  onChange: (v: JsonObject[]) => void;
}) {
  const items = Array.isArray(value) ? (value as JsonObject[]) : [];

  function addItem() {
    const blank: JsonObject = {};
    field.fields.forEach((f) => { blank[f.name] = f.type === "number" ? 0 : ""; });
    onChange([...items, blank]);
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-zinc-700 bg-zinc-900/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">Item {i + 1}</span>
            <div className="flex gap-1">
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const next = [...items];
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    onChange(next);
                  }}
                  className="rounded px-2 py-0.5 text-xs text-zinc-400 hover:bg-zinc-800"
                >↑</button>
              )}
              {i < items.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const next = [...items];
                    [next[i], next[i + 1]] = [next[i + 1], next[i]];
                    onChange(next);
                  }}
                  className="rounded px-2 py-0.5 text-xs text-zinc-400 hover:bg-zinc-800"
                >↓</button>
              )}
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="rounded px-2 py-0.5 text-xs text-red-400 hover:bg-zinc-800"
              >Remove</button>
            </div>
          </div>
          <div className="space-y-3">
            {field.fields.map((f) => (
              <FieldRow
                key={f.name}
                field={f}
                value={get(item, f.name)}
                onChange={(v) => {
                  const next = [...items];
                  next[i] = set(item, f.name, v);
                  onChange(next);
                }}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-zinc-600 px-4 py-2 text-sm text-zinc-400 hover:border-lime-500 hover:text-lime-400"
      >+ Add Item</button>
    </div>
  );
}

function FieldRow({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: JsonValue;
  onChange: (v: JsonValue) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-zinc-400">{field.label}</label>
      {field.type === "string" && (
        <StringField field={field} value={value} onChange={onChange as (v: string) => void} />
      )}
      {field.type === "number" && (
        <NumberField value={value} onChange={onChange as (v: number) => void} />
      )}
      {field.type === "image" && (
        <ImageField field={field} value={value} onChange={onChange as (v: string) => void} />
      )}
      {field.type === "list" && (
        <ListField field={field} value={value} onChange={onChange as (v: string[]) => void} />
      )}
      {field.type === "object" && (
        <ObjectField field={field} value={value} onChange={onChange as (v: JsonObject) => void} />
      )}
      {field.type === "objectList" && (
        <ObjectListField field={field} value={value} onChange={onChange as (v: JsonObject[]) => void} />
      )}
    </div>
  );
}

// ── Directory-based collection (Work / FAQs) ──────────────────────────────────

function DirCollectionEditor({
  collection,
  toast,
}: {
  collection: Collection;
  toast: (msg: string, ok?: boolean) => void;
}) {
  type DirItem = { filename: string; data: JsonObject };
  const [items, setItems] = useState<DirItem[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cms/content?collection=${collection.dir}`)
      .then((r) => r.json())
      .then((json: { items?: DirItem[] }) => {
        const sorted = (json.items ?? []).sort((a, b) =>
          ((a.data.order as number) ?? 0) - ((b.data.order as number) ?? 0)
        );
        setItems(sorted);
        if (sorted.length > 0) setActive(0);
      })
      .finally(() => setLoading(false));
  }, [collection.dir]);

  async function saveItem(index: number) {
    const item = items[index];
    setSaving(true);
    try {
      const res = await fetch("/api/cms/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: collection.dir,
          file: item.filename,
          data: item.data,
        }),
      });
      if (res.ok) toast("Saved! Vercel will redeploy in ~1 min.", true);
      else toast("Save failed — check console.", false);
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(index: number) {
    if (!confirm(`Delete "${items[index].filename}"?`)) return;
    const item = items[index];
    await fetch("/api/cms/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection: collection.dir, file: item.filename }),
    });
    const next = items.filter((_, i) => i !== index);
    setItems(next);
    setActive(next.length > 0 ? 0 : null);
    toast("Deleted.");
  }

  function addItem() {
    const blank: JsonObject = {};
    collection.schema.forEach((f) => { blank[f.name] = f.type === "number" ? 0 : ""; });
    const filename = `${slugify((blank.title as string) || "new-item")}-${Date.now()}.json`;
    setItems([...items, { filename, data: blank }]);
    setActive(items.length);
  }

  if (loading) return <div className="p-8 text-zinc-500">Loading…</div>;

  return (
    <div className="flex h-full">
      {/* Item list */}
      <div className="w-56 shrink-0 border-r border-zinc-800 bg-zinc-950 p-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{collection.label}</span>
          <button onClick={addItem} className="rounded bg-lime-400 px-2 py-0.5 text-xs font-bold text-zinc-950 hover:bg-lime-300">+ New</button>
        </div>
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={item.filename}>
              <button
                onClick={() => setActive(i)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${active === i ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}
              >
                {(item.data.title as string) || (item.data.question as string) || item.filename}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Editor */}
      {active !== null && items[active] ? (
        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-4">
            <h2 className="font-semibold text-white">
              {(items[active].data.title as string) || (items[active].data.question as string) || "Edit Item"}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => deleteItem(active)}
                className="rounded-lg border border-red-800 px-3 py-1.5 text-sm text-red-400 hover:bg-red-950"
              >Delete</button>
              <button
                onClick={() => saveItem(active)}
                disabled={saving}
                className="rounded-lg bg-lime-400 px-5 py-1.5 text-sm font-bold text-zinc-950 hover:bg-lime-300 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
          <div className="space-y-6 p-6">
            {collection.schema.map((field) => (
              <FieldRow
                key={field.name}
                field={field}
                value={get(items[active].data, field.name)}
                onChange={(v) => {
                  const next = [...items];
                  next[active] = { ...next[active], data: set(next[active].data, field.name, v) };
                  setItems(next);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-zinc-600">
          {items.length === 0 ? "No items yet — click + New" : "Select an item to edit"}
        </div>
      )}
    </div>
  );
}

// ── Single-file collection editor ─────────────────────────────────────────────

function SingleCollectionEditor({
  collection,
  toast,
}: {
  collection: Collection;
  toast: (msg: string, ok?: boolean) => void;
}) {
  const [data, setData] = useState<JsonObject>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cms/content?collection=${collection.file}`)
      .then((r) => r.json())
      .then((json: { data?: JsonObject }) => setData(json.data ?? {}))
      .finally(() => setLoading(false));
  }, [collection.file]);

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/cms/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: collection.file, data }),
      });
      if (res.ok) toast("Saved! Vercel will redeploy in ~1 min.", true);
      else toast("Save failed — check console.", false);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8 text-zinc-500">Loading…</div>;

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-4">
        <h2 className="font-semibold text-white">{collection.label}</h2>
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-lime-400 px-6 py-1.5 text-sm font-bold text-zinc-950 hover:bg-lime-300 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
      <div className="space-y-6 p-6">
        {collection.schema.map((field) => (
          <FieldRow
            key={field.name}
            field={field}
            value={get(data, field.name)}
            onChange={(v) => setData((prev) => set(prev, field.name, v))}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Admin Panel ──────────────────────────────────────────────────────────

export function AdminPanel() {
  const [activeId, setActiveId] = useState(COLLECTIONS[0].id);
  const [toastMsg, setToastMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((msg: string, ok = true) => {
    setToastMsg({ text: msg, ok });
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToastMsg(null), 4000);
  }, []);

  const collection = COLLECTIONS.find((c) => c.id === activeId) ?? COLLECTIONS[0];

  async function logout() {
    await fetch("/api/cms/auth", { method: "DELETE" });
    window.location.href = "/cms/login";
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="flex w-52 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
        <div className="border-b border-zinc-800 px-5 py-5">
          <div className="text-base font-bold text-white">UF CMS</div>
          <div className="mt-0.5 text-xs text-zinc-500">Content Manager</div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {COLLECTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveId(col.id)}
              className={`mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                activeId === col.id
                  ? "bg-lime-400/15 text-lime-300 font-medium"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <span>{col.icon}</span>
              <span>{col.label}</span>
            </button>
          ))}
        </nav>
        <div className="border-t border-zinc-800 p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300"
          >
            ↗ View Site
          </a>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:text-red-400"
          >
            ⎋ Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {collection.dir ? (
            <DirCollectionEditor key={activeId} collection={collection} toast={toast} />
          ) : (
            <SingleCollectionEditor key={activeId} collection={collection} toast={toast} />
          )}
        </div>
      </main>

      {/* Toast */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border px-5 py-3 text-sm font-medium shadow-2xl backdrop-blur ${
            toastMsg.ok
              ? "border-lime-700 bg-zinc-900 text-lime-300"
              : "border-red-800 bg-zinc-900 text-red-400"
          }`}
        >
          {toastMsg.ok ? "✓" : "✗"} {toastMsg.text}
        </div>
      )}
    </div>
  );
}
