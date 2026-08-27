import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";

/* ---------------- Reveal on scroll ---------------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- Count-up on view ---------------- */

export function useCountUp(end: number, start: boolean, duration = 1200) {
  const [val, setVal] = useState(end);

  useEffect(() => {
    if (!start) return;
    setVal(0);
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(end);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, start, duration]);

  return val;
}

export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ---------------- Custom inline icons ---------------- */

type IP = SVGProps<SVGSVGElement>;
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const IconHanger = (p: IP) => (
  <svg {...base} {...p}>
    <path d="M12 4.5a2 2 0 1 1 2 2c-1 0-1.6.7-1.6 1.7v.6L3.5 15.6a1.4 1.4 0 0 0 .8 2.6h15.4a1.4 1.4 0 0 0 .8-2.6L12.7 8.9" />
  </svg>
);

export const IconBag = (p: IP) => (
  <svg {...base} {...p}>
    <path d="M5.2 8h13.6l-1 11.2a1.6 1.6 0 0 1-1.6 1.5H7.8a1.6 1.6 0 0 1-1.6-1.5L5.2 8Z" />
    <path d="M8.6 10.4V6.8a3.4 3.4 0 0 1 6.8 0v3.6" />
  </svg>
);

export const IconInstagram = (p: IP) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconWhatsApp = (p: IP) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.1 7.3C8.92 7.3 8.62 7.37 8.37 7.64C8.11 7.91 7.4 8.58 7.4 9.94C7.4 11.3 8.39 12.61 8.53 12.8C8.67 12.98 10.45 15.74 13.2 16.92C13.85 17.2 14.36 17.38 14.76 17.51C15.42 17.72 16.02 17.69 16.5 17.62C17.03 17.54 18.13 16.95 18.36 16.31C18.6 15.67 18.6 15.12 18.53 15C18.46 14.89 18.27 14.82 18 14.68C17.72 14.54 16.36 13.87 16.11 13.78C15.86 13.69 15.68 13.64 15.5 13.92C15.31 14.19 14.79 14.82 14.63 15C14.47 15.19 14.31 15.21 14.04 15.07C13.76 14.93 12.88 14.64 11.83 13.71C11.01 12.98 10.46 12.08 10.3 11.81C10.14 11.53 10.28 11.39 10.42 11.25C10.55 11.12 10.71 10.91 10.85 10.75C10.99 10.59 11.04 10.47 11.13 10.29C11.22 10.11 11.17 9.95 11.1 9.81C11.04 9.68 10.5 8.33 10.27 7.78C10.05 7.24 9.82 7.32 9.66 7.31C9.5 7.3 9.32 7.3 9.1 7.3Z" />
  </svg>
);

export const IconSearch = (p: IP) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4.35-4.35" />
  </svg>
);

