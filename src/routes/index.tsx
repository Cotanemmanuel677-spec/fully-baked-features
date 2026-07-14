import { createFileRoute, Link } from "@tanstack/react-router";
import heroIllustration from "@/assets/hero-sugu-illustration.jpg";
import { sectors } from "@/lib/sectors";


export const Route = createFileRoute("/")({
  component: Landing,
});


const plans = [
  {
    name: "Essentiel",
    price: "0",
    tag: "Gratuit pour toujours",
    highlight: false,
    for: "Auto-entrepreneurs en démarrage",
    features: [
      "Boutique sur sous-domaine sugu.ci",
      "Commission sur transactions uniquement",
      "Paiement Mobile Money",
      "Volumes limités par secteur",
    ],
  },
  {
    name: "Démarrage",
    price: "5 000",
    tag: "À partir de",
    highlight: false,
    for: "Activité régulière",
    features: [
      "Limites élargies (annonces, ventes)",
      "Gestion des stocks",
      "Messagerie basique",
      "Statistiques de base",
    ],
  },
  {
    name: "Pro",
    price: "25 000",
    tag: "Le plus populaire",
    highlight: true,
    for: "PME en croissance",
    features: [
      "Volumes illimités",
      "Statistiques avancées",
      "Messagerie complète",
      "1 module transversal en option",
    ],
  },
  {
    name: "Entreprise",
    price: "60 000",
    tag: "À partir de",
    highlight: false,
    for: "Groupes, cliniques, agences",
    features: [
      "Tout Pro + modules transversaux",
      "API + équipe illimitée",
      "Support prioritaire < 2h",
      "Account Manager dédié",
    ],
  },
];

const trust = [
  { k: "12", v: "secteurs métiers couverts" },
  { k: "0,5–1 %", v: "fonds de garantie inclus" },
  { k: "Escrow", v: "paiements sous séquestre" },
  { k: "Mobile Money", v: "Orange · MTN · Wave · Moov" },
];

function Landing() {
  return (
    <div className="surface-parchment min-h-screen">
      <Header />
      <Hero />
      <TickerTape />
      <TrustStrip />
      <Sectors />
      <MerchantVoices />
      <HowItWorks />
      <Pricing />
      <FinalCta />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="container-page flex items-center justify-between pt-6 pb-2">
      <Link to="/" className="flex items-center gap-2">
        <Logo />
        <span className="font-display text-xl">SUGU</span>
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#secteurs" className="hover:text-foreground transition-colors">Secteurs</a>
        <a href="#fonctionnement" className="hover:text-foreground transition-colors">Fonctionnement</a>
        <a href="#tarifs" className="hover:text-foreground transition-colors">Tarifs</a>
      </nav>
      <div className="flex items-center gap-2">
        <a href="#cta" className="btn-ghost hidden sm:inline-flex">Se connecter</a>
        <a href="#cta" className="btn-primary">Créer ma boutique</a>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span
      aria-hidden
      className="inline-flex h-8 w-8 items-center justify-center rounded-xl"
      style={{
        background:
          "linear-gradient(135deg, var(--color-teal), oklch(0.62 0.12 195))",
        color: "var(--color-primary-foreground)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h18l-2 12H5L3 7Z" />
        <path d="M8 7V5a4 4 0 0 1 8 0v2" />
      </svg>
    </span>
  );
}

function Hero() {
  return (
    <section className="container-page pt-8 pb-16 lg:pb-24">
      {/* Editorial masthead */}
      <div className="masthead-rule mb-8">
        <span>N° 01</span>
        <span>Édition Abidjan</span>
        <span>La confiance digitalisée</span>
      </div>

      <div className="relative grid lg:grid-cols-12 gap-8 items-end">
        {/* Left column: monumental headline */}
        <div className="lg:col-span-6 relative z-10">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-terracotta)" }} />
            Plateforme SaaS ivoirienne · 100 % Mobile Money
          </span>
          <h1 className="mt-6 font-display leading-[0.92] tracking-tight text-[3.4rem] sm:text-[4.5rem] lg:text-[6rem]">
            Votre business,
            <br />
            <em className="not-italic italic-serif" style={{ color: "var(--color-teal)", fontStyle: "italic" }}>
              digitalisé
            </em>
            <br />
            <span className="inline-flex items-baseline gap-3">
              <span>et</span>
              <em className="not-italic" style={{ color: "var(--color-terracotta)", fontStyle: "italic" }}>
                sécurisé.
              </em>
            </span>
          </h1>

          <p className="mt-8 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Une boutique en ligne clé en main pour chaque entrepreneur ivoirien.
            Nous bloquons l'argent sur un compte séquestre agréé BCEAO
            <em> jusqu'à la livraison</em>. Plus jamais d'impayés.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#cta" className="btn-primary">
              Créer ma boutique — gratuit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </a>
            <a href="#fonctionnement" className="btn-ghost">Comment ça marche</a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm">
            <div className="flex -space-x-2">
              <div className="h-9 w-9 rounded-full border-2 border-background" style={{ background: "var(--color-teal)" }} />
              <div className="h-9 w-9 rounded-full border-2 border-background" style={{ background: "var(--color-terracotta)" }} />
              <div className="h-9 w-9 rounded-full border-2 border-background" style={{ background: "var(--color-ochre)" }} />
            </div>
            <div className="text-muted-foreground">
              <span className="font-display text-foreground">+2 000 marchands</span>
              <br />
              de Treichville à San-Pédro.
            </div>
          </div>
        </div>

        {/* Right column: full illustration + overlays */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border grain" style={{ background: "var(--color-parchment-deep)" }}>
            <img
              src={heroIllustration}
              alt="Une commerçante ivoirienne au marché d'Abidjan, tenant son smartphone SUGU"
              width={1536}
              height={1152}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Stamp overlay */}
          <div
            className="stamp stamp-drop absolute -top-6 left-6 md:-left-8 bg-[color:var(--color-parchment)]"
            aria-hidden
          >
            Paiement · Protégé · Escrow · BCEAO
          </div>

          {/* FCFA counter card */}
          <div
            className="absolute -bottom-8 -left-4 md:-left-10 rounded-2xl border p-5 shadow-soft w-64"
            style={{ background: "var(--color-ink)", color: "var(--color-parchment)", borderColor: "oklch(1 0 0 / 0.1)" }}
          >
            <div className="text-[10px] uppercase tracking-widest opacity-70">Bloqué en séquestre</div>
            <div className="font-display text-3xl mt-1">
              150 000 <span className="text-base opacity-70">FCFA</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(1 0 0 / 0.1)" }}>
              <div className="h-full w-3/4" style={{ background: "var(--color-terracotta)" }} />
            </div>
            <div className="mt-3 text-[11px] opacity-70">Libéré à la validation client</div>
          </div>

          {/* Merchant tag */}
          <div
            className="absolute -right-2 md:-right-6 top-10 rounded-full py-2 px-4 shadow-soft flex items-center gap-2 text-sm font-medium"
            style={{ background: "var(--color-ochre)", color: "var(--color-ink)" }}
          >
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-ink)]" />
            Marché d'Adjamé
          </div>
        </div>
      </div>
    </section>
  );
}

