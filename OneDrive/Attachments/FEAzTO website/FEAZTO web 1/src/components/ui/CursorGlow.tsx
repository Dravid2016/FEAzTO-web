import React, { useEffect, useRef } from 'react';

/**
 * CursorGlow — smooth gold glow that follows the mouse.
 * position:absolute — scoped to its parent (needs position:relative + overflow:hidden).
 */
export const CursorGlow: React.FC = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -999, y: -999 });
  const raf     = useRef<number>(0);
  const alive   = useRef(true);

  useEffect(() => {
    alive.current = true;

    const onMove = (e: MouseEvent) => {
      const rect = blobRef.current?.parentElement?.getBoundingClientRect();
      if (!rect) return;
      pos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let cx = -999, cy = -999;

    const tick = () => {
      if (!alive.current) return;
      cx = lerp(cx, pos.current.x, 0.09);
      cy = lerp(cy, pos.current.y, 0.09);
      if (blobRef.current)
        blobRef.current.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      alive.current = false;
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}
    >
      <div ref={blobRef} style={{
        position: 'absolute', top: 0, left: 0,
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle at center, rgba(255,184,0,0.22) 0%, rgba(255,210,0,0.09) 38%, transparent 65%)',
        willChange: 'transform',
      }} />
    </div>
  );
};
