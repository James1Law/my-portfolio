"use client";

import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { siteMetadata, heroSubtitles } from "@/lib/data";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { TypewriterText } from "@/components/animations/TypewriterText";
import { MouseGlow } from "@/components/animations/MouseGlow";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center"
    >
      {/* Interactive dot grid + mouse glow */}
      <MouseGlow />

      {/* Static centre glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-[55%]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(56, 189, 248, 0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl px-6">
        {/* Name — staggered letter reveal */}
        <h1 className="hero-gradient-text mb-4 text-6xl font-extrabold tracking-tighter sm:text-7xl md:text-8xl">
          <AnimatedText text={siteMetadata.name} delay={0.3} />
        </h1>

        {/* Title — typewriter cycling */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="mb-5 text-xl font-medium text-accent sm:text-2xl"
        >
          <TypewriterText texts={heroSubtitles} startDelay={1000} />
        </motion.p>

        {/* Tagline — fade up */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mx-auto mb-10 max-w-md text-base text-text-muted sm:text-lg"
        >
          {siteMetadata.tagline}
        </motion.p>

        {/* CTAs — fade up staggered */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#experience"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-semibold text-bg-primary transition-all hover:brightness-110"
          >
            See my work
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-3 text-sm font-medium text-text-primary transition-all hover:border-text-muted hover:bg-white/[0.03]"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Status badge — fade in last */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-dim px-4 py-1.5 text-sm font-medium text-accent"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Open to opportunities
        </motion.div>
      </div>

      {/* Scroll indicator — fade in last */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.4 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
