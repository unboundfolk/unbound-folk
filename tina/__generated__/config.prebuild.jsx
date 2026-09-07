// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─── Homepage ───────────────────────────────────────────
      {
        name: "homepage",
        label: "Homepage",
        path: "content/pages",
        format: "json",
        match: { include: "homepage" },
        fields: [
          // Hero
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "badge", label: "Badge Text" },
              { type: "string", name: "headline", label: "Headline (line 1)" },
              { type: "string", name: "headlineAccent", label: "Headline Accent (line 2 \u2014 lime green)" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "ctaPrimary", label: "Primary CTA Label" },
              { type: "string", name: "ctaSecondary", label: "Secondary CTA Label" }
            ]
          },
          // Problem
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
                  { type: "string", name: "copy", label: "Copy", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          // Pillars
          {
            type: "object",
            name: "pillars",
            label: "Pillars Section (Two Things, Done Properly)",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Label" },
              { type: "string", name: "title", label: "Section Title" },
              {
                type: "object",
                name: "creative",
                label: "Creative Pillar",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "services", label: "Service Tags", list: true },
                  { type: "image", name: "image", label: "Cover Image" },
                  { type: "string", name: "href", label: "Link URL" }
                ]
              },
              {
                type: "object",
                name: "systems",
                label: "Systems Pillar",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "services", label: "Service Tags", list: true },
                  { type: "image", name: "image", label: "Cover Image" },
                  { type: "string", name: "href", label: "Link URL" }
                ]
              }
            ]
          },
          // Why
          {
            type: "object",
            name: "why",
            label: "Why Section (We're Built Differently)",
            fields: [
              { type: "string", name: "title", label: "Headline" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "points", label: "Bullet Points", list: true }
            ]
          },
          // Process
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
                  { type: "string", name: "num", label: "Step Number (e.g. 01)" },
                  { type: "string", name: "title", label: "Step Title" },
                  { type: "string", name: "copy", label: "Step Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          // CTA
          {
            type: "object",
            name: "cta",
            label: "CTA Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "copy", label: "Copy", ui: { component: "textarea" } },
              { type: "string", name: "button", label: "Button Label" }
            ]
          }
        ]
      },
      // ─── Creative Page ───────────────────────────────────────
      {
        name: "creativePage",
        label: "Creative Page",
        path: "content/pages",
        format: "json",
        match: { include: "creative" },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Label" },
              { type: "string", name: "title", label: "Headline" },
              { type: "string", name: "copy", label: "Subtitle", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Hero Image" },
              { type: "string", name: "cta", label: "CTA Button Label" }
            ]
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
              { type: "string", name: "copy", label: "Feature Description", ui: { component: "textarea" } }
            ]
          },
          { type: "string", name: "scopeEyebrow", label: "Scope Section Eyebrow" },
          { type: "string", name: "scopeTitle", label: "Scope Section Title" },
          { type: "string", name: "scopeCopy", label: "Scope Section Copy", ui: { component: "textarea" } },
          { type: "string", name: "ctaTitle", label: "CTA Title" },
          { type: "string", name: "ctaCta", label: "CTA Button Label" },
          {
            type: "object",
            name: "extraFaqs",
            label: "Page-Specific FAQs",
            list: true,
            fields: [
              { type: "string", name: "question", label: "Question" },
              { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } },
              { type: "number", name: "order", label: "Display Order" }
            ]
          }
        ]
      },
      // ─── Systems Page ────────────────────────────────────────
      {
        name: "systemsPage",
        label: "Systems Page",
        path: "content/pages",
        format: "json",
        match: { include: "systems" },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Label" },
              { type: "string", name: "title", label: "Headline" },
              { type: "string", name: "copy", label: "Subtitle", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Hero Image" },
              { type: "string", name: "cta", label: "CTA Button Label" }
            ]
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
              { type: "string", name: "copy", label: "Feature Description", ui: { component: "textarea" } }
            ]
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
              { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } },
              { type: "number", name: "order", label: "Display Order" }
            ]
          }
        ]
      },
      // ─── About Page ──────────────────────────────────────────
      {
        name: "aboutPage",
        label: "About Page",
        path: "content/pages",
        format: "json",
        match: { include: "about" },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Label" },
              { type: "string", name: "title", label: "Headline" },
              { type: "string", name: "copy", label: "Subtitle", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Hero Image" },
              { type: "string", name: "cta", label: "CTA Button Label" }
            ]
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
              { type: "string", name: "copy", label: "Card Copy", ui: { component: "textarea" } }
            ]
          }
        ]
      },
      // ─── Global / Footer ─────────────────────────────────────
      {
        name: "global",
        label: "Global Settings",
        path: "content/pages",
        format: "json",
        match: { include: "global" },
        fields: [
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "tagline", label: "Tagline", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Email Address" },
              { type: "string", name: "phone", label: "Phone Number" },
              { type: "string", name: "location", label: "Location" }
            ]
          }
        ]
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
            options: ["Creative", "Automation", "Motion", "Systems", "AI", "Branding"]
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            options: ["Creative", "Systems", "Automation", "Motion", "AI", "Branding"]
          },
          { type: "image", name: "image", label: "Cover Image" },
          { type: "string", name: "problem", label: "The Situation", ui: { component: "textarea" } },
          { type: "string", name: "solution", label: "What We Built", ui: { component: "textarea" } },
          { type: "string", name: "outcome", label: "The Result", ui: { component: "textarea" } },
          { type: "number", name: "order", label: "Display Order" }
        ]
      },
      // ─── FAQs ────────────────────────────────────────────────
      {
        name: "faq",
        label: "Shared FAQs",
        path: "content/faqs",
        format: "json",
        fields: [
          { type: "string", name: "question", label: "Question" },
          { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } },
          { type: "number", name: "order", label: "Display Order" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
