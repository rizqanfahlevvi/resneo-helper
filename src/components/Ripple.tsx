import React, { useState, useLayoutEffect, MouseEvent } from 'react';

export function useRipple() {
  const [ripples, setRipples] = useState<React.CSSProperties[]>([]);

  useLayoutEffect(() => {
    let bounce: number;
    if (ripples.length > 0) {
      bounce = window.setTimeout(() => {
        setRipples([]);
      }, 600);
    }
    return () => window.clearTimeout(bounce);
  }, [ripples.length]);

  const addRipple = (event: MouseEvent<HTMLElement>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rippleContainer.width, rippleContainer.height);
    const x = event.clientX - rippleContainer.left - size / 2;
    const y = event.clientY - rippleContainer.top - size / 2;
    const newRipple = {
      left: x + 'px',
      top: y + 'px',
      width: size + 'px',
      height: size + 'px',
      backgroundColor: 'currentColor',
    };
    setRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  const ripplesContainer = ripples.length > 0 ? (
    <span className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
      {ripples.map((style, i) => (
        <span
          key={i}
          className="absolute rounded-full pointer-events-none animate-ripple opacity-20"
          style={{ ...style, transform: 'scale(0)' }}
        />
      ))}
    </span>
  ) : null;

  return { addRipple, ripplesContainer };
}
