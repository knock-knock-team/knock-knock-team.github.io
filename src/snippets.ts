export type Tok = { t: string; c?: "kw" | "str" | "fn" | "num" };

export type Snippet = {
  file: string;
  lines: Tok[][];
  out: string[];
};

const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = <T,>(list: T[]): T[] => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

/** A fresh, internally consistent set of snippets on every page load. */
export function makeSnippets(): Snippet[] {
  const port = pick([3000, 4000, 8080, 9000] as const);
  const route = pick(["/health", "/ready", "/metrics"] as const);

  const epochs = rand(8, 16);
  const threshold = pick(["0.85", "0.88", "0.9"] as const);
  const f1 = (parseFloat(threshold) + 0.01 + Math.random() * 0.06).toFixed(2);
  const modelV = rand(3, 24);

  const replicas = rand(2, 5);
  const rollout = pick(["canary", "rolling"] as const);

  return shuffle([
    {
      file: "server.ts",
      lines: [
        [
          { t: "import", c: "kw" },
          { t: " { createServer } " },
          { t: "from", c: "kw" },
          { t: ' "./api"', c: "str" },
          { t: ";" },
        ],
        [],
        [
          { t: "const", c: "kw" },
          { t: " app = " },
          { t: "createServer", c: "fn" },
          { t: "();" },
        ],
        [],
        [
          { t: "app." },
          { t: "get", c: "fn" },
          { t: "(" },
          { t: `"${route}"`, c: "str" },
          { t: ", () => ({ ok: " },
          { t: "true", c: "kw" },
          { t: " }));" },
        ],
        [],
        [
          { t: "app." },
          { t: "listen", c: "fn" },
          { t: "(" },
          { t: String(port), c: "num" },
          { t: ");" },
        ],
      ],
      out: ["$ node server.ts", `listening on :${port} — 200 OK`],
    },
    {
      file: "train.py",
      lines: [
        [
          { t: "model = " },
          { t: "train", c: "fn" },
          { t: "(dataset, epochs=" },
          { t: String(epochs), c: "num" },
          { t: ")" },
        ],
        [
          { t: "metrics = " },
          { t: "evaluate", c: "fn" },
          { t: "(model, holdout)" },
        ],
        [],
        [
          { t: "assert", c: "kw" },
          { t: " metrics.f1 > " },
          { t: threshold, c: "num" },
        ],
        [
          { t: "deploy", c: "fn" },
          { t: "(model, target=" },
          { t: '"prod"', c: "str" },
          { t: ")" },
        ],
      ],
      out: ["$ python train.py", `f1=${f1} · model v${modelV} → prod`],
    },
    {
      file: "service.yaml",
      lines: [
        [{ t: "service:", c: "kw" }],
        [
          { t: "  replicas: " },
          { t: String(replicas), c: "num" },
        ],
        [
          { t: "  rollout: " },
          { t: rollout, c: "str" },
        ],
        [
          { t: "  probes: " },
          { t: "[liveness, readiness]", c: "fn" },
        ],
      ],
      out: [
        "$ kubectl apply -f service.yaml",
        `rollout complete · ${replicas}/${replicas} ready`,
      ],
    },
  ]);
}
