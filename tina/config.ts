import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ─── Homepage ───────────────────────────────────────────
      {
        name: "homepage",
        label: "Homepage",
        path: "content/pages",
        match: { include: "homepage" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "badge", label: "Badge Text" },
              { type: "string", name: "headline", label: "Headline (line 1)" },
              { type: "string", name: "headlineAccent", label: "Headline Accent (line 2 — lime green)" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "ctaPrimary", label: "Primary CTA Label" },
              { type: "string", name: "ctaSecondary", label: "Secondary CTA Label" },
            ],
          },
          {
            type: "object",
            name: "problem",
            label: "Problem Section",
            fields: [
              { type: "string", name: "headline", label: "Headline" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              {
                type: "object",
                name: "cards",
                label: "Cards",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Number Label (e.g. 01)" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "copy", label: "Copy", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "CTA Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "copy", label: "Copy", ui: { component: "textarea" } },
              { type: "string", name: "button", label: "Button Label" },
            ],
          },
        ],
      },

      // ─── Work Items ──────────────────────────────────────────
      {
        name: "work",
        label: "Work Items",
        path: "content/work",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Project Title" },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["Creative", "Automation", "Motion", "Systems", "AI", "Branding"],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            options: ["Creative", "Systems", "Automation", "Motion", "AI", "Branding"],
          },
          { type: "image", name: "image", label: "Cover Image" },
          { type: "string", name: "problem", label: "The Situation", ui: { component: "textarea" } },
          { type: "string", name: "solution", label: "What We Built", ui: { component: "textarea" } },
          { type: "string", name: "outcome", label: "The Result", ui: { component: "textarea" } },
          { type: "number", name: "order", label: "Display Order" },
        ],
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "untitled",
          },
        },
      },

      // ─── FAQs ────────────────────────────────────────────────
      {
        name: "faq",
        label: "FAQs",
        path: "content/faqs",
        format: "json",
        fields: [
          { type: "string", name: "question", label: "Question" },
          { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } },
          { type: "number", name: "order", label: "Display Order" },
        ],
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.question?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 40) || "faq",
          },
        },
      },
    ],
  },
});
