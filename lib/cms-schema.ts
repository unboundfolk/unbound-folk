// CMS field schema definitions

export type FieldDef =
  | { type: "string"; name: string; label: string; multiline?: boolean }
  | { type: "image"; name: string; label: string }
  | { type: "number"; name: string; label: string }
  | { type: "list"; name: string; label: string }
  | { type: "object"; name: string; label: string; fields: FieldDef[] }
  | { type: "objectList"; name: string; label: string; fields: FieldDef[] };

export interface Collection {
  id: string;
  label: string;
  icon: string;
  /** Single JSON file path relative to content/ */
  file?: string;
  /** Directory path relative to content/ — each .json is one item */
  dir?: string;
  schema: FieldDef[];
}

export const COLLECTIONS: Collection[] = [
  {
    id: "homepage",
    label: "Homepage",
    icon: "🏠",
    file: "homepage/homepage.json",
    schema: [
      {
        type: "object", name: "hero", label: "Hero Section",
        fields: [
          { type: "string", name: "badge", label: "Badge Text" },
          { type: "string", name: "headline", label: "Headline (line 1)" },
          { type: "string", name: "headlineAccent", label: "Headline Accent (line 2)" },
          { type: "string", name: "subtitle", label: "Subtitle", multiline: true },
          { type: "string", name: "ctaPrimary", label: "Primary CTA Button" },
          { type: "string", name: "ctaSecondary", label: "Secondary CTA Button" },
        ],
      },
      {
        type: "object", name: "problem", label: "Problem Section",
        fields: [
          { type: "string", name: "headline", label: "Headline", multiline: true },
          { type: "string", name: "subtitle", label: "Subtitle", multiline: true },
          {
            type: "objectList", name: "cards", label: "Problem Cards",
            fields: [
              { type: "string", name: "label", label: "Number Label" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "copy", label: "Copy", multiline: true },
            ],
          },
        ],
      },
      { type: "string", name: "pillarsEyebrow", label: "Pillars Eyebrow" },
      { type: "string", name: "pillarsTitle", label: "Pillars Title" },
      { type: "string", name: "pillarsCreativeTitle", label: "Creative: Title" },
      { type: "string", name: "pillarsCreativeDescription", label: "Creative: Description", multiline: true },
      { type: "list", name: "pillarsCreativeServices", label: "Creative: Service Tags" },
      { type: "image", name: "pillarsCreativeImage", label: "Creative: Image" },
      { type: "string", name: "pillarsCreativeHref", label: "Creative: Link URL" },
      { type: "string", name: "pillarsSystemsTitle", label: "Systems: Title" },
      { type: "string", name: "pillarsSystemsDescription", label: "Systems: Description", multiline: true },
      { type: "list", name: "pillarsSystemsServices", label: "Systems: Service Tags" },
      { type: "image", name: "pillarsSystemsImage", label: "Systems: Image" },
      { type: "string", name: "pillarsSystemsHref", label: "Systems: Link URL" },
      {
        type: "object", name: "why", label: "Why Section",
        fields: [
          { type: "string", name: "title", label: "Headline" },
          { type: "string", name: "subtitle", label: "Subtitle", multiline: true },
          { type: "list", name: "points", label: "Bullet Points" },
        ],
      },
      {
        type: "object", name: "process", label: "Process Section",
        fields: [
          { type: "string", name: "title", label: "Section Title" },
          {
            type: "objectList", name: "steps", label: "Steps",
            fields: [
              { type: "string", name: "num", label: "Step Number" },
              { type: "string", name: "title", label: "Step Title" },
              { type: "string", name: "copy", label: "Step Description", multiline: true },
            ],
          },
        ],
      },
      {
        type: "object", name: "cta", label: "CTA Section",
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "copy", label: "Copy", multiline: true },
          { type: "string", name: "button", label: "Button Label" },
        ],
      },
    ],
  },

  {
    id: "creative",
    label: "Creative Page",
    icon: "🎨",
    file: "creative/creative.json",
    schema: [
      {
        type: "object", name: "hero", label: "Hero Section",
        fields: [
          { type: "string", name: "eyebrow", label: "Eyebrow" },
          { type: "string", name: "title", label: "Headline" },
          { type: "string", name: "copy", label: "Subtitle", multiline: true },
          { type: "image", name: "image", label: "Hero Image" },
          { type: "string", name: "cta", label: "CTA Button" },
        ],
      },
      { type: "string", name: "featuresEyebrow", label: "Features Eyebrow" },
      { type: "string", name: "featuresTitle", label: "Features Title" },
      {
        type: "objectList", name: "features", label: "Service Features",
        fields: [
          { type: "string", name: "title", label: "Feature Title" },
          { type: "string", name: "copy", label: "Description", multiline: true },
        ],
      },
      { type: "string", name: "scopeEyebrow", label: "Scope Eyebrow" },
      { type: "string", name: "scopeTitle", label: "Scope Title" },
      { type: "string", name: "scopeCopy", label: "Scope Copy", multiline: true },
      { type: "string", name: "ctaTitle", label: "CTA Title" },
      { type: "string", name: "ctaCta", label: "CTA Button Label" },
      {
        type: "objectList", name: "extraFaqs", label: "Page-Specific FAQs",
        fields: [
          { type: "string", name: "question", label: "Question" },
          { type: "string", name: "answer", label: "Answer", multiline: true },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },
    ],
  },

  {
    id: "systems",
    label: "Systems Page",
    icon: "⚙️",
    file: "systems/systems.json",
    schema: [
      {
        type: "object", name: "hero", label: "Hero Section",
        fields: [
          { type: "string", name: "eyebrow", label: "Eyebrow" },
          { type: "string", name: "title", label: "Headline" },
          { type: "string", name: "copy", label: "Subtitle", multiline: true },
          { type: "image", name: "image", label: "Hero Image" },
          { type: "string", name: "cta", label: "CTA Button" },
        ],
      },
      { type: "string", name: "featuresEyebrow", label: "Features Eyebrow" },
      { type: "string", name: "featuresTitle", label: "Features Title" },
      {
        type: "objectList", name: "features", label: "Service Features",
        fields: [
          { type: "string", name: "title", label: "Feature Title" },
          { type: "string", name: "copy", label: "Description", multiline: true },
        ],
      },
      { type: "string", name: "useCasesEyebrow", label: "Use Cases Eyebrow" },
      { type: "string", name: "useCasesTitle", label: "Use Cases Title" },
      { type: "list", name: "useCases", label: "Use Cases" },
      { type: "string", name: "ctaTitle", label: "CTA Title" },
      { type: "string", name: "ctaCta", label: "CTA Button Label" },
      {
        type: "objectList", name: "extraFaqs", label: "Page-Specific FAQs",
        fields: [
          { type: "string", name: "question", label: "Question" },
          { type: "string", name: "answer", label: "Answer", multiline: true },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },
    ],
  },

  {
    id: "about",
    label: "About Page",
    icon: "👥",
    file: "about/about.json",
    schema: [
      {
        type: "object", name: "hero", label: "Hero Section",
        fields: [
          { type: "string", name: "eyebrow", label: "Eyebrow" },
          { type: "string", name: "title", label: "Headline" },
          { type: "string", name: "copy", label: "Subtitle", multiline: true },
          { type: "image", name: "image", label: "Hero Image" },
          { type: "string", name: "cta", label: "CTA Button" },
        ],
      },
      { type: "string", name: "beliefEyebrow", label: "Section Eyebrow" },
      { type: "string", name: "beliefTitle", label: "Section Title" },
      {
        type: "objectList", name: "beliefs", label: "Belief Cards",
        fields: [
          { type: "string", name: "title", label: "Card Title" },
          { type: "string", name: "copy", label: "Card Copy", multiline: true },
        ],
      },
    ],
  },

  {
    id: "global",
    label: "Global Settings",
    icon: "🌐",
    file: "global/global.json",
    schema: [
      {
        type: "object", name: "footer", label: "Footer",
        fields: [
          { type: "string", name: "tagline", label: "Tagline" },
          { type: "string", name: "email", label: "Email Address" },
          { type: "string", name: "phone", label: "Phone Number" },
          { type: "string", name: "location", label: "Location" },
        ],
      },
    ],
  },

  {
    id: "work",
    label: "Work Items",
    icon: "💼",
    dir: "work",
    schema: [
      { type: "string", name: "title", label: "Project Title" },
      { type: "string", name: "category", label: "Category" },
      { type: "list", name: "tags", label: "Tags" },
      { type: "image", name: "image", label: "Cover Image" },
      { type: "string", name: "problem", label: "The Situation", multiline: true },
      { type: "string", name: "solution", label: "What We Built", multiline: true },
      { type: "string", name: "outcome", label: "The Result", multiline: true },
      { type: "number", name: "order", label: "Display Order" },
    ],
  },

  {
    id: "faqs",
    label: "Shared FAQs",
    icon: "❓",
    dir: "faqs",
    schema: [
      { type: "string", name: "question", label: "Question" },
      { type: "string", name: "answer", label: "Answer", multiline: true },
      { type: "number", name: "order", label: "Display Order" },
    ],
  },
];
