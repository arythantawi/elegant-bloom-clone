import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import floral1 from "@/assets/floral-1.png";
import floral2 from "@/assets/floral-2.png";
import floral3 from "@/assets/floral-3.png";
import floral4 from "@/assets/floral-4.png";

interface FloralDecorationProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right";
  className?: string;
  size?: "sm" | "md" | "lg";
  enableParallax?: boolean;
  parallaxSpeed?: number;
  variant?: 1 | 2 | 3 | 4;
}

const FloralDecoration = ({
  position,
  className = "",
  size = "md",
  enableParallax = true,
  parallaxSpeed,
  variant
}: FloralDecorationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const sizeClasses = {
    sm: "w-24 h-24 md:w-32 md:h-32",
    md: "w-32 h-32 md:w-48 md:h-48",
    lg: "w-48 h-48 md:w-64 md:h-64"
  };

  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "left": "top-1/2 -translate-y-1/2 left-0",
    "right": "top-1/2 -translate-y-1/2 right-0"
  };

  const baseTransforms = {
    "top-left": "",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1)",
    "left": "scaleX(-1)",
    "right": ""
  };

  // Select floral image based on variant or position
  const getFloralImage = () => {
    if (variant) {
      switch (variant) {
        case 1: return floral1;
        case 2: return floral2;
        case 3: return floral3;
        case 4: return floral4;
      }
    }
    // Default assignment based on position
    switch (position) {
      case "top-left": return floral1;
      case "top-right": return floral2;
      case "bottom-left": return floral3;
      case "bottom-right": return floral4;
      case "left": return floral1;
      case "right": return floral2;
      default: return floral1;
    }
  };

  const currentImage = getFloralImage();

  useEffect(() => {
    if (!imageRef.current) return;

    const intensity = position === "top-left" || position === "bottom-right" ? 1 : 0.8;

    const ctx = gsap.context(() => {
      // Sway animation using GSAP
      gsap.to(imageRef.current, {
        rotation: 2 * intensity,
        x: 3 * intensity,
        duration: 2.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, [position]);

  return (
    <div
      ref={containerRef}
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none z-0 ${className}`}
      style={{ transform: baseTransforms[position] }}
    >
      <img
        ref={imageRef}
        src={currentImage}
        alt="Floral decoration"
        className="w-full h-full object-contain"
        style={{ transformOrigin: 'bottom center' }}
      />
    </div>
  );
};

export default FloralDecoration;
