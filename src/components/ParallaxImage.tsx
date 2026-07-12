'use client';

import { useEffect, useRef } from 'react';

interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  scale?: number;
  orientation?: 'up' | 'down';
  delay?: number;
  transition?: string;
}

export default function ParallaxImage({
  src,
  alt = '',
  className = '',
  scale = 1.35,
  orientation = 'up',
  delay = 0,
  transition = 'cubic-bezier(0,0,0,1)',
}: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    // Apply the CSS transition for smooth delay effect
    if (delay > 0) {
      img.style.transition = `transform ${delay}s ${transition}`;
    }

    let rafId = 0;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;

      // Normalized progress: 0 = element enters viewport bottom, 1 = leaves top
      const progress = 1 - rect.bottom / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      // Amount of extra image available for translation: 
      //   scale=1.35 means image is 35% bigger than wrapper → 17.5% room on each side
      const rangeMax = rect.height * (scale - 1) * 0.5;
      const shift = (clamped - 0.5) * rangeMax * 2;
      const dir = orientation === 'up' ? 1 : -1;

      // translate THEN scale so translation is in screen coordinates
      img.style.transform = `translate3d(0, ${shift * dir}px, 0) scale(${scale})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Run once immediately, then on scroll
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(rafId);
    };
  }, [scale, orientation, delay, transition]);

  return (
    <div
      ref={wrapperRef}
      style={{ overflow: 'hidden', width: '100%', height: '100%', display: 'block' }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        style={{ willChange: 'transform', display: 'block' }}
      />
    </div>
  );
}
