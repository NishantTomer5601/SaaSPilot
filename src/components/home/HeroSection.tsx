import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const trustSignals = [
  { stat: "500+", label: "Guides & Articles" },
  { stat: "10K+", label: "Founders Learning" },
  { stat: "60+", label: "Case Studies" },
  { stat: "Free", label: "Always" },
];

const topicTags = [
  "Idea Validation",
  "MVP",
  "Pricing",
  "Churn Reduction",
  "PLG",
  "Fundraising",
  "Cold Outreach",
  "System Design",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid absolute inset-0" />
      <div className="hero-glow absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl text-left"
        >
          <Badge
            variant="default"
            className="mb-6 px-3.5 py-1.5 font-medium border border-primary/20 bg-primary/5 text-xs text-primary transition-all flex items-center gap-2 w-fit"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            The SaaS founder's knowledge hub
          </Badge>

          <h1 className="font-heading text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Build. <span className="text-primary">Launch.</span> Scale.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            Practical guides, real case studies, and battle-tested frameworks for SaaS founders at
            every stage — from your first idea to your first million in ARR.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/resources">
              <Button size="lg" className="glow-pulse px-6 py-2.5 flex items-center gap-2">
                Explore Guides
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border border-border bg-transparent hover:border-primary/50 hover:bg-card px-6"
              onClick={() =>
                document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Browse Case Studies
            </Button>
          </div>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="my-12 h-px w-full bg-border/40"
        />

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-wrap gap-x-16 gap-y-6 text-left"
        >
          {trustSignals.map(({ stat, label }) => (
            <div key={label} className="min-w-[120px]">
              <div className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
                {stat}
              </div>
              <div className="mt-1.5 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Topic Tags Row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-2 text-left"
        >
          {topicTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs px-3.5 py-1.5 border-border bg-card/20 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-pointer"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>
      </div>

      <div className="section-divider mx-auto max-w-7xl px-6" />
    </section>
  );
}
