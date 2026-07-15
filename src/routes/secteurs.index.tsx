import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Store } from "lucide-react";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Container } from "@/components/site/sugu-brand";
import { sectors } from "@/lib/sectors";
import { getSectorVisual } from "@/lib/sector-visuals";

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
      <section className="bg-white pt-14 pb-10">
        <Container>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F5821F]/20 bg-[#FFF7EF] px-4 py-2 text-sm font-extrabold text-[#B85F12]">
            <Store size={15} />
            12 secteurs · 12 façons de vendre
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-[#081A3D] sm:text-5xl lg:text-6xl">
            Choisissez le métier auquel votre boutique doit ressembler.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#334155]">
            Chaque secteur SUGU est configuré avec ses propres règles : commissions,
            modules métier, garanties, contrats types et cas d&apos;usage terrain.
          </p>
        </Container>
      </section>

      <section className="bg-[#F8FAFC] py-14">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s) => {
              const { color, tint, Icon } = getSectorVisual(s.slug);
              return (
                <Link
                  key={s.slug}
                  to="/secteurs/$slug"
                  params={{ slug: s.slug }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#0B2D6D]/10 bg-white p-6 shadow-[0_18px_45px_rgba(11,45,109,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(11,45,109,0.12)]"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ backgroundColor: color }}
                    aria-hidden
                  />
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: tint, color }}
                    >
                      <Icon size={26} />
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider"
                      style={{ backgroundColor: tint, color }}
                    >
                      {s.commissionRate}
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl font-black text-[#0B2D6D]">{s.name}</h2>
                  <p className="mt-2 flex-1 text-sm font-medium leading-6 text-[#64748B]">
                    {s.short}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold transition group-hover:gap-2.5"
                    style={{ color }}
                  >
                    Découvrir <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </SiteChrome>
  );
}
