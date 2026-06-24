import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection, FadeUpItem } from "@/components/shared/AnimatedSection";

const benefits = [
  "One practical SaaS lesson at a time",
  "New templates, frameworks, and checklists",
  "Guidance matched to the SaaS lifecycle",
  "Curated tools and implementation resources",
];

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <AnimatedSection id="newsletter" className="mx-auto max-w-7xl px-6 py-24">
      <FadeUpItem>
        <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-card">
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                number="04"
                title="Keep moving forward"
                subtitle="Get focused lessons and new resources for the stage you are working through."
              />
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center">
              {submitted ? (
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
                  <h3 className="mt-4 font-heading text-xl font-semibold">You&apos;re on the list!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for subscribing. Check your inbox for a confirmation email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium">
                      Email address
                    </label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full glow-pulse">
                    Subscribe to Newsletter
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </FadeUpItem>
    </AnimatedSection>
  );
}
