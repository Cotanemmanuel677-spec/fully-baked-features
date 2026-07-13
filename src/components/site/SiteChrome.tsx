import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="surface-parchment min-h-screen">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

export function SiteHeader() {
  const { user, loading } = useAuth();
  return (
    <header className="container-page flex items-center justify-between pt-6 pb-2">
      <Link to="/" className="flex items-center gap-2">
        <Logo />
        <span className="font-display text-xl">SUGU</span>
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <Link
          to="/secteurs"
          className="hover:text-foreground transition-colors"
          activeProps={{ className: "text-foreground font-medium" }}
        >
          Secteurs
        </Link>
        <Link
          to="/"
          hash="fonctionnement"
          className="hover:text-foreground transition-colors"
        >
          Fonctionnement
        </Link>
        <Link
          to="/"
          hash="tarifs"
          className="hover:text-foreground transition-colors"
        >
          Tarifs
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        {loading ? null : user ? (
          <>
            <Link to="/tableau-de-bord" className="btn-ghost hidden sm:inline-flex">Mon espace</Link>
            <Link to="/creer-ma-boutique" className="btn-primary">+ Boutique</Link>
          </>
        ) : (
          <>
            <Link to="/auth" className="btn-ghost">Se connecter</Link>
            <Link to="/auth" className="btn-primary hidden sm:inline-flex">Créer ma boutique</Link>
          </>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t mt-24">
      <div className="container-page py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-lg">SUGU</span>
          <span className="text-sm text-muted-foreground ml-3">
            © {new Date().getFullYear()} — Plateforme SaaS · Abidjan, Côte d'Ivoire
          </span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/secteurs" className="hover:text-foreground">Tous les secteurs</Link>
          <a href="#" className="hover:text-foreground">Mentions légales</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export function Logo() {
  return (
    <span
      aria-hidden
      className="inline-flex h-8 w-8 items-center justify-center rounded-xl"
      style={{
        background: "linear-gradient(135deg, var(--color-teal), oklch(0.62 0.12 195))",
        color: "var(--color-primary-foreground)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7h18l-2 12H5L3 7Z" />
        <path d="M8 7V5a4 4 0 0 1 8 0v2" />
      </svg>
    </span>
  );
}
