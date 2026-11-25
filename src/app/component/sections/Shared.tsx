import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Product } from "../../data/data";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return <Icon aria-hidden="true" size={14} strokeWidth={1.75} />;
}

export type ProductIllustrationView = "front" | "angle" | "detail";

export function ProductIllustration({
  tone,
  view = "front",
}: {
  tone: Product["tone"];
  view?: ProductIllustrationView;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`product-ac product-ac--${tone} product-ac--${view}`}
      viewBox="0 0 300 150"
      fill="none"
    >
      {view === "front" && (
        <>
          <path
            d="M37 37c0-9 7-16 16-16h194c9 0 16 7 16 16v66c0 8-6 14-14 14H51c-8 0-14-6-14-14V37Z"
            fill="#FDFEFE"
            stroke="#C9D2D1"
            strokeWidth="3"
          />
          <path d="M48 33h204" stroke="#E8ECEB" strokeWidth="3" />
          <path
            d="M54 94h190c-7 11-18 17-34 17H78c-11 0-19-6-24-17Z"
            fill="#E5EAE9"
          />
          <path
            d="M69 94h162"
            stroke="#B5BFBE"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M82 103h136"
            stroke="#CAD1D0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="238" cy="50" r="3" fill="#91A39A" />
          <path d="M62 112h176" stroke="#D3DAD8" strokeWidth="2" />
        </>
      )}
      {view === "angle" && (
        <>
          <path
            d="m43 43 171-17 42 13v63c0 8-6 14-14 14H57c-8 0-14-6-14-14V43Z"
            fill="#FDFEFE"
            stroke="#C9D2D1"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="m214 26 42 13v63c0 7-4 12-10 14l-32-14V26Z"
            fill="#E5EAE9"
            stroke="#C9D2D1"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="m43 43 171-17 42 13-171 18-42-14Z"
            fill="#F7FAF9"
            stroke="#C9D2D1"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="m61 94 160-2" stroke="#B5BFBE" strokeWidth="3" strokeLinecap="round" />
          <path d="m76 103 141-2" stroke="#CAD1D0" strokeWidth="2" strokeLinecap="round" />
          <circle cx="235" cy="52" r="3" fill="#91A39A" />
        </>
      )}
      {view === "detail" && (
        <>
          <rect
            x="30"
            y="28"
            width="240"
            height="94"
            rx="15"
            fill="#FDFEFE"
            stroke="#C9D2D1"
            strokeWidth="3"
          />
          <rect x="49" y="42" width="202" height="22" rx="8" fill="#E8ECEB" />
          <circle cx="231" cy="53" r="4" fill="#91A39A" />
          <path d="M50 79h200" stroke="#B5BFBE" strokeWidth="3" strokeLinecap="round" />
          <path d="M57 89h186" stroke="#CAD1D0" strokeWidth="3" strokeLinecap="round" />
          <path d="M65 99h170" stroke="#D3DAD8" strokeWidth="3" strokeLinecap="round" />
          <path d="M76 109h148" stroke="#D3DAD8" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
