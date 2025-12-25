import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Configure smooth scrolling defaults
gsap.defaults({
  ease: "power3.out",
  duration: 1,
});

interface ScrollAnimationOptions {
  trigger?: RefObject<HTMLElement>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
}

// Fade up animation
export const useFadeUp = (
  ref: RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: options.trigger?.current || ref.current,
            start: options.start || "top 85%",
            end: options.end || "top 50%",
            toggleActions: options.toggleActions || "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, options]);
};

// Fade in from left
export const useFadeLeft = (
  ref: RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: options.trigger?.current || ref.current,
            start: options.start || "top 85%",
            toggleActions: options.toggleActions || "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, options]);
};

// Fade in from right
export const useFadeRight = (
  ref: RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: options.trigger?.current || ref.current,
            start: options.start || "top 85%",
            toggleActions: options.toggleActions || "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, options]);
};

// Scale in animation
export const useScaleIn = (
  ref: RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: options.trigger?.current || ref.current,
            start: options.start || "top 85%",
            toggleActions: options.toggleActions || "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, options]);
};

// Stagger children animation
export const useStaggerChildren = (
  containerRef: RefObject<HTMLElement>,
  childSelector: string,
  options: ScrollAnimationOptions & { stagger?: number; fromY?: number; fromX?: number } = {}
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { 
          y: options.fromY ?? 50, 
          x: options.fromX ?? 0,
          opacity: 0 
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: options.stagger || 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start || "top 85%",
            toggleActions: options.toggleActions || "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [containerRef, childSelector, options]);
};

// Parallax effect
export const useParallax = (
  ref: RefObject<HTMLElement>,
  speed: number = 0.5,
  options: ScrollAnimationOptions = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: options.trigger?.current || ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [ref, speed, options]);
};

// Width animation (for dividers)
export const useWidthAnimation = (
  ref: RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { width: 0, opacity: 0 },
        {
          width: "100%",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: options.trigger?.current || ref.current,
            start: options.start || "top 90%",
            toggleActions: options.toggleActions || "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, options]);
};

// Custom scroll animation hook
export const useScrollAnimation = (sectionRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate all elements with data-animate attribute
      const elements = sectionRef.current?.querySelectorAll("[data-animate]");
      
      elements?.forEach((el) => {
        const animationType = el.getAttribute("data-animate");
        const delay = parseFloat(el.getAttribute("data-delay") || "0");
        const duration = parseFloat(el.getAttribute("data-duration") || "1");

        let fromVars: gsap.TweenVars = { opacity: 0 };
        let toVars: gsap.TweenVars = { opacity: 1, duration, delay };

        switch (animationType) {
          case "fade-up":
            fromVars = { ...fromVars, y: 60 };
            toVars = { ...toVars, y: 0 };
            break;
          case "fade-down":
            fromVars = { ...fromVars, y: -60 };
            toVars = { ...toVars, y: 0 };
            break;
          case "fade-left":
            fromVars = { ...fromVars, x: -80 };
            toVars = { ...toVars, x: 0 };
            break;
          case "fade-right":
            fromVars = { ...fromVars, x: 80 };
            toVars = { ...toVars, x: 0 };
            break;
          case "scale":
            fromVars = { ...fromVars, scale: 0.8 };
            toVars = { ...toVars, scale: 1, ease: "back.out(1.7)" };
            break;
          case "rotate":
            fromVars = { ...fromVars, rotation: -10, scale: 0.9 };
            toVars = { ...toVars, rotation: 0, scale: 1 };
            break;
        }

        gsap.fromTo(el, fromVars, {
          ...toVars,
          ease: toVars.ease || "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
};

export default useScrollAnimation;
