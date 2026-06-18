import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Guides", href: "/#categories" },
  { label: "Case Studies", href: "/#featured" },
  { label: "Articles", href: "/#featured" },
  { label: "Resources", href: "/resources" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#") && location.pathname === "/") {
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <Compass className="h-7 w-7 text-primary" />
          <span className="font-heading text-xl font-bold tracking-tight">
            SaaS<span className="text-primary">Pilot</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/#newsletter">
            <Button variant="outline" size="sm">
              Join Newsletter
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-b-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/#newsletter" onClick={() => setMobileOpen(false)} className="mt-2 block w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
            >
              Join Newsletter
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
