"use client";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute h-full w-full inset-0 pointer-events-none overflow-hidden", className)}>
      <svg
        className="absolute h-full w-full z-0 opacity-60"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1739_93)">
          <path
            d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875"
            stroke="url(#linearGradient-1)"
            strokeOpacity="0.4"
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <path
            d="m-369 -197c0 0 61.5 247.5 302 302s391 461 391 461"
            stroke="url(#linearGradient-2)"
            strokeOpacity="0.4"
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDelay: "0.5s", animationDuration: "3s" }}
          />
          <path
            d="m-331 -238c0 0 62.5 247.5 302 302s391 461 391 461"
            stroke="url(#linearGradient-3)"
            strokeOpacity="0.4"
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          />
          <path
            d="m-295 -288c0 0 62.5 247.5 302 302s391 461 391 461"
            stroke="url(#linearGradient-4)"
            strokeOpacity="0.4"
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDelay: "1.5s", animationDuration: "3s" }}
          />
          <path
            d="m-259 -338c0 0 62.5 247.5 302 302s391 461 391 461"
            stroke="url(#linearGradient-5)"
            strokeOpacity="0.4"
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "3s" }}
          />
        </g>
        <defs>
          <linearGradient id="linearGradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#a855f7" stopOpacity="0" />
            <stop stopColor="#a855f7" />
            <stop offset="32.5%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="linearGradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#a855f7" stopOpacity="0" />
            <stop stopColor="#a855f7" />
            <stop offset="32.5%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="linearGradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#a855f7" stopOpacity="0" />
            <stop stopColor="#a855f7" />
            <stop offset="32.5%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="linearGradient-4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#a855f7" stopOpacity="0" />
            <stop stopColor="#a855f7" />
            <stop offset="32.5%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="linearGradient-5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#a855f7" stopOpacity="0" />
            <stop stopColor="#a855f7" />
            <stop offset="32.5%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip0_1739_93">
            <rect width="696" height="316" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}; 