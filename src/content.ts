export type Service = {
  id: string;
  title: string;
  body: string;
  stack: string[];
};

export type Case = {
  title: string;
  field: string;
  task: string;
  approach: string;
  result: string;
  stack: string[];
};

export const site = {
  name: "knock-knock",
  headline: "Software, ML, and the infrastructure under both.",
  description:
    "We take a problem end to end — architecture, code, data, deployment — and ship something you can use.",
};

export const services: Service[] = [
  {
    id: "software",
    title: "Software",
    body: "Web services, APIs, and internal tooling. Designed, built, and operated to outlive the launch day.",
    stack: ["backend", "frontend", "api", "integrations"],
  },
  {
    id: "ml",
    title: "ML",
    body: "Data, models, and their path into the product. Quality measured before launch, monitored after.",
    stack: ["data", "cv", "nlp", "mlops", "inference"],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    body: "Cloud, CI/CD, observability. The unglamorous layer that keeps everything above it alive.",
    stack: ["cloud", "kubernetes", "ci/cd", "observability"],
  },
];

/**
 * Add an object here — the cases section picks it up automatically.
 */
export const cases: Case[] = [];

export const contacts = {
  telegram: "",
  github: "knock-knock-team",
  email: "Knock-Knock-Corp@yandex.ru",
  note: "Tell us about the problem — we'll come back with how we'd solve it, how long it takes, and what it costs.",
};
