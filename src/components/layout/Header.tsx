import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Library, Menu, X } from "lucide-react";
import { lifecyclePhases } from "@/data/lifecycle";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-5 px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <img src="/SaaSPilotLogo.png" alt="" className="h-7 w-7 object-contain" />
          <span className="font-heading text-xl font-bold tracking-tight">
            SaaS<span className="text-primary">Pilot</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {lifecyclePhases.map((phase) => {
            const active = location.pathname === `/${phase.id}`;
            return (
              <Link
                key={phase.id}
                to={`/${phase.id}`}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-card hover:text-foreground",
                )}
              >
                {phase.shortTitle}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/resources"
          className={cn(
            "hidden shrink-0 items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors sm:flex",
            location.pathname === "/resources"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
          )}
        >
          <Library className="h-4 w-4" />
          All content
        </Link>

        <button
          type="button"
          className="rounded-md p-2 text-muted-foreground hover:bg-card hover:text-foreground lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-border bg-background/98 transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[560px] border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto grid max-w-7xl gap-1 px-6 py-4 sm:grid-cols-2">
          {lifecyclePhases.map((phase) => (
            <Link
              key={phase.id}
              to={`/${phase.id}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <span className="font-heading text-xs font-bold text-primary">{phase.number}</span>
              {phase.title}
            </Link>
          ))}
          <Link
            to="/resources"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 rounded-lg border border-border px-3 py-3 text-sm font-medium text-foreground sm:hidden"
          >
            <Library className="h-4 w-4 text-primary" />
            All content
          </Link>
        </nav>
      </div>
    </header>
  );
}
