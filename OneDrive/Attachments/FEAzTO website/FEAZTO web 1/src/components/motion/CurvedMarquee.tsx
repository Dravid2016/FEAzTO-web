/**
 * CurvedMarquee v5 — FINAL FIX
 * - Single textPath per layer (no overlap from two copies)
 * - Text is repeated enough to fill the full path so no gaps
 * - startOffset goes from 0% → -50% (moves one "copy" length)
 *   then wraps — seamless because path has 2× the content needed
 * - wrapper overflow: visible so curve isn't clipped
 * - black on cream (top), white on dark (bottom)
 */
import React, { useRef, useEffect } from 'react';

interface CurvedMarqueeProps {
  items?:     string[];
  separator?: string;
  speed?:     number;
  height?:    number;
}

const CurvedMarquee: React.FC<CurvedMarqueeProps> = ({
  items     = ['CULTURE','CONNECTION','FLAVOURS','FOOD','STORIES','HERITAGE','AMMAS & PAATIS'],
  separator = '◆',
  speed     = 6,
  height    = 160,
}) => {
  const darkRef  = useRef<SVGTextPathElement>(null);
  const lightRef = useRef<SVGTextPathElement>(null);
  const rafRef   = useRef<number>(0);
  const pos      = useRef(0);
  const last     = useRef(0);
  const pathLen  = useRef(5000);

  // Measure real path length after mount
  useEffect(() => {
    const el = document.getElementById('cm-v5-path') as SVGPathElement | null;
    if (el) pathLen.current = el.getTotalLength();
  }, [height]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tick = (now: number) => {
      const dt = Math.min((now - last.current) / 1000, 0.05);
      last.current = now;
      const L = pathLen.current;
      pos.current = (pos.current + speed * dt) % L;
      // Animate as % of path length — move backwards (right to left)
      const pct = (-(pos.current / L) * 100).toFixed(4) + '%';
      darkRef.current?.setAttribute('startOffset', pct);
      lightRef.current?.setAttribute('startOffset', pct);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  const VW  = 1600;
  const VH  = height;
  const mid = VH * 0.50; // boundary between cream and dark

  // Asymmetric Bézier — high-left → deep low arc → high-right
  const d = [
    `M ${-VW*0.3},${VH*0.12}`,
    `C ${VW*0.05},${VH*0.12} ${VW*0.28},${VH*0.90} ${VW*0.50},${VH*0.90}`,
    `C ${VW*0.72},${VH*0.90} ${VW*0.90},${VH*0.15} ${VW*1.3},${VH*0.12}`,
  ].join(' ');

  // 20× repetition — more than enough to fill path without gaps
  const text = items.map(w => `${w}  ${separator}  `).join('').repeat(20);

  const font = {
    fontFamily:    "'Bangers','Anton',Impact,sans-serif",
    fontSize:      '30',
    letterSpacing: '4',
  };

  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        position:   'relative',
        width:      '100%',
        height:     `${height}px`,
        flexShrink: 0,
        overflow:   'visible', /* ← NOT hidden — curve must not be clipped */
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox={`${-VW*0.3} 0 ${VW*1.6} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          display:  'block',
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        <defs>
          <path id="cm-v5-path" d={d} />

          {/* Clip to cream zone (top half) */}
          <clipPath id="cm-clip-light">
            <rect x={-VW*0.3} y={0} width={VW*1.6} height={mid + 8} />
          </clipPath>

          {/* Clip to dark zone (bottom half) */}
          <clipPath id="cm-clip-dark">
            <rect x={-VW*0.3} y={mid - 8} width={VW*1.6} height={VH - mid + 8} />
          </clipPath>
        </defs>

        {/* BLACK — clipped to cream/light zone */}
        <g clipPath="url(#cm-clip-light)">
          <text {...font} fill="#0D0D0D">
            <textPath ref={lightRef} href="#cm-v5-path" startOffset="0%">
              {text}
            </textPath>
          </text>
        </g>

        {/* WHITE — clipped to dark zone */}
        <g clipPath="url(#cm-clip-dark)">
          <text {...font} fill="#FFFFFF">
            <textPath ref={darkRef} href="#cm-v5-path" startOffset="0%">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default CurvedMarquee;
