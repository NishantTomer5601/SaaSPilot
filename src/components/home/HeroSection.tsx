import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Compass, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LifecycleProgress } from "@/components/shared/LifecycleProgress";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid absolute inset-0" />
      <div className="hero-glow absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pb-24 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <Badge className="mb-6 w-fit gap-2 border-primary/20 bg-primary/5 px-3.5 py-1.5">
            <Compass className="h-3.5 w-3.5" />
            Your SaaS journey, mapped
          </Badge>

          <h1 className="max-w-4xl font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
            Build your SaaS.
            <span className="block text-primary">Step by step.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Follow a structured path from finding the right problem to acquiring and retaining
            customers. Practical guidance for every decision along the way.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/discover">
              <Button size="lg" className="glow-pulse px-6">
                Start the journey
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#start-where-you-are">
              <Button variant="ghost" size="lg" className="px-6">
                <Route className="h-4 w-4" />
                Find your current stage
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-16 rounded-xl border border-border/80 bg-background/60 p-4 backdrop-blur-sm sm:p-5"
        >
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            The SaaS lifecycle
          </p>
          <LifecycleProgress />
        </motion.div>
      </div>

      <div className="section-divider mx-auto max-w-7xl" />
    </section>
  );
}
