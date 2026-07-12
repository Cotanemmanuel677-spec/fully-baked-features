import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { sectors, sectorsBySlug, type Sector } from "@/lib/sectors";

export const Route = createFileRoute("/secteurs/$slug")({
  loader: ({ params }) => {
    const sector = sectorsBySlug[params.slug];
    if (!sector) throw notFound();
    return { sector };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Secteur introuvable — SUGU" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const s = loaderData.sector;
    const title = `${s.name} — Boutique SUGU`;
    const description = `${s.short} Tarifs, commission ${s.commissionRate}, plans Essentiel à Entreprise pour ${s.audience.toLowerCase()}`;
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 200) },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/secteurs/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/secteurs/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `SUGU — ${s.name}`,
            description: s.short,
            areaServed: "CI",
            provider: { "@type": "Organization", name: "SUGU" },
            offers: s.plans.map((p) => ({
              "@type": "Offer",
              name: p.name,
              price: p.price === "0" ? "0" : p.price.replace(/\s/g, ""),
              priceCurrency: "XOF",
              description: p.inclusions,
            })),
          }),
        },
      ],
    };
  },
  component: SectorPage,
  notFoundComponent: () => (
    <SiteChrome>
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-display">Ce secteur n'existe pas.</h1>
        <Link to="/secteurs" className="btn-primary mt-6 inline-flex">
          Voir tous les secteurs
        </Link>
      </div>
    </SiteChrome>
  ),
  errorComponent: () => (
    <SiteChrome>
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-display">Ce secteur n'a pas pu se charger.</h1>
      </div>
    </SiteChrome>
  ),
});

function SectorPage() {
  const { sector } = Route.useLoaderData();
  return (
    <SiteChrome>
      <SectorHero sector={sector} />
      <SectorUseCases sector={sector} />
      <SectorPlans sector={sector} />
      <SectorCommission sector={sector} />
      <RelatedSectors currentSlug={sector.slug} />
    </SiteChrome>
  );
}

