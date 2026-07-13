import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteChrome } from "@/components/site/SiteChrome";
import { sectors } from "@/lib/sectors";

export const Route = createFileRoute("/_authenticated/tableau-de-bord")({
  head: () => ({ meta: [{ title: "Tableau de bord — SUGU" }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const { data: boutiques, isLoading } = useQuery({
    queryKey: ["boutiques"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("boutiques")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <SiteChrome>
      <section className="container-page pt-10 pb-8 flex items-start justify-between gap-4">
        <div>
          <span className="chip">Espace entrepreneur</span>
          <h1 className="mt-4 text-4xl font-display">Mes boutiques</h1>
          <p className="mt-2 text-muted-foreground">Gérez vos boutiques SUGU et suivez leur activité.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={signOut} className="btn-ghost">Se déconnecter</button>
          <Link to="/creer-ma-boutique" className="btn-primary">+ Nouvelle boutique</Link>
        </div>
      </section>

      <section className="container-page pb-16">
        {isLoading ? (
          <p className="text-muted-foreground">Chargement…</p>
        ) : !boutiques || boutiques.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boutiques.map((b) => {
              const sector = sectors.find((s) => s.slug === b.sector_slug);
              return (
                <div key={b.id} className="rounded-2xl border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl" aria-hidden>{sector?.emoji ?? "🏬"}</span>
                    <span className="text-xs px-2 py-1 rounded-full border">{b.status}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-display">{b.name}</h2>
                  <p className="text-sm text-muted-foreground">{sector?.name ?? b.sector_slug}</p>
                  <p className="mt-3 text-sm">
                    <span className="text-muted-foreground">Sous-domaine :</span>{" "}
                    <code>{b.subdomain}.sugu.ci</code>
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="text-muted-foreground">Plan :</span> {b.plan}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </SiteChrome>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border-2 border-dashed p-12 text-center">
      <h2 className="text-2xl font-display">Aucune boutique pour l'instant</h2>
      <p className="mt-2 text-muted-foreground max-w-md mx-auto">
        Créez votre première boutique en 4 étapes : secteur, identité, plan, récap.
      </p>
      <Link to="/creer-ma-boutique" className="btn-primary mt-6 inline-flex">
        Créer ma boutique
      </Link>
    </div>
  );
}
