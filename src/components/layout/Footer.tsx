import { Link } from "react-router-dom";
import { Compass, Code2, Globe, Share2 } from "lucide-react";
import { SITE_TAGLINE } from "@/lib/seo-routes";

const footerLinks = {
  Build: [
    { label: "SaaS Development", href: "/resources?category=development" },
    { label: "MVP & Validation", href: "/resources?category=mvp" },
    { label: "Architecture Guides", href: "/resources?category=development" },
  ],
  Grow: [
    { label: "Marketing", href: "/resources?category=marketing" },
    { label: "Distribution", href: "/resources?category=distribution" },
    { label: "Sales & Revenue", href: "/resources?category=sales" },
  ],
  Operate: [
    { label: "Operations", href: "/resources?category=operations" },
    { label: "All Resources", href: "/resources" },
    { label: "Newsletter", href: "/#newsletter" },
  ],
};

const socialLinks = [
  { icon: Share2, href: "https://twitter.com/saaspilot", label: "Twitter" },
  { icon: Globe, href: "https://linkedin.com/company/saaspilot", label: "LinkedIn" },
  { icon: Code2, href: "https://github.com/saaspilot", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="h-px bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <Compass className="h-6 w-6 text-primary" />
              <span className="font-heading text-lg font-bold">
                SaaS<span className="text-primary">Pilot</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE_TAGLINE}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-sm font-semibold text-foreground">{title}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SaaSPilot. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for founders who ship.
          </p>
        </div>
      </div>
    </footer>
  );
}
