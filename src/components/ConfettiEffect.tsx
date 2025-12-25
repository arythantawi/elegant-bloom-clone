import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface ConfettiPiece {
  id: number;
  x: number;
  size: number;
  color: string;
  shape: "circle" | "rectangle" | "heart";
}

interface ConfettiEffectProps {
  isActive: boolean;
}

const ConfettiEffect = ({ isActive }: ConfettiEffectProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = [
    "hsl(327, 89%, 94%)", // blush-pink
    "hsl(321, 81%, 89%)", // soft-rose
    "hsl(315, 74%, 84%)", // warm-blush
    "hsl(315, 74%, 70%)", // accent
    "hsl(10, 100%, 98%)", // cream-white
    "hsl(340, 80%, 85%)", // light pink
    "hsl(45, 100%, 90%)", // gold tint
  ];

  const shapes: ConfettiPiece["shape"][] = ["circle", "rectangle", "heart"];

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = [];
      const pieceCount = 80;

      for (let i = 0; i < pieceCount; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          size: 6 + Math.random() * 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }

      setPieces(newPieces);
    }
  }, [isActive]);

  useEffect(() => {
    if (!containerRef.current || pieces.length === 0) return;

    const ctx = gsap.context(() => {
      const confettiElements = containerRef.current?.querySelectorAll('.confetti-piece');
      if (!confettiElements) return;

      confettiElements.forEach((piece, index) => {
        const randomX = (Math.random() - 0.5) * 150;
        const randomRotation = Math.random() * 720 - 360;
        const randomDuration = 2 + Math.random() * 2;
        const randomDelay = Math.random() * 0.8;

        gsap.fromTo(
          piece,
          {
            y: -20,
            x: 0,
            rotation: 0,
            opacity: 1,
          },
          {
            y: window.innerHeight + 50,
            x: randomX,
            rotation: randomRotation,
            opacity: 0,
            duration: randomDuration,
            delay: randomDelay,
            ease: "power1.in",
          }
        );

        // Add spin animation for 3D effect
        gsap.to(piece.querySelector('.confetti-inner'), {
          rotationY: 360,
          rotationX: 360,
          duration: randomDuration * 0.5,
          delay: randomDelay,
          repeat: 2,
          ease: "linear",
        });
      });

      // Clear confetti after animation
      gsap.delayedCall(4, () => {
        setPieces([]);
      });
    });

    return () => ctx.revert();
  }, [pieces]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[110] overflow-hidden"
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece absolute"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
          }}
        >
          {piece.shape === "circle" && (
            <div
              className="confetti-inner rounded-full"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.shape === "rectangle" && (
            <div
              className="confetti-inner"
              style={{
                width: piece.size * 0.6,
                height: piece.size,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.shape === "heart" && (
            <svg
              viewBox="0 0 24 24"
              className="confetti-inner"
              style={{
                width: piece.size,
                height: piece.size,
                fill: piece.color,
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConfettiEffect;
