import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

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
        path: "content/homepage",
        format: "json",
        ui: { router: () => "/" },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "badge", label: "Badge Text" },
              { type: "string", name: "headline", label: "Headline (line 1)" },
              { type: "string", name: "headlineAccent", label: "Headline Accent (line 2)" },
              { type: "string", name: "subtitle", label: "Subtitle" },
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
              { type: "string", name: "subtitle", label: "Subtitle" },
              {
                type: "object",
                name: "cards",
                label: "Cards",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Number Label" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "copy", label: "Copy" },
                ],
              },
            ],
          },
          { type: "string", name: "pillarsEyebrow", label: "Pillars Eyebrow" },
          { type: "string", name: "pillarsTitle", label: "Pillars Title" },
          { type: "string", name: "pillarsCreativeTitle", label: "Creative Pillar: Title" },
          { type: "string", name: "pillarsCreativeDescription", label: "Creative Pillar: Description" },
          { type: "string", name: "pillarsCreativeServices", label: "Creative Pillar: Service Tags", list: true },
          { type: "image", name: "pillarsCreativeImage", label: "Creative Pillar: Image" },
          { type: "string", name: "pillarsCreativeHref", label: "Creative Pillar: Link" },
          { type: "string", name: "pillarsSystemsTitle", label: "Systems Pillar: Title" },
          { type: "string", name: "pillarsSystemsDescription", label: "Systems Pillar: Description" },
          { type: "string", name: "pillarsSystemsServices", label: "Systems Pillar: Service Tags", list: true },
          { type: "image", name: "pillarsSystemsImage", label: "Systems Pillar: Image" },
          { type: "string", name: "pillarsSystemsHref", label: "Systems Pillar: Link" },
          {
            type: "object",
            name: "why",
            label: "Why Section",
            fields: [
              { type: "string", name: "title", label: "Headline" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "points", label: "Bullet Points", list: true },
            ],
          },
          {
            type: "object",
            name: "process",
            label: "Process Section",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              {
                type: "object",
                name: "steps",
                label: "Steps",
                list: true,
                fields: [
                  { type: "string", name: "num", label: "Step Number" },
                  { type: "string", name: "title", label: "Step Title" },
                  { type: "string", name: "copy", label: "Step Description" },
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
              { type: "string", name: "copy", label: "Copy" },
              { type: "string", name: "button", label: "Button Label" },
            ],
          },
        ],
      },

      // ─── Creative Page ───────────────────────────────────────
      {
        name: "creativePage",
        label: "Creative Page",
        path: "content/creative",
        format: "json",
        ui: { router: () => "/creative" },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Label" },
              { type: "string", name: "title", label: "Headline" },
              { type: "string", name: "copy", label: "Subtitle" },
              { type: "image", name: "image", label: "Hero Image" },
              { type: "string", name: "cta", label: "CTA Button Label" },
            ],
          },
          { type: "string", name: "featuresEyebrow", label: "Features Eyebrow" },
          { type: "string", name: "featuresTitle", label: "Features Title" },
          {
            type: "object",
            name: "features",
            label: "Service Features",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Feature Title" },
              { type: "string", name: "copy", label: "Feature Description" },
            ],
          },
          { type: "string", name: "scopeEyebrow", label: "Scope Section Eyebrow" },
          { type: "string", name: "scopeTitle", label: "Scope Section Title" },
          { type: "string", name: "scopeCopy", label: "Scope Section Copy" },
          { type: "string", name: "ctaTitle", label: "CTA Title" },
          { type: "string", name: "ctaCta", label: "CTA Button Label" },
          {
            type: "object",
            name: "extraFaqs",
            label: "Page-Specific FAQs",
            list: true,
            fields: [
              { type: "string", name: "question", label: "Question" },
              { type: "string", name: "answer", label: "Answer" },
              { type: "number", name: "order", label: "Display Order" },
            ],
          },
        ],
      },

      // ─── Systems Page ────────────────────────────────────────
      {
        name: "systemsPage",
        label: "Systems Page",
        path: "content/systems",
        format: "json",
        ui: { router: () => "/systems" },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Label" },
              { type: "string", name: "title", label: "Headline" },
              { type: "string", name: "copy", label: "Subtitle" },
              { type: "image", name: "image", label: "Hero Image" },
              { type: "string", name: "cta", label: "CTA Button Label" },
            ],
          },
          { type: "string", name: "featuresEyebrow", label: "Features Eyebrow" },
          { type: "string", name: "featuresTitle", label: "Features Title" },
          {
            type: "object",
            name: "features",
            label: "Service Features",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Feature Title" },
              { type: "string", name: "copy", label: "Feature Description" },
            ],
          },
          { type: "string", name: "useCasesEyebrow", label: "Use Cases Eyebrow" },
          { type: "string", name: "useCasesTitle", label: "Use Cases Title" },
          { type: "string", name: "useCases", label: "Use Cases", list: true },
          { type: "string", name: "ctaTitle", label: "CTA Title" },
          { type: "string", name: "ctaCta", label: "CTA Button Label" },
          {
            type: "object",
            name: "extraFaqs",
            label: "Page-Specific FAQs",
            list: true,
            fields: [
              { type: "string", name: "question", label: "Question" },
              { type: "string", name: "answer", label: "Answer" },
              { type: "number", name: "order", label: "Display Order" },
            ],
          },
        ],
      },

      // ─── About Page ──────────────────────────────────────────
      {
        name: "aboutPage",
        label: "About Page",
        path: "content/about",
        format: "json",
        ui: { router: () => "/about" },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Label" },
              { type: "string", name: "title", label: "Headline" },
              { type: "string", name: "copy", label: "Subtitle" },
              { type: "image", name: "image", label: "Hero Image" },
              { type: "string", name: "cta", label: "CTA Button Label" },
            ],
          },
          { type: "string", name: "beliefEyebrow", label: "Section Eyebrow" },
          { type: "string", name: "beliefTitle", label: "Section Title" },
          {
            type: "object",
            name: "beliefs",
            label: "Belief Cards",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Card Title" },
              { type: "string", name: "copy", label: "Card Copy" },
            ],
          },
        ],
      },

      // ─── Global / Footer ─────────────────────────────────────
      {
        name: "global",
        label: "Global Settings",
        path: "content/global",
        format: "json",
        ui: { router: () => "/" },
        fields: [
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "tagline", label: "Tagline" },
              { type: "string", name: "email", label: "Email Address" },
              { type: "string", name: "phone", label: "Phone Number" },
              { type: "string", name: "location", label: "Location" },
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
        ui: { router: () => "/work" },
        fields: [
          { type: "string", name: "title", label: "Project Title" },
          { type: "string", name: "category", label: "Category" },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "image", name: "image", label: "Cover Image" },
          { type: "string", name: "problem", label: "The Situation" },
          { type: "string", name: "solution", label: "What We Built" },
          { type: "string", name: "outcome", label: "The Result" },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },

      // ─── FAQs ────────────────────────────────────────────────
      {
        name: "faq",
        label: "Shared FAQs",
        path: "content/faqs",
        format: "json",
        ui: { router: () => "/" },
        fields: [
          { type: "string", name: "question", label: "Question" },
          { type: "string", name: "answer", label: "Answer" },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },
    ],
  },
});
