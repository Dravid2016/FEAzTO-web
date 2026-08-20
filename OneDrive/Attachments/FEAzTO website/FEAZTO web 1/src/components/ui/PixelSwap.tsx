import { useEffect, useRef, useState, useCallback } from 'react';
import './PixelSwap.css';

type Pattern = 'random' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'edges';
type Trigger = 'click' | 'hover';

interface PixelSwapProps {
  firstContent:   React.ReactNode;
  secondContent:  React.ReactNode;
  pixelSize?:     number;
  gap?:           number;
  pixelRadius?:   number;
  pixelSpin?:     number;
  pixelScale?:    number;
  duration?:      number;
  pixelDuration?: number;
  pattern?:       Pattern;
  randomness?:    number;
  fade?:          boolean;
  trigger?:       Trigger;
  className?:     string;
  style?:         React.CSSProperties;
}

interface Pixel {
  id: number;
  x:  number;
  y:  number;
  delay: number; // 0..1 normalised
}

function buildGrid(w: number, h: number, size: number, gap: number, pattern: Pattern, randomness: number): Pixel[] {
  const cols = Math.ceil(w / (size + gap));
  const rows = Math.ceil(h / (size + gap));
  const raw: Pixel[] = [];
  let id = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let base = 0;
      switch (pattern) {
        case 'random':       base = Math.random(); break;
        case 'top-left':     base = (c + r) / (cols + rows); break;
        case 'top-right':    base = ((cols - c) + r) / (cols + rows); break;
        case 'bottom-left':  base = (c + (rows - r)) / (cols + rows); break;
        case 'bottom-right': base = ((cols - c) + (rows - r)) / (cols + rows); break;
        case 'center': { const dx = c/cols-0.5, dy = r/rows-0.5; base = 1-Math.sqrt(dx*dx+dy*dy)*2; break; }
        case 'edges':  { const dx = c/cols-0.5, dy = r/rows-0.5; base = Math.sqrt(dx*dx+dy*dy)*2; break; }
      }
      base += (Math.random() - 0.5) * randomness;
      raw.push({ id: id++, x: c * (size + gap), y: r * (size + gap), delay: base });
    }
  }
  // normalise
  const min = Math.min(...raw.map(p => p.delay));
  const max = Math.max(...raw.map(p => p.delay));
  const range = max - min || 1;
  return raw.map(p => ({ ...p, delay: (p.delay - min) / range }));
}

export default function PixelSwap({
  firstContent,
  secondContent,
  pixelSize     = 64,
  gap           = 0,
  pixelRadius   = 4,
  pixelSpin     = 45,
  pixelScale    = 0.35,
  duration      = 1400,
  pixelDuration = 450,
  pattern       = 'random',
  randomness    = 0.4,
  trigger       = 'click',
  className     = '',
  style         = {},
}: PixelSwapProps) {
  const containerRef              = useRef<HTMLDivElement>(null);
  const [pixels, setPixels]       = useState<Pixel[]>([]);
  const [animating, setAnimating] = useState(false);
  const [shown, setShown]         = useState<0 | 1>(0); // which panel is currently visible
  const timerRef                  = useRef<ReturnType<typeof setTimeout>>();

  // Rebuild pixel grid
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rebuild = () => {
      setPixels(buildGrid(el.offsetWidth, el.offsetHeight, pixelSize, gap, pattern, randomness));
    };
    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pixelSize, gap, pattern, randomness]);

  const swap = useCallback(() => {
    if (animating) return;
    clearTimeout(timerRef.current);
    setAnimating(true);
    // Switch shown panel exactly at the halfway point of the animation
    const halfway = duration * 0.5;
    timerRef.current = setTimeout(() => setShown(s => s === 0 ? 1 : 0), halfway);
    setTimeout(() => setAnimating(false), duration);
  }, [animating, duration]);

  const handlers = trigger === 'click' ? { onClick: swap } : { onMouseEnter: swap };

  return (
    <div
      ref={containerRef}
      className={`pixel-swap ${className}`}
      style={{ ...style, cursor: 'pointer' }}
      {...handlers}
    >
      {/* Layer 0 — firstContent */}
      <div className={`pixel-swap__layer ${shown === 0 ? 'pixel-swap__layer--visible' : 'pixel-swap__layer--hidden'}`}>
        {firstContent}
      </div>

      {/* Layer 1 — secondContent */}
      <div className={`pixel-swap__layer ${shown === 1 ? 'pixel-swap__layer--visible' : 'pixel-swap__layer--hidden'}`}>
        {secondContent}
      </div>

      {/* Pixel burst overlay */}
      {animating && (
        <div className="pixel-swap__pixels" aria-hidden="true">
          {pixels.map(p => {
            const staggerMs = p.delay * (duration - pixelDuration);
            return (
              <div
                key={p.id}
                className="pixel-swap__pixel"
                style={{
                  left:              p.x,
                  top:               p.y,
                  width:             pixelSize - gap,
                  height:            pixelSize - gap,
                  borderRadius:      pixelRadius,
                  animationDelay:    `${staggerMs}ms`,
                  animationDuration: `${pixelDuration}ms`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