function TickerTape() {
  const items = [
    "150 000 F · Marché vivrier · Adjamé",
    "42 000 F · Transport VTC · Cocody",
    "1 240 000 F · Immobilier · Yopougon",
    "18 500 F · Santé · Treichville",
    "310 000 F · Artisan · Bouaké",
    "85 000 F · Restauration · Marcory",
    "560 000 F · Éducation · San-Pédro",
    "72 000 F · Vente wax · Plateau",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-tape border-y" aria-hidden>
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-terracotta)" }}
            />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}


function TrustStrip() {
  return (
    <section className="border-y" style={{ background: "var(--color-parchment-deep)" }}>
      <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
        {trust.map((t) => (
          <div key={t.v}>
            <div className="font-display text-2xl md:text-3xl" style={{ color: "var(--color-teal)" }}>
              {t.k}
            </div>
            <div className="text-sm text-muted-foreground">{t.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section id="secteurs" className="container-page py-24">
      <div className="max-w-2xl">
        <span className="chip">Un secteur, une boutique adaptée</span>
        <h2 className="mt-4 text-3xl md:text-5xl">12 métiers, 12 façons de vendre.</h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Chaque boutique SUGU est configurée pour son secteur : règles de commission,
          modules métier, garanties et contrats sont préparés pour vous.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map((s) => (
          <Link
            key={s.slug}
            to="/secteurs/$slug"
            params={{ slug: s.slug }}
            className="group rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{s.emoji}</span>
              <span className="text-[11px] px-2 py-1 rounded-full border text-muted-foreground">
                {s.commissionRate}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-display">{s.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 flex-1">{s.short}</p>
            <span
              className="mt-3 text-sm font-medium inline-flex items-center gap-1"
              style={{ color: "var(--color-teal)" }}
            >
              Découvrir →
            </span>
          </Link>
        ))}
      </div>

    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Le client paie via Mobile Money",
      body: "Orange Money, MTN MoMo, Wave, Moov. Les fonds sont bloqués sur un compte séquestre agréé BCEAO.",
    },
    {
      n: "02",
      title: "Vous livrez la prestation",
      body: "Ni vous, ni le client n'avez accès à l'argent pendant la transaction — c'est notre engagement.",
    },
    {
      n: "03",
      title: "Le client valide avec un code à 4 chiffres",
      body: "Les fonds sont libérés vers votre compte, moins la commission SUGU et le fonds de garantie.",
    },
  ];

  return (
    <section id="fonctionnement" className="py-24" style={{ background: "var(--color-parchment-deep)" }}>
      <div className="container-page grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
        <div>
          <span className="chip">Escrow · Sécurité by design</span>
          <h2 className="mt-4 text-3xl md:text-5xl">L'argent n'arrive que si la promesse est tenue.</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Le mécanisme d'escrow est le cœur de SUGU. Il élimine la peur des deux côtés :
            le client ne perd pas son argent, l'entrepreneur ne livre pas dans le vide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="chip">TLS 1.3</span>
            <span className="chip">AES-256</span>
            <span className="chip">Conformité loi 2013-450</span>
            <span className="chip">Audit trail 5 ans</span>
          </div>
        </div>
        <ol className="space-y-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border bg-card p-6 flex gap-5">
              <div
                className="shrink-0 h-12 w-12 rounded-xl grid place-items-center font-display text-lg"
                style={{ background: "var(--color-teal-soft)", color: "oklch(0.28 0.05 200)" }}
              >
                {s.n}
              </div>
              <div>
                <h3 className="text-lg font-display">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="tarifs" className="container-page py-24">
      <div className="max-w-2xl">
        <span className="chip">Freemium honnête</span>
        <h2 className="mt-4 text-3xl md:text-5xl">Un plan qui grandit avec vous.</h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Commencez gratuitement, ne payez un abonnement que quand vos ventes le justifient.
          Nos tarifs sont conçus pour rester sous 3 % de votre CA mensuel.
        </p>
      </div>
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => (
          <article
            key={p.name}
            className={`rounded-2xl p-6 flex flex-col border transition-all ${
              p.highlight ? "shadow-soft" : "bg-card"
            }`}
            style={
              p.highlight
                ? {
                    background:
                      "linear-gradient(180deg, var(--color-teal), oklch(0.42 0.08 200))",
                    color: "var(--color-primary-foreground)",
                    borderColor: "transparent",
                  }
                : undefined
            }
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl">{p.name}</h3>
              {p.highlight && (
                <span
                  className="text-[11px] uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{
                    background: "oklch(1 0 0 / 0.18)",
                    color: "var(--color-primary-foreground)",
                  }}
                >
                  Populaire
                </span>
              )}
            </div>
            <p className={`text-sm mt-1 ${p.highlight ? "opacity-90" : "text-muted-foreground"}`}>
              {p.for}
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-4xl">{p.price}</span>
              <span className={`text-sm ${p.highlight ? "opacity-90" : "text-muted-foreground"}`}>
                FCFA / mois
              </span>
            </div>
            <p className={`text-xs mt-1 ${p.highlight ? "opacity-80" : "text-muted-foreground"}`}>
              {p.tag}
            </p>
            <ul className="mt-6 space-y-2 text-sm flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0"
                    style={{ color: p.highlight ? "currentColor" : "var(--color-teal)" }}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className={p.highlight ? "opacity-95" : ""}>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className={`mt-6 inline-flex items-center justify-center rounded-full py-2.5 font-semibold text-sm ${
                p.highlight ? "" : "btn-ghost"
              }`}
              style={
                p.highlight
                  ? {
                      background: "var(--color-primary-foreground)",
                      color: "var(--color-teal)",
                    }
                  : undefined
              }
            >
              Choisir {p.name}
            </a>
          </article>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        −10 % en paiement annuel · −20 % en paiement biennal. Commission par transaction 2 % à 5 % selon le secteur, incluant 0,5 % à 1 % de fonds de garantie.
      </p>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="cta" className="container-page py-24">
      <div
        className="rounded-3xl p-10 md:p-16 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-teal), oklch(0.4 0.08 205))",
          color: "var(--color-primary-foreground)",
        }}
      >
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full"
          style={{ background: "oklch(0.9 0.09 65 / 0.25)" }}
        />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Ouvrez votre boutique aujourd'hui.
            <br />
            Vendez dès demain.
          </h2>
          <p className="mt-4 opacity-90 text-lg">
            Sans carte bancaire. Sans engagement. Sous-domaine{" "}
            <span className="font-medium">maboutique.sugu.ci</span> configuré en 5 minutes.
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
              style={{ borderColor: "oklch(1 0 0 / 0.4)", color: "var(--color-primary-foreground)" }}
            >
              Parler à un conseiller
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="container-page py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-lg">SUGU</span>
          <span className="text-sm text-muted-foreground ml-3">
            © {new Date().getFullYear()} — Plateforme SaaS · Abidjan, Côte d'Ivoire
          </span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Mentions légales</a>
          <a href="#" className="hover:text-foreground">Confidentialité</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
