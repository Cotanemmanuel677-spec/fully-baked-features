import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Container, ButtonAnchor } from "@/components/site/sugu-brand";
import { sectors, sectorsBySlug, type Sector } from "@/lib/sectors";
import { getSectorVisual, type SectorVisual } from "@/lib/sector-visuals";

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
      <Container className="py-24 text-center">
        <h1 className="text-3xl font-black text-[#0B2D6D]">Ce secteur n&apos;existe pas.</h1>
        <Link
          to="/secteurs"
          className="mt-6 inline-flex rounded-2xl bg-[#F5821F] px-5 py-3 text-sm font-extrabold text-white"
        >
          Voir tous les secteurs
        </Link>
      </Container>
    </SiteChrome>
  ),
  errorComponent: () => (
    <SiteChrome>
      <Container className="py-24 text-center">
        <h1 className="text-3xl font-black text-[#0B2D6D]">
          Ce secteur n&apos;a pas pu se charger.
        </h1>
      </Container>
    </SiteChrome>
  ),
});

function SectorPage() {
  const { sector } = Route.useLoaderData();
  const visual = getSectorVisual(sector.slug);
  return (
    <SiteChrome>
      <SectorHero sector={sector} visual={visual} />
      <SectorUseCases sector={sector} visual={visual} />
      <SectorPlans sector={sector} visual={visual} />
      {sector.extras && sector.extras.length > 0 && (
        <SectorExtras sector={sector} visual={visual} />
      )}
      <SectorCTA sector={sector} visual={visual} />
      <RelatedSectors currentSlug={sector.slug} />
    </SiteChrome>
  );
}

/* ---------------- HERO ---------------- */

