/**
 * InvertedMarquee — snake wave SVG text rail
 * Uses mix-blend-mode: difference with white fill:
 *   → white text on dark background = stays WHITE
 *   → white text on light/white background = becomes BLACK
 * Auto-adapts as text physically crosses the section boundary.
 */
import React from 'react';
import './InvertedMarquee.css';

interface InvertedMarqueeProps {
  items?:     string[];
  speed?:     'slow' | 'medium' | 'fast' | string;
  separator?: string;
  className?: string;
  height?:    number;
  amplitude?: number;
}

const SPEED_MAP: Record<string, string> = {
  slow:   '34s',
  medium: '20s',
  fast:   '12s',
};

function buildWavePath(w: number, midY: number, amp: number, cycles: number): string {
  const steps = 300;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * w;
    const y = midY + amp * Math.sin((i / steps) * cycles * 2 * Math.PI);
    pts.push(i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : `L${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(' ');
}

const InvertedMarquee: React.FC<InvertedMarqueeProps> = ({
  items     = ['CULTURE', 'CONNECTION', 'FLAVOURS', 'FOOD', 'STORIES', 'HERITAGE', 'AMMAS & PAATIS'],
  speed     = 'slow',
  separator = '✦',
  className = '',
  height    = 110,
  amplitude = 28,
}) => {
  const duration = SPEED_MAP[speed] ?? speed;
  const svgW     = 3200;
  const total    = svgW * 2;
  const midY     = height / 2;

  const wavePath = buildWavePath(svgW, midY, amplitude, 3);

  // Single flat text string — repeated to fill the path length
  const content  = items.map(i => `${i}  ${separator}  `).join('').repeat(5);

  return (
    <div
      className={`inverted-marquee ${className}`.trim()}
      style={{
        height,
        '--marquee-duration': duration,
        /* isolation:isolate ensures blend mode reacts to content BELOW this element */
        isolation: 'isolate',
        overflow:  'hidden',
        width:     '100%',
        maxWidth:  '100vw',
      } as React.CSSProperties}
      aria-hidden="true"
      role="presentation"
    >
      <svg
        viewBox={`0 0 ${total} ${height}`}
        preserveAspectRatio="xMinYMid meet"
        style={{ display: 'block', width: '200%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <path id="im-wave" d={wavePath} />
        </defs>

        {/* Animated group — translate(-50%) = one copy width = seamless */}
        <g style={{ animation: `snake-scroll ${duration} linear infinite`, willChange: 'transform' }}>

          {/* Copy 1 */}
          <text
            fontFamily="'Bangers', 'Anton', Impact, sans-serif"
            fontSize="28"
            letterSpacing="4"
            textTransform="uppercase"
            fill="#FFFFFF"
            style={{ mixBlendMode: 'difference' }}
          >
            <textPath href="#im-wave" startOffset="0%">
              {content}
            </textPath>
          </text>

          {/* Copy 2 — offset by one copy width */}
          <text
            fontFamily="'Bangers', 'Anton', Impact, sans-serif"
            fontSize="28"
            letterSpacing="4"
            textTransform="uppercase"
            fill="#FFFFFF"
            transform={`translate(${svgW}, 0)`}
            style={{ mixBlendMode: 'difference' }}
          >
            <textPath href="#im-wave" startOffset="0%">
              {content}
            </textPath>
          </text>

        </g>
      </svg>
    </div>
  );
};

export default InvertedMarquee;
