import React from "react";
import { cn } from "@/lib/utils";

interface GlowingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

interface GlowingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}


export function GlowingInput({ label, className, ...props }: GlowingInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</label>
      )}
      <div className="relative flex items-center justify-center group">
        {/* Glow layers */}
        <div className="absolute z-[-1] overflow-hidden rounded-xl blur-[3px] inset-0
          before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
          before:[background:conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)]
          before:transition-all before:duration-[2000ms] before:[transform:translate(-50%,-50%)_rotate(60deg)]
          group-hover:before:[transform:translate(-50%,-50%)_rotate(-120deg)]
          group-focus-within:before:[transform:translate(-50%,-50%)_rotate(420deg)] group-focus-within:before:duration-[4000ms]"
        />
        <div className="absolute z-[-1] overflow-hidden rounded-xl blur-[2px] inset-[1px]
          before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
          before:[background:conic-gradient(rgba(0,0,0,0),#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)] before:brightness-[1.4]
          before:transition-all before:duration-[2000ms] before:[transform:translate(-50%,-50%)_rotate(83deg)]
          group-hover:before:[transform:translate(-50%,-50%)_rotate(-97deg)]
          group-focus-within:before:[transform:translate(-50%,-50%)_rotate(443deg)] group-focus-within:before:duration-[4000ms]"
        />
        <div className="absolute z-[-1] overflow-hidden rounded-xl blur-[0.5px] inset-[2px]
          before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
          before:[background:conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)] before:brightness-[1.3]
          before:transition-all before:duration-[2000ms] before:[transform:translate(-50%,-50%)_rotate(70deg)]
          group-hover:before:[transform:translate(-50%,-50%)_rotate(-110deg)]
          group-focus-within:before:[transform:translate(-50%,-50%)_rotate(430deg)] group-focus-within:before:duration-[4000ms]"
        />
        <input
          className={cn(
            "relative z-10 w-full h-[52px] rounded-xl bg-[#010201] text-white px-4 text-sm focus:outline-none placeholder:text-white/20",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export function GlowingTextarea({ label, className, ...props }: GlowingTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</label>
      )}
      <div className="relative flex items-center justify-center group">
        <div className="absolute z-[-1] overflow-hidden rounded-xl blur-[3px] inset-0
          before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
          before:[background:conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)]
          before:transition-all before:duration-[2000ms] before:[transform:translate(-50%,-50%)_rotate(60deg)]
          group-hover:before:[transform:translate(-50%,-50%)_rotate(-120deg)]
          group-focus-within:before:[transform:translate(-50%,-50%)_rotate(420deg)] group-focus-within:before:duration-[4000ms]"
        />
        <div className="absolute z-[-1] overflow-hidden rounded-xl blur-[2px] inset-[1px]
          before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
          before:[background:conic-gradient(rgba(0,0,0,0),#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)] before:brightness-[1.4]
          before:transition-all before:duration-[2000ms] before:[transform:translate(-50%,-50%)_rotate(83deg)]
          group-hover:before:[transform:translate(-50%,-50%)_rotate(-97deg)]
          group-focus-within:before:[transform:translate(-50%,-50%)_rotate(443deg)] group-focus-within:before:duration-[4000ms]"
        />
        <div className="absolute z-[-1] overflow-hidden rounded-xl blur-[0.5px] inset-[2px]
          before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
          before:[background:conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)] before:brightness-[1.3]
          before:transition-all before:duration-[2000ms] before:[transform:translate(-50%,-50%)_rotate(70deg)]
          group-hover:before:[transform:translate(-50%,-50%)_rotate(-110deg)]
          group-focus-within:before:[transform:translate(-50%,-50%)_rotate(430deg)] group-focus-within:before:duration-[4000ms]"
        />
        <textarea
          className={cn(
            "relative z-10 w-full rounded-xl bg-[#010201] text-white px-4 py-3 text-sm focus:outline-none placeholder:text-white/20 resize-none",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