function SectorHero({ sector, visual }: { sector: Sector; visual: SectorVisual }) {
  const { color, tint, Icon } = visual;
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16">
      {/* halos couleur du secteur */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ backgroundColor: `${color}14` }}
      />
      <div
        className="pointer-events-none absolute -right-32 top-24 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ backgroundColor: `${color}10` }}
      />
      <Container className="relative">
        {/* fil d’ariane */}
        <nav className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B]">
          <Link to="/" className="hover:text-[#0B2D6D]">
            Accueil
          </Link>
          <ChevronRight size={14} />
          <Link to="/secteurs" className="hover:text-[#0B2D6D]">
            Secteurs
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#0B2D6D]">{sector.name}</span>
        </nav>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* colonne gauche : titre + intro */}
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold"
              style={{ backgroundColor: tint, color }}
            >
              <Sparkles size={15} />
              Secteur SUGU · Commission {sector.commissionRate}
            </div>

            <div className="mt-7 flex items-center gap-5">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-3xl shadow-[0_18px_45px_rgba(11,45,109,0.12)]"
                style={{ backgroundColor: tint, color }}
              >
                <Icon size={38} />
              </div>
              <h1
                className="text-4xl font-black leading-[1.02] tracking-[-0.045em] text-[#081A3D] sm:text-5xl lg:text-[3.5rem]"
              >
                {sector.name}
              </h1>
            </div>

            <p className="mt-7 max-w-xl text-xl font-semibold leading-8 text-[#334155]">
              {sector.short}
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#64748B]">
              {sector.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonAnchor
                href="#inscription"
                variant="sector"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 16px 35px ${color}40`,
                }}
                className="px-6 py-4"
              >
                Créer ma boutique {sector.name}
                <ArrowRight size={18} />
              </ButtonAnchor>
              <ButtonAnchor href="#tarifs" variant="secondary" className="px-6 py-4">
                Voir les plans
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ backgroundColor: tint, color }}
                >
                  <ArrowRight size={15} />
                </span>
              </ButtonAnchor>
            </div>

            <p className="mt-5 text-sm font-semibold text-[#64748B]">
              Aucun paiement demandé · Sous-domaine{" "}
              <span className="text-[#0B2D6D]">maboutique.sugu.ci</span> offert
            </p>
          </div>

          {/* colonne droite : carte de synthèse */}
          <aside className="relative">
            <div
              className="absolute -inset-4 -z-10 rounded-[2.5rem] blur-2xl"
              style={{ backgroundColor: `${color}18` }}
            />
            <div className="rounded-[2rem] border border-[#0B2D6D]/10 bg-white p-7 shadow-[0_24px_70px_rgba(11,45,109,0.12)]">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: tint, color }}
                >
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-[#64748B]">
                    Commission tout compris
                  </div>
                  <div className="text-3xl font-black" style={{ color }}>
                    {sector.commissionRate}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium leading-6 text-[#64748B]">
                {sector.commissionCategory}
              </p>

              <hr className="my-6 border-[#0B2D6D]/10" />

              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#64748B]">
                Pour qui
              </div>
              <p className="mt-2 text-base font-semibold leading-7 text-[#0B2D6D]">
                {sector.audience}
              </p>

              <hr className="my-6 border-[#0B2D6D]/10" />

              <ul className="space-y-3 text-sm font-medium text-[#334155]">
                <li className="flex items-start gap-2">
                  <BadgeCheck size={18} style={{ color }} className="mt-0.5 shrink-0" />
                  Paiement Mobile Money sous séquestre
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck size={18} style={{ color }} className="mt-0.5 shrink-0" />
                  Modules métier prêts à l&apos;emploi
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck size={18} style={{ color }} className="mt-0.5 shrink-0" />
                  Sous-domaine <span className="text-[#0B2D6D]">.sugu.ci</span> offert
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- CAS D’USAGE ---------------- */

function SectorUseCases({ sector, visual }: { sector: Sector; visual: SectorVisual }) {
  const { color, tint } = visual;
  return (
    <section className="bg-[#F8FAFC] py-20">
      <Container>
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold"
            style={{ backgroundColor: tint, color }}
          >
            <Star size={14} fill="currentColor" />
            Ce que vous ferez avec SUGU {sector.name}
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-[#0B2D6D] sm:text-4xl">
            Cas d&apos;usage clés
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {sector.useCases.map((u, i) => (
            <div
              key={u}
              className="flex gap-4 rounded-3xl border border-[#0B2D6D]/10 bg-white p-6 shadow-[0_14px_35px_rgba(11,45,109,0.06)] transition hover:-translate-y-0.5"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black"
                style={{ backgroundColor: tint, color }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="pt-1 text-base font-semibold leading-7 text-[#0B2D6D]">{u}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- PLANS ---------------- */

function SectorPlans({ sector, visual }: { sector: Sector; visual: SectorVisual }) {
  const { color, tint } = visual;
  return (
    <section id="tarifs" className="bg-white py-20">
      <Container>
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0B2D6D]/10 bg-white px-4 py-2 text-sm font-extrabold text-[#0B2D6D]">
            Freemium honnête
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-[#0B2D6D] sm:text-4xl">
            Plans pour {sector.name}
          </h2>
          <p className="mt-4 text-base font-medium leading-7 text-[#64748B]">
            Commencez gratuitement, passez au plan payant quand vos volumes le
            justifient. −10 % en paiement annuel, −20 % en biennal.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {sector.plans.map((p) => {
            const highlight = p.name === "Pro";
            return (
              <article
                key={p.name}
                className="relative flex flex-col overflow-hidden rounded-3xl border p-6 transition hover:-translate-y-1"
                style={
                  highlight
                    ? {
                        backgroundColor: color,
                        borderColor: color,
                        color: "#fff",
                        boxShadow: `0 26px 60px ${color}55`,
                      }
                    : {
                        backgroundColor: "#fff",
                        borderColor: "rgba(11,45,109,0.10)",
                        boxShadow: "0 14px 35px rgba(11,45,109,0.06)",
                      }
                }
              >
                {highlight && (
                  <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
                    Recommandé
                  </span>
                )}
                <h3
                  className="text-xl font-black"
                  style={{ color: highlight ? "#fff" : "#0B2D6D" }}
                >
                  {p.name}
                </h3>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-black">
                    {p.price === "0" ? "0" : p.price}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: highlight ? "rgba(255,255,255,0.85)" : "#64748B" }}
                  >
                    FCFA / mois
                  </span>
                </div>
                <p
                  className="mt-4 text-sm font-medium leading-6"
                  style={{ color: highlight ? "rgba(255,255,255,0.92)" : "#334155" }}
                >
                  {p.inclusions}
                </p>
                <a
                  href="#inscription"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold transition"
                  style={
                    highlight
                      ? { backgroundColor: "#fff", color }
                      : { backgroundColor: tint, color }
                  }
                >
                  Choisir {p.name}
                  <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>

        {sector.fieldNote && (
          <div
            className="mt-10 flex gap-4 rounded-3xl border-l-4 bg-[#F8FAFC] p-6"
            style={{ borderColor: color }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: tint, color }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#64748B]">
                Note de terrain
              </div>
              <p className="mt-1 text-base font-medium leading-7 text-[#0B2D6D]">
                {sector.fieldNote}
              </p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ---------------- EXTRAS / MODULES ---------------- */

function SectorExtras({ sector, visual }: { sector: Sector; visual: SectorVisual }) {
  const { color, tint } = visual;
  if (!sector.extras) return null;
  return (
    <section className="bg-[#F8FAFC] py-16">
      <Container>
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold"
            style={{ backgroundColor: tint, color }}
          >
            Modules et garanties
          </div>
          <h2 className="mt-5 text-2xl font-black tracking-[-0.02em] text-[#0B2D6D] sm:text-3xl">
            En option pour aller plus loin
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sector.extras.map((e) => (
            <div
              key={e}
              className="flex items-start gap-3 rounded-2xl border border-[#0B2D6D]/10 bg-white p-5 shadow-[0_10px_28px_rgba(11,45,109,0.05)]"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: tint, color }}
              >
                <Check size={18} strokeWidth={3} />
              </div>
              <p className="pt-1 text-sm font-semibold leading-6 text-[#0B2D6D]">{e}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- CTA FINAL ---------------- */

function SectorCTA({ sector, visual }: { sector: Sector; visual: SectorVisual }) {
  const { color } = visual;
  return (
    <section id="inscription" className="bg-white py-20">
      <Container>
        <div
          className="relative overflow-hidden rounded-[2.5rem] p-10 sm:p-14"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, #0B2D6D 100%)`,
            color: "#fff",
          }}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-3xl">
            <h2 className="text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Ouvrez votre boutique {sector.name} aujourd&apos;hui.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/90">
              Commission {sector.commissionRate} tout compris (fonds de garantie inclus).
              Aucun paiement demandé pour commencer. Sous-domaine{" "}
              <span className="font-black">maboutique.sugu.ci</span> offert.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-[#0B2D6D] shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
              >
                Créer ma boutique gratuitement
                <ArrowRight size={18} />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/40 px-6 py-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Parler à un conseiller
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- SECTEURS LIÉS ---------------- */

function RelatedSectors({ currentSlug }: { currentSlug: string }) {
  const others = sectors.filter((s) => s.slug !== currentSlug).slice(0, 4);
  return (
    <section className="bg-[#F8FAFC] py-16">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black tracking-[-0.02em] text-[#0B2D6D] sm:text-3xl">
            Autres secteurs SUGU
          </h2>
          <Link
            to="/secteurs"
            className="hidden items-center gap-1 text-sm font-extrabold text-[#F5821F] hover:gap-2 sm:inline-flex"
          >
            Voir les 12 secteurs <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => {
            const v = getSectorVisual(s.slug);
            const IconComp = v.Icon;
            return (
              <Link
                key={s.slug}
                to="/secteurs/$slug"
                params={{ slug: s.slug }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#0B2D6D]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(11,45,109,0.12)]"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: v.color }}
                  aria-hidden
                />
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: v.tint, color: v.color }}
                >
                  <IconComp size={22} />
                </div>
                <div className="mt-4 text-lg font-black text-[#0B2D6D]">{s.name}</div>
                <div className="mt-1 text-sm font-medium text-[#64748B]">
                  Commission {s.commissionRate}
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
