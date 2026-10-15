import Head from "next/head";

export default function AuthShell({ title, subtitle, footer, children }) {
  return (
    <>
      <Head>
        <title>{title} · Taskio</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&family=Roboto+Slab:wght@500&display=swap" rel="stylesheet" />
      </Head>

      <header>
        <div className="logo">Taskio</div>
      </header>

      <main className="auth-wrap">
        <section className="auth-card">
          <h1>{title}</h1>
          <p className="sub">{subtitle}</p>
          {children}
          <p className="alt">{footer}</p>
        </section>
      </main>
    </>
  );
}