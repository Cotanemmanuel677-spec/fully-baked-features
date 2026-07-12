import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { sectors } from "@/lib/sectors";

export const Route = createFileRoute("/secteurs/")({
  head: () => ({
    meta: [
      { title: "Les 12 secteurs SUGU — Une boutique par métier" },
      {
        name: "description",
        content:
          "Transport, agriculture, santé, immobilier, emploi, services, vente, réservation, éducation, événementiel, BTP, énergie : 12 boutiques SaaS clé en main.",
      },
      { property: "og:title", content: "Les 12 secteurs SUGU — Une boutique par métier" },
      {
        property: "og:description",
        content:
          "Tarifs, commissions et cas d'usage pour chaque métier ivoirien. Boutique adaptée, paiement Mobile Money sous escrow.",
      },
      { property: "og:url", content: "/secteurs" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/secteurs" }],
  }),
  component: SectorsIndex,
});

function SectorsIndex() {
  return (
    <SiteChrome>
      <section className="container-page pt-12 pb-6">
        <span className="chip">12 secteurs · 12 façons de vendre</span>
        <h1 className="mt-4 text-4xl md:text-5xl font-display leading-[1.05] max-w-3xl">
          Choisissez le métier auquel votre boutique doit ressembler.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Chaque secteur SUGU est configuré avec ses propres règles : commissions,
          modules métier, garanties, contrats types et cas d'usage terrain.
        </p>
      </section>

      <section className="container-page py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map((s) => (
          <Link
            key={s.slug}
            to="/secteurs/$slug"
            params={{ slug: s.slug }}
            className="rounded-2xl border bg-card p-6 hover:-translate-y-0.5 hover:shadow-soft transition-all flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl" aria-hidden>{s.emoji}</span>
              <span className="text-xs px-2 py-1 rounded-full border text-muted-foreground">
                Commission {s.commissionRate}
              </span>
            </div>
            <h2 className="mt-4 text-xl font-display">{s.name}</h2>
            <p className="text-sm text-muted-foreground mt-2 flex-1">{s.short}</p>
            <span
              className="mt-4 text-sm font-medium inline-flex items-center gap-1"
              style={{ color: "var(--color-teal)" }}
            >
              Découvrir →
            </span>
          </Link>
        ))}
      </section>
    </SiteChrome>
  );
}
