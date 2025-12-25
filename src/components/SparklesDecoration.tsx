import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface SparkleProps {
  className?: string;
  size?: number;
}

const Sparkle = React.forwardRef<SVGSVGElement, SparkleProps>(
  ({ className = "", size = 16 }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-dusty-rose ${className}`}
    >
      <polygon points="12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10" />
    </svg>
  )
);

Sparkle.displayName = "Sparkle";

interface SparklesDecorationProps {
  count?: number;
  className?: string;
}

const SparklesDecoration = ({ count = 5, className = "" }: SparklesDecorationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const positions = [
    { top: "10%", left: "5%", size: 12 },
    { top: "15%", right: "8%", size: 16 },
    { top: "25%", left: "15%", size: 10 },
    { top: "30%", right: "12%", size: 14 },
    { top: "45%", left: "3%", size: 11 },
    { top: "60%", right: "5%", size: 13 },
    { top: "75%", left: "10%", size: 15 },
    { top: "85%", right: "15%", size: 12 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const sparkles = containerRef.current.querySelectorAll('.sparkle-element');

    const ctx = gsap.context(() => {
      sparkles.forEach((sparkle, index) => {
        // Create a continuous sparkle animation
        gsap.to(sparkle, {
          opacity: 0.3,
          scale: 0.7,
          rotation: 180,
          duration: 1.2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.15,
        });
      });
    });

    return () => ctx.revert();
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {positions.slice(0, count).map((pos, index) => (
        <div
          key={index}
          className="absolute opacity-40"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
          }}
        >
          <Sparkle className="sparkle-element" size={pos.size} />
        </div>
      ))}
    </div>
  );
};

export { Sparkle, SparklesDecoration };
export default SparklesDecoration;
