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

export function useCountUp(end: number, start: boolean, duration = 1400) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
          fill={dark ? "#0F3D2E" : "#E8A93B"}
        />
        <circle
          cx="60"
          cy="60"
          r="44"
          fill="none"
          stroke={dark ? "#E8A93B" : "#0F3D2E"}
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <text
          fontSize="11.5"
          fontFamily="IBM Plex Mono, monospace"
          fontWeight="600"
          letterSpacing="2.6"
          fill={dark ? "#E8A93B" : "#0F3D2E"}
        >
          <textPath href={`#${id}`}>
            SAPEKA • DESDE 1990 • MODA &amp; CASA •
          </textPath>
        </text>
        <g transform="translate(60 60)">
          <path
            d="M0-9a4 4 0 1 1 4 4c-2 0-3.2 1.3-3.2 3.2v1.3L-9.4 7.6a2.7 2.7 0 0 0 1.6 5.2h15.6a2.7 2.7 0 0 0 1.6-5.2L1 1.2"
            fill="none"
            stroke={dark ? "#E8A93B" : "#0F3D2E"}
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
