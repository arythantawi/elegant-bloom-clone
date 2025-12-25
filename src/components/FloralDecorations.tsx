import React from "react";
import floralSide4 from "@/assets/floral-side-4.png";
import floral5 from "@/assets/floral-5.png";
import floralSide5 from "@/assets/floral-side-5.png";
import floral6 from "@/assets/floral-6.png";
import floralExposure from "@/assets/floral-exposure.png";
import goldenFloral from "@/assets/golden-floral.png";
import floralSide6 from "@/assets/floral-side-6.png";
import floral7 from "@/assets/floral-7.png";

interface FloralImageProps {
  src: string;
  alt?: string;
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right" | "center";
  size?: "sm" | "md" | "lg" | "xl";
}

const FloralImage = ({
  src,
  alt = "Floral decoration",
  className = "",
  position = "center",
  size = "md",
}: FloralImageProps) => {
  const sizeClasses = {
    sm: "w-16 h-16 md:w-24 md:h-24",
    md: "w-24 h-24 md:w-36 md:h-36",
    lg: "w-36 h-36 md:w-48 md:h-48",
    xl: "w-48 h-48 md:w-64 md:h-64",
  };

  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "left": "top-1/2 -translate-y-1/2 left-0",
    "right": "top-1/2 -translate-y-1/2 right-0",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none z-0 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain animate-sway"
        style={{ transformOrigin: "bottom center" }}
      />
    </div>
  );
};

// Export individual floral images
export const FloralSide4 = (props: Omit<FloralImageProps, "src">) => (
  <FloralImage src={floralSide4} {...props} />
);

export const Floral5 = (props: Omit<FloralImageProps, "src">) => (
  <FloralImage src={floral5} {...props} />
);

export const FloralSide5 = (props: Omit<FloralImageProps, "src">) => (
  <FloralImage src={floralSide5} {...props} />
);

export const Floral6 = (props: Omit<FloralImageProps, "src">) => (
  <FloralImage src={floral6} {...props} />
);

export const FloralExposure = (props: Omit<FloralImageProps, "src">) => (
  <FloralImage src={floralExposure} {...props} />
);

export const GoldenFloral = (props: Omit<FloralImageProps, "src">) => (
  <FloralImage src={goldenFloral} {...props} />
);

export const FloralSide6 = (props: Omit<FloralImageProps, "src">) => (
  <FloralImage src={floralSide6} {...props} />
);

export const Floral7 = (props: Omit<FloralImageProps, "src">) => (
  <FloralImage src={floral7} {...props} />
);

// Export all images for convenience
export const floralImages = {
  floralSide4,
  floral5,
  floralSide5,
  floral6,
  floralExposure,
  goldenFloral,
  floralSide6,
  floral7,
};

export default FloralImage;
