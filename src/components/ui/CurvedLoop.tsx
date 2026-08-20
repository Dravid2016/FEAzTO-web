import { useEffect, useRef, useState } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?:       number;
  curveAmount?: number;
  direction?:   'left' | 'right';
  interactive?: boolean;
  className?:   string;
}

export default function CurvedLoop({
  marqueeText = 'FOOD ✦ CULTURE ✦ CONNECTION ✦ FLAVOURS ✦ STORIES ✦ ',
  speed       = 1.5,
  curveAmount = 220,
  direction   = 'left',
  interactive = true,
  className   = '',
}: CurvedLoopProps) {
  const textRef    = useRef<SVGTextPathElement>(null);
  const jacketRef  = useRef<HTMLDivElement>(null);
  const offsetRef  = useRef(0);
  const rafRef     = useRef<number>(0);
  const dragRef    = useRef({ active: false, startX: 0, startOffset: 0 });
  const [dragging, setDragging] = useState(false);

  // Repeat text enough to fill the loop seamlessly
  const repeated = marqueeText.repeat(6);

  useEffect(() => {
    const dir = direction === 'left' ? -1 : 1;

    const animate = () => {
      if (!dragRef.current.active) {
        offsetRef.current += speed * dir;
      }
      if (textRef.current) {
        textRef.current.setAttribute('startOffset', `${offsetRef.current % 100}%`);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, direction]);

  // Drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    offsetRef.current = dragRef.current.startOffset + dx * 0.15;
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
    setDragging(false);
  };

  // SVG path — a smooth upward arc across the viewport
  const W = 1440;
  const H = 130;
  const mid = H / 2;
  const path = `M0,${mid + curveAmount / 2} Q${W / 2},${mid - curveAmount / 2} ${W},${mid + curveAmount / 2}`;

  return (
    <div
      ref={jacketRef}
      className={`curved-loop-jacket feazto-curved-loop ${dragging ? 'is-dragging' : ''} ${className}`.trim()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ userSelect: 'none' }}
    >
      <svg
        className="curved-loop-svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '100%', width: '100%' }}
      >
        <defs>
          <path id="feazto-curve" d={path} />
          {/* Subtle gold glow filter */}
          <filter id="feazto-glow" x="-5%" y="-40%" width="110%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <text
          fontFamily="'Bangers', 'Anton', Impact, sans-serif"
          fontSize="28"
          fontWeight="400"
          letterSpacing="4"
          textTransform="uppercase"
          fill="#FFFFFF"
          filter="url(#feazto-glow)"
          style={{ textTransform: 'uppercase' }}
        >
          <textPath
            ref={textRef}
            href="#feazto-curve"
            startOffset="0%"
          >
            {repeated}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
