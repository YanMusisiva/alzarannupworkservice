import type { SVGProps } from 'react';

export function AnnLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 40"
      width="160"
      height="40"
      {...props}
    >
      <text
        x="0"
        y="30"
        fontFamily="'PT Sans', sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="currentColor"
        className="text-primary"
      >
        ANN
      </text>
      <text
        x="75"
        y="28"
        fontFamily="'PT Sans', sans-serif"
        fontSize="18"
        fill="currentColor"
        className="text-foreground"
      >
        Local Buzz
      </text>
    </svg>
  );
}
