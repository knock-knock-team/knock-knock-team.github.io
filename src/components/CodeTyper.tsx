import { useEffect, useMemo, useRef, useState } from "react";
import { makeSnippets } from "../snippets";

const TYPE_MS = 26;
const NEWLINE_MS = 170;
const END_MS = 650;
const OUT_MS = 420;
const HOLD_MS = 2400;

export function CodeTyper() {
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const list = useMemo(makeSnippets, []);
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(0);
  const [outCount, setOutCount] = useState(0);
  const [active, setActive] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  const snippet = list[idx];

  const { total, newlines } = useMemo(() => {
    let running = 0;
    const breaks = new Set<number>();
    for (const line of snippet.lines) {
      const len = line.reduce((n, tok) => n + tok.t.length, 0);
      breaks.add(running + len);
      running += len + 1;
    }
    return { total: running, newlines: breaks };
  }, [snippet]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced || !active) return;
    let timer: number;
    if (pos < total) {
      timer = window.setTimeout(
        () => setPos((p) => p + 1),
        newlines.has(pos) ? NEWLINE_MS : TYPE_MS,
      );
    } else if (outCount < snippet.out.length) {
      timer = window.setTimeout(
        () => setOutCount((c) => c + 1),
        outCount === 0 ? END_MS : OUT_MS,
      );
    } else {
      timer = window.setTimeout(() => {
        setPos(0);
        setOutCount(0);
        setIdx((i) => (i + 1) % list.length);
      }, HOLD_MS);
    }
    return () => window.clearTimeout(timer);
  }, [pos, outCount, total, newlines, snippet, reduced, active, list.length]);

  const budget = reduced ? Number.MAX_SAFE_INTEGER : pos;
  const shownOut = reduced ? snippet.out.length : outCount;

  let remaining = budget;
  const rendered = [];
  for (let li = 0; li < snippet.lines.length; li++) {
    if (remaining <= 0 && !reduced) break;
    const spans = [];
    for (let ti = 0; ti < snippet.lines[li].length; ti++) {
      const tok = snippet.lines[li][ti];
      if (remaining <= 0) break;
      const take = Math.min(tok.t.length, remaining);
      spans.push(
        <span key={ti} className={tok.c}>
          {tok.t.slice(0, take)}
        </span>,
      );
      remaining -= take;
    }
    rendered.push(
      <div key={li} className="cl">
        {spans}
      </div>,
    );
    remaining -= 1;
  }

  const typing = !reduced && pos < total;

  return (
    <div className="codewin" ref={rootRef} aria-hidden="true">
      <div className="codewin-chrome">
        <span className="codewin-file">{snippet.file}</span>
      </div>
      <div className="codewin-body">
        {rendered}
        {typing ? <span className="caret" /> : null}
      </div>
      <div className="codewin-out">
        {snippet.out.slice(0, shownOut).map((line, i) => (
          <p key={line} className={i === 0 ? "cmd" : "ok"}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
