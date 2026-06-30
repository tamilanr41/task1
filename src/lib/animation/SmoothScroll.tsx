'use client';
import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function SmoothScroll({ children }: Props) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let lenis: any;

    const init = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        lenis = new Lenis({
          lerp: 0.08,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        });

        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
        lenisRef.current = lenis;
      } catch {}
    };

    init();
    return () => lenis?.destroy();
  }, []);

  return <>{children}</>;
}