function SectorHero({ sector }: { sector: Sector }) {
  return (
    <section className="container-page pt-8 pb-12 lg:pt-14 lg:pb-16">
      <Link
        to="/secteurs"
        className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
      >
        ← Tous les secteurs
      </Link>
      <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div>
          <span className="chip">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-teal)" }}
            />
            Secteur · Commission {sector.commissionRate}
          </span>
          <div className="mt-5 flex items-center gap-4">
            <span className="text-5xl" aria-hidden>{sector.emoji}</span>
            <h1 className="text-4xl md:text-5xl font-display leading-[1.05]">{sector.name}</h1>
          </div>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">{sector.short}</p>
          <p className="mt-3 text-base text-foreground/80 max-w-xl">{sector.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cta" className="btn-primary">Créer ma boutique {sector.name}</a>
            <a href="#tarifs" className="btn-ghost">Voir les plans</a>
          </div>
        </div>
        <aside className="rounded-3xl border bg-card p-6 shadow-soft">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Pour qui</div>
          <p className="mt-2 text-base">{sector.audience}</p>
          <hr className="my-5 border-border" />
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Commission</div>
          <div className="mt-2 font-display text-3xl" style={{ color: "var(--color-teal)" }}>
            {sector.commissionRate}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{sector.commissionCategory}</p>
          {sector.extras && sector.extras.length > 0 && (
            <>
              <hr className="my-5 border-border" />
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Modules et garanties
              </div>
              <ul className="mt-2 space-y-1 text-sm">
                {sector.extras.map((e) => (
                  <li key={e} className="flex gap-2">
                    <span aria-hidden style={{ color: "var(--color-ochre)" }}>◆</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

function SectorUseCases({ sector }: { sector: Sector }) {
  return (
    <section className="py-16" style={{ background: "var(--color-parchment-deep)" }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="chip">Ce que vous ferez avec SUGU {sector.name}</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display">Cas d'usage clés</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {sector.useCases.map((u, i) => (
            <div key={u} className="rounded-2xl bg-card border p-5 flex gap-4">
              <div
                className="shrink-0 h-10 w-10 rounded-xl grid place-items-center font-display"
                style={{ background: "var(--color-teal-soft)", color: "oklch(0.28 0.05 200)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-sm md:text-base pt-1">{u}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorPlans({ sector }: { sector: Sector }) {
  return (
    <section id="tarifs" className="container-page py-20">
      <div className="max-w-2xl">
        <span className="chip">Freemium honnête</span>
        <h2 className="mt-4 text-3xl md:text-4xl font-display">Plans pour {sector.name}</h2>
        <p className="mt-3 text-muted-foreground">
          Commencez gratuitement, passez au plan payant quand vos volumes le justifient.
          −10 % en paiement annuel, −20 % en biennal.
        </p>
      </div>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sector.plans.map((p) => {
          const highlight = p.name === "Pro";
          return (
            <article
              key={p.name}
              className="rounded-2xl p-6 flex flex-col border"
              style={
                highlight
                  ? {
                      background: "linear-gradient(180deg, var(--color-teal), oklch(0.42 0.08 200))",
                      color: "var(--color-primary-foreground)",
                      borderColor: "transparent",
                    }
                  : { background: "var(--color-card)" }
              }
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl">{p.name}</h3>
                {highlight && (
                  <span
                    className="text-[11px] uppercase tracking-wider px-2 py-1 rounded-full"
                    style={{ background: "oklch(1 0 0 / 0.18)" }}
                  >
                    Recommandé
                  </span>
                )}
              </div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl">
                  {p.price === "0" ? "0" : p.price}
                </span>
                <span className={`text-sm ${highlight ? "opacity-90" : "text-muted-foreground"}`}>
                  FCFA / mois
                </span>
              </div>
              <p className={`text-sm mt-3 ${highlight ? "opacity-95" : "text-muted-foreground"}`}>
                {p.inclusions}
              </p>
            </article>
          );
        })}
      </div>
      {sector.fieldNote && (
        <div className="mt-8 rounded-2xl border-l-4 p-5 bg-card" style={{ borderColor: "var(--color-ochre)" }}>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Note de terrain</div>
          <p className="mt-1 text-sm md:text-base">{sector.fieldNote}</p>
        </div>
      )}
    </section>
  );
}

function SectorCommission({ sector }: { sector: Sector }) {
  return (
    <section className="container-page pb-24">
      <div
        id="cta"
        className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--color-teal), oklch(0.4 0.08 205))",
          color: "var(--color-primary-foreground)",
        }}
      >
        <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-2xl">
          Ouvrez votre boutique {sector.name} aujourd'hui.
        </h2>
        <p className="mt-4 opacity-90 max-w-2xl">
          Commission {sector.commissionRate} tout compris (fonds de garantie inclus). Aucun
          paiement demandé pour commencer. Sous-domaine{" "}
          <span className="font-medium">maboutique.sugu.ci</span> offert.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold"
            style={{ background: "var(--color-primary-foreground)", color: "var(--color-teal)" }}
          >
            Créer ma boutique gratuitement
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold border"
            style={{ borderColor: "oklch(1 0 0 / 0.4)" }}
          >
            Parler à un conseiller
          </a>
        </div>
      </div>
    </section>
  );
}

function RelatedSectors({ currentSlug }: { currentSlug: string }) {
  const others = sectors.filter((s) => s.slug !== currentSlug).slice(0, 4);
  return (
    <section className="container-page pb-20">
      <h2 className="text-2xl font-display">Autres secteurs SUGU</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {others.map((s) => (
          <Link
            key={s.slug}
            to="/secteurs/$slug"
            params={{ slug: s.slug }}
            className="rounded-2xl border bg-card p-5 hover:-translate-y-0.5 hover:shadow-soft transition-all"
          >
            <div className="text-2xl">{s.emoji}</div>
            <div className="mt-2 font-display text-lg">{s.name}</div>
            <div className="text-sm text-muted-foreground mt-1">
              Commission {s.commissionRate}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
