import { cases, contacts, services, site } from "./content";
import { CodeTyper } from "./components/CodeTyper";
import logoUrl from "./assets/logo.svg";

const nav = [
  { href: "#services", label: "services" },
  { href: "#cases", label: "cases" },
  { href: "#contact", label: "contact" },
];

function hasContact() {
  return Boolean(contacts.telegram || contacts.github || contacts.email);
}

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />

      <nav className="nav">
        <a className="wordmark" href="#top">
          <img src={logoUrl} alt="" />
          <span>{site.name}</span>
        </a>
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <h1>knock-knock.</h1>
            <p className="headline">{site.headline}</p>
            <p className="lede">{site.description}</p>
          </div>
          <CodeTyper />
        </section>

        <section id="services">
          <h2 className="section-title">services</h2>
          <ul className="service-list">
            {services.map((s) => (
              <li key={s.id} id={s.id}>
                <div className="service-main">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                <ul className="tags">
                  {s.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section id="cases">
          <h2 className="section-title">cases</h2>
          <p className="section-lead">
            Write-ups of solved problems: context, approach, outcome.
          </p>
          {cases.length > 0 ? (
            <ul className="case-list">
              {cases.map((c) => (
                <li key={c.title}>
                  <details>
                    <summary>
                      <span className="case-title">{c.title}</span>
                      <span className="case-field">{c.field}</span>
                      <span className="case-result">{c.result}</span>
                    </summary>
                    <div className="case-body">
                      <div>
                        <p className="case-label">problem</p>
                        <p>{c.task}</p>
                      </div>
                      <div>
                        <p className="case-label">approach</p>
                        <p>{c.approach}</p>
                      </div>
                      <ul className="tags">
                        {c.stack.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cases-empty">Nothing published yet.</p>
          )}
        </section>

        <section id="contact">
          <h2 className="section-title">contact</h2>
          <p className="section-lead">{contacts.note}</p>
          {hasContact() ? (
            <ul className="contact-list">
              {contacts.telegram ? (
                <li>
                  <span>telegram</span>
                  <a href={`https://t.me/${contacts.telegram.replace(/^@/, "")}`}>
                    @{contacts.telegram.replace(/^@/, "")}
                  </a>
                </li>
              ) : null}
              {contacts.github ? (
                <li>
                  <span>github</span>
                  <a href={`https://github.com/${contacts.github}`}>
                    {contacts.github}
                  </a>
                </li>
              ) : null}
              {contacts.email ? (
                <li>
                  <span>email</span>
                  <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </section>
      </main>

      <footer className="footer">
        <p className="footer-brand">
          <img src={logoUrl} alt="" />
          <span>{site.name}</span>
        </p>
        <p>{new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
