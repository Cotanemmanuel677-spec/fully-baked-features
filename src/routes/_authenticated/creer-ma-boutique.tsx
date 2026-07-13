import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteChrome } from "@/components/site/SiteChrome";
import { sectors, type Plan } from "@/lib/sectors";

export const Route = createFileRoute("/_authenticated/creer-ma-boutique")({
  head: () => ({ meta: [{ title: "Créer ma boutique — SUGU" }] }),
  component: Onboarding,
});

type State = {
  sectorSlug: string;
  name: string;
  subdomain: string;
  city: string;
  phone: string;
  plan: Plan["name"];
};

const STEPS = ["Secteur", "Identité", "Plan", "Récapitulatif"] as const;

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<State>({
    sectorSlug: "",
    name: "",
    subdomain: "",
    city: "",
    phone: "",
    plan: "Essentiel",
  });

  const sector = sectors.find((s) => s.slug === state.sectorSlug);
  const canNext =
    (step === 0 && !!state.sectorSlug) ||
    (step === 1 && state.name.length >= 2 && state.subdomain.length >= 3) ||
    step === 2 ||
    step === 3;

  async function submit() {
    setError(null);
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Session expirée");
      const { error } = await supabase.from("boutiques").insert({
        owner_id: userData.user.id,
        name: state.name,
        subdomain: state.subdomain,
        sector_slug: state.sectorSlug,
        plan: state.plan,
        city: state.city || null,
        phone: state.phone || null,
        status: "pending",
      });
      if (error) throw error;
      navigate({ to: "/tableau-de-bord" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      setError(msg.includes("duplicate") ? "Ce sous-domaine est déjà pris." : msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <SiteChrome>
      <section className="container-page py-10 max-w-3xl">
        <span className="chip">Étape {step + 1} / {STEPS.length}</span>
        <h1 className="mt-4 text-3xl md:text-4xl font-display">{STEPS[step]}</h1>

        <div className="mt-6 flex gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full"
              style={{ background: i <= step ? "var(--color-teal)" : "hsl(var(--border))" }}
            />
          ))}
        </div>

        <div className="mt-10">
          {step === 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {sectors.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setState({ ...state, sectorSlug: s.slug })}
                  className={`text-left rounded-2xl border p-5 transition ${
                    state.sectorSlug === s.slug ? "shadow-soft" : "hover:-translate-y-0.5"
                  }`}
                  style={{
                    borderColor:
                      state.sectorSlug === s.slug ? "var(--color-teal)" : "hsl(var(--border))",
                    borderWidth: state.sectorSlug === s.slug ? 2 : 1,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl" aria-hidden>{s.emoji}</span>
                    <span className="text-xs text-muted-foreground">Commission {s.commissionRate}</span>
                  </div>
                  <div className="mt-3 font-display text-lg">{s.name}</div>
                  <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.short}</div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 max-w-lg">
              <Field
                label="Nom de la boutique"
                value={state.name}
                onChange={(v) =>
                  setState({
                    ...state,
                    name: v,
                    subdomain: state.subdomain || slugify(v),
                  })
                }
                placeholder="Ex : Aïcha Transport"
              />
              <div>
                <label className="block">
                  <span className="text-sm font-medium">Sous-domaine SUGU</span>
                  <div className="mt-1 flex items-center rounded-lg border bg-background overflow-hidden">
                    <input
                      value={state.subdomain}
                      onChange={(e) =>
                        setState({ ...state, subdomain: slugify(e.target.value) })
                      }
                      className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                      placeholder="aicha-transport"
                    />
                    <span className="px-3 py-2 text-sm text-muted-foreground bg-muted">
                      .sugu.ci
                    </span>
                  </div>
                </label>
              </div>
              <Field
                label="Ville"
                value={state.city}
                onChange={(v) => setState({ ...state, city: v })}
                placeholder="Abidjan"
              />
              <Field
                label="Téléphone de la boutique"
                value={state.phone}
                onChange={(v) => setState({ ...state, phone: v })}
                placeholder="+225 …"
              />
            </div>
          )}

          {step === 2 && sector && (
            <div className="grid sm:grid-cols-2 gap-4">
              {sector.plans.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setState({ ...state, plan: p.name })}
                  className="text-left rounded-2xl border p-6 transition"
                  style={{
                    borderColor: state.plan === p.name ? "var(--color-teal)" : "hsl(var(--border))",
                    borderWidth: state.plan === p.name ? 2 : 1,
                  }}
                >
                  <div className="font-display text-xl">{p.name}</div>
                  <div className="text-2xl mt-2 font-display">
                    {p.price === "0" ? "Gratuit" : `${p.price} FCFA`}
                    <span className="text-sm text-muted-foreground font-sans"> / mois</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{p.inclusions}</p>
                </button>
              ))}
            </div>
          )}

          {step === 3 && sector && (
            <div className="rounded-2xl border p-6 bg-card space-y-3">
              <Row k="Secteur" v={`${sector.emoji} ${sector.name}`} />
              <Row k="Boutique" v={state.name} />
              <Row k="Sous-domaine" v={`${state.subdomain}.sugu.ci`} />
              <Row k="Ville" v={state.city || "—"} />
              <Row k="Téléphone" v={state.phone || "—"} />
              <Row k="Plan" v={state.plan} />
              <Row k="Commission" v={sector.commissionRate} />
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-between">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="btn-ghost disabled:opacity-40"
          >
            Retour
          </button>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canNext}
              className="btn-primary disabled:opacity-40"
            >
              Continuer
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={saving}
              className="btn-primary disabled:opacity-40"
            >
              {saving ? "Création…" : "Créer ma boutique"}
            </button>
          )}
        </div>
      </section>
    </SiteChrome>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-sm border-b last:border-0 py-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
      />
    </label>
  );
}
