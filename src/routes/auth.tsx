import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteChrome } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Connexion — SUGU" },
      { name: "description", content: "Connectez-vous à SUGU pour gérer votre boutique digitale." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/tableau-de-bord" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/tableau-de-bord`,
            data: { full_name: fullName, phone },
          },
        });
        if (error) throw error;
        if (data.session) navigate({ to: "/creer-ma-boutique" });
        else setInfo("Vérifiez votre e-mail pour confirmer votre compte.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/tableau-de-bord" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteChrome>
      <section className="container-page py-16 max-w-md">
        <span className="chip">Espace entrepreneur</span>
        <h1 className="mt-4 text-3xl md:text-4xl font-display">
          {mode === "signup" ? "Créer mon compte SUGU" : "Se connecter"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {mode === "signup"
            ? "Ouvrez votre boutique digitale en quelques minutes."
            : "Retrouvez votre tableau de bord et vos boutiques."}
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <>
              <Field label="Nom complet" value={fullName} onChange={setFullName} required />
              <Field label="Téléphone" value={phone} onChange={setPhone} placeholder="+225 …" />
            </>
          )}
          <Field label="E-mail" type="email" value={email} onChange={setEmail} required />
          <Field
            label="Mot de passe"
            type="password"
            value={password}
            onChange={setPassword}
            required
            minLength={6}
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </p>
          )}
          {info && (
            <p className="text-sm rounded-lg p-3 border" style={{ borderColor: "var(--color-teal)", color: "var(--color-teal)" }}>
              {info}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Patientez…" : mode === "signup" ? "Créer mon compte" : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          {mode === "signup" ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="underline font-medium"
            style={{ color: "var(--color-teal)" }}
          >
            {mode === "signup" ? "Se connecter" : "Créer un compte"}
          </button>
        </p>

        <p className="mt-8 text-xs text-muted-foreground">
          En continuant, vous acceptez les CGU de SUGU. <Link to="/" className="underline">Retour</Link>
        </p>
      </section>
    </SiteChrome>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
        style={{ borderColor: "hsl(var(--border))" }}
      />
    </label>
  );
}