export const IconArrow = (p: IP) => (
  <svg {...base} {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const IconArrowDown = (p: IP) => (
  <svg {...base} {...p}>
    <path d="M12 4v15" />
    <path d="m6 13 6 6 6-6" />
  </svg>
);

export const IconTruck = (p: IP) => (
  <svg {...base} {...p}>
    <path d="M2.8 6.2h11.4v10H2.8z" />
    <path d="M14.2 9.4h4l2.8 3.4v3.4h-2.6" />
    <circle cx="7" cy="17.6" r="1.9" />
    <circle cx="16.8" cy="17.6" r="1.9" />
    <path d="M9 16.2h5.9" />
  </svg>
);

export const IconCard = (p: IP) => (
  <svg {...base} {...p}>
    <rect x="2.8" y="5.5" width="18.4" height="13" rx="2.2" />
    <path d="M2.8 9.7h18.4" />
    <path d="M6.2 14.8h4.4" />
  </svg>
);

export const IconSwap = (p: IP) => (
  <svg {...base} {...p}>
    <path d="M7 4.6 3.6 8 7 11.4" />
    <path d="M3.6 8h13.2a3.2 3.2 0 0 1 3.2 3.2v.4" />
    <path d="m17 19.4 3.4-3.4-3.4-3.4" />
    <path d="M20.4 16H7.2A3.2 3.2 0 0 1 4 12.8v-.4" />
  </svg>
);

export const IconHeart = (p: IP) => (
  <svg {...base} {...p}>
    <path d="M12 20s-7.6-4.6-7.6-10A4.4 4.4 0 0 1 12 7.3 4.4 4.4 0 0 1 19.6 10c0 5.4-7.6 10-7.6 10Z" />
  </svg>
);

export const IconStar = (p: IP) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.6c.6 4.6 1.9 6.6 2.6 7.3.7.7 2.7 1.5 6.8 2.1-4.1.6-6.1 1.4-6.8 2.1-.7.7-2 2.7-2.6 7.3-.6-4.6-1.9-6.6-2.6-7.3-.7-.7-2.7-1.5-6.8-2.1 4.1-.6 6.1-1.4 6.8-2.1.7-.7 2-2.7 2.6-7.3Z" />
  </svg>
);

export const IconCheck = (p: IP) => (
  <svg {...base} strokeWidth={2.4} {...p}>
    <path d="m4.5 12.8 4.6 4.6L19.5 7" />
  </svg>
);

export const IconClose = (p: IP) => (
  <svg {...base} {...p}>
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </svg>
);

export const IconPlus = (p: IP) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (p: IP) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const IconPin = (p: IP) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6.4-5.4-6.4-10.4a6.4 6.4 0 1 1 12.8 0C18.4 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.4" r="2.3" />
  </svg>
);

export const IconClock = (p: IP) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 7.4V12l3.2 2" />
  </svg>
);

/* ---------------- Rotating circular stamp ---------------- */

export function CircularStamp({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const id = useRef(`stamp-${Math.random().toString(36).slice(2, 8)}`).current;
  return (
    <div className={`spin-slow ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path
            id={id}
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
          />
        </defs>
        <circle
          cx="60"
          cy="60"
          r="58"
          fill={dark ? "#7A0813" : "#D81224"}
        />
        <circle
          cx="60"
          cy="60"
          r="44"
          fill="none"
          stroke={dark ? "#F59E0B" : "#FFFFFF"}
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <text
          fontSize="11.5"
          fontFamily="IBM Plex Mono, monospace"
          fontWeight="600"
          letterSpacing="2.6"
          fill={dark ? "#F59E0B" : "#FFFFFF"}
        >
          <textPath href={`#${id}`}>
            SAPEKA • DESDE 1990 • MODA &amp; CASA •
          </textPath>
        </text>
        <g transform="translate(60 60)">
          <path
            d="M0-9a4 4 0 1 1 4 4c-2 0-3.2 1.3-3.2 3.2v1.3L-9.4 7.6a2.7 2.7 0 0 0 1.6 5.2h15.6a2.7 2.7 0 0 0 1.6-5.2L1 1.2"
            fill="none"
            stroke={dark ? "#F59E0B" : "#FFFFFF"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="scale(0.9) translate(0 2)"
          />
        </g>
      </svg>
    </div>
  );
}

/* ---------------- Barcode decoration ---------------- */

export function Barcode({ className = "" }: { className?: string }) {
  const bars = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 2, 4, 1, 2, 1, 3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 1, 1, 4, 2, 1];
  let x = 0;
  return (
    <svg className={className} viewBox="0 0 120 34" aria-hidden="true">
      {bars.map((w, i) => {
        const rect = (
          <rect
            key={i}
            x={x}
            y={0}
            width={w}
            height={26}
            fill="currentColor"
          />
        );
        x += w + 2;
        return rect;
      })}
      <text
        x="0"
        y="33"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="7.5"
        fill="currentColor"
        letterSpacing="4"
      >
        1990·SAPEKA·BR
      </text>
    </svg>
  );
}
