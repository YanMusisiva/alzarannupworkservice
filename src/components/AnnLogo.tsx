import type { SVGProps } from 'react';

export function AnnLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 40"
      width="180"
      height="40"
      {...props}
    >
      <text
        x="40"
        y="30"
        fontFamily="'PT Sans', sans-serif"
        fontSize="25"
        fontWeight="bold"
        fill="currentColor"
        className="fill-foreground"
      >
        ALZAR
      </text>
      <text
        x="118"
        y="27"
        fontFamily="'PT Sans', sans-serif"
        fontSize="11"
        fill="currentColor"
        className="fill-primary"
      >
        GROUP
      </text>
      <rect x="0" y="4" width="32" height="32" rx="10" className="fill-primary" />
      <path d="M9 27 16 12l7 15M12 22h8" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
