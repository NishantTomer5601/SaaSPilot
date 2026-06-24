import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { lifecyclePhases } from "@/data/lifecycle";
import { SITE_TAGLINE } from "@/lib/seo-routes";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/SaaSPilotLogo.png" alt="" className="h-7 w-7 object-contain" />
              <span className="font-heading text-xl font-bold">
                SaaS<span className="text-primary">Pilot</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE_TAGLINE} A structured journey from first problem to sustainable growth.
            </p>
            <Link
              to="/resources"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Explore all content <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              The SaaS lifecycle
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lifecyclePhases.map((phase) => (
                <Link key={phase.id} to={`/${phase.id}`} className="group">
                  <span className="text-xs font-bold text-primary">{phase.number}</span>
                  <p className="mt-1 font-heading font-semibold transition-colors group-hover:text-primary">
                    {phase.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{phase.eyebrow}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} SaaSPilot. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#privacy" className="hover:text-primary">Privacy</a>
            <a href="#terms" className="hover:text-primary">Terms</a>
            <Link to="/#newsletter" className="hover:text-primary">Newsletter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
