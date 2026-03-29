"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface CountUpProps {
  value: string;
  duration?: number;
}

export function CountUp({ value, duration = 1.5 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  // Extract the numeric part and any prefix/suffix (e.g. "5,500" -> 5500, "5+" -> 5)
  const numericString = value.replace(/[^0-9.]/g, "");
  const targetNumber = parseFloat(numericString);
  const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = value.match(/[^0-9]*$/)?.[0] ?? "";

  // Check if the original value has commas for formatting
  const hasCommas = value.includes(",");

  useEffect(() => {
    if (!isInView || isNaN(targetNumber)) {
      setDisplay(value);
      return;
    }

    const startTime = performance.now();
    const isInteger = Number.isInteger(targetNumber);

    function update(currentTime: number) {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for a nice deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = eased * targetNumber;
      let formatted: string;

      if (isInteger) {
        const rounded = Math.round(current);
        formatted = hasCommas ? rounded.toLocaleString() : rounded.toString();
      } else {
        formatted = current.toFixed(1);
      }

      setDisplay(prefix + formatted + suffix);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Ensure final value matches exactly
        setDisplay(value);
      }
    }

    requestAnimationFrame(update);
  }, [isInView, targetNumber, value, duration, prefix, suffix, hasCommas]);

  return <span ref={ref}>{display}</span>;
}
