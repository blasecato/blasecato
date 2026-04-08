"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.05 },
  },
};

const letterVariants = {
  initial: {
    y: 0,
    color: "inherit",
  },
  animate: {
    y: "-120%",
    color: "rgb(113 113 122)",
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  className?: string;
}

interface AnimatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  className?: string;
}

export function AnimatedInput({ label, className, value, ...props }: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-foreground/70"
        variants={containerVariants}
        initial="initial"
        animate={showLabel ? "animate" : "initial"}
      >
        {label.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block text-sm"
            variants={letterVariants}
            style={{ willChange: "transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        {...props}
        className="outline-none border-b-2 border-foreground/30 focus:border-foreground transition-colors duration-300 py-2 w-full text-base font-medium text-foreground bg-transparent placeholder-transparent"
      />
    </div>
  );
}

export function AnimatedTextarea({ label, className, value, ...props }: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || (typeof value === "string" && value.length > 0);

  return (
    <div className={cn("relative pt-1", className)}>
      <motion.div
        className="absolute top-2 pointer-events-none text-foreground/70"
        variants={containerVariants}
        initial="initial"
        animate={showLabel ? "animate" : "initial"}
      >
        {label.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block text-sm"
            variants={letterVariants}
            style={{ willChange: "transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      <textarea
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        {...props}
        className="outline-none border-b-2 border-foreground/30 focus:border-foreground transition-colors duration-300 pt-6 pb-2 w-full text-base font-medium text-foreground bg-transparent placeholder-transparent resize-none"
      />
    </div>
  );
}
