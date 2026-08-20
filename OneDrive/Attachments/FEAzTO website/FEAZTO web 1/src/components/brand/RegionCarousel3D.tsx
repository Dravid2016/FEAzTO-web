import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  tagline: string;
  image: string;
  dishCount: number;
}

interface Props {
  regions: Region[];
}

/* ── Floating particle ─────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const ParticleCanvas: React.FC<{ active: boolean }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);
  const id = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => {
      if (!active) return;
      const x = canvas.width  * (0.2 + Math.random() * 0.6);
      const y = canvas.height * (0.3 + Math.random() * 0.5);
      particles.current.push({
        id: id.current++,
        x, y,
        size:    2 + Math.random() * 3.5,
        opacity: 0,
        vx:      (Math.random() - 0.5) * 0.6,
        vy:      -0.4 - Math.random() * 0.5,
        life:    0,
        maxLife: 90 + Math.random() * 60,
      });
    };

    let spawnTimer = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnTimer++;
      if (spawnTimer % 6 === 0) spawn();

      particles.current = particles.current.filter(p => p.life < p.maxLife);

      for (const p of particles.current) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.maxLife;
        p.opacity = t < 0.2 ? t / 0.2 : t > 0.7 ? (1 - t) / 0.3 : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,184,0,${p.opacity * 0.7})`;
        ctx.fill();

        // Small sparkle cross
        if (p.size > 3) {
          ctx.strokeStyle = `rgba(255,220,100,${p.opacity * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 1.5, p.y);
          ctx.lineTo(p.x + p.size * 1.5, p.y);
          ctx.moveTo(p.x, p.y - p.size * 1.5);
          ctx.lineTo(p.x, p.y + p.size * 1.5);
          ctx.stroke();
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  );
};

/* ── Main carousel ─────────────────────────────────────────── */
export const RegionCarousel3D: React.FC<Props> = ({ regions }) => {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const autoRef   = useRef<ReturnType<typeof setTimeout>>();

  const total = regions.length;

  const goTo = useCallback((idx: number) => {
    setActive(((idx % total) + total) % total);
  }, [total]);

  // Auto-rotate every 3s
  useEffect(() => {
    autoRef.current = setTimeout(() => goTo(active + 1), 3000);
    return () => clearTimeout(autoRef.current);
  }, [active, goTo]);

  const onDragStart = (x: number) => { dragStart.current = x; setDragging(true); };
  const onDragEnd   = (x: number) => {
    if (!dragging) return;
    const delta = dragStart.current - x;
    if (Math.abs(delta) > 40) goTo(active + (delta > 0 ? 1 : -1));
    setDragging(false);
  };

  /* Card style based on position offset from active */
  const getCardStyle = (idx: number): React.CSSProperties => {
    let offset = idx - active;
    if (offset > total / 2)  offset -= total;
    if (offset < -total / 2) offset += total;

    const abs  = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;

    if (abs > 2) return { display: 'none' };

    const tx      = sign * (abs === 0 ? 0 : abs === 1 ? 58 : 105); // % shift
    const tz      = abs === 0 ? 0 : abs === 1 ? -180 : -340;
    const ry      = sign * (abs === 0 ? 0 : abs === 1 ? 28 : 45);
    const scale   = abs === 0 ? 1 : abs === 1 ? 0.82 : 0.65;
    const zIndex  = abs === 0 ? 10 : abs === 1 ? 6 : 3;
    const opacity = abs === 0 ? 1  : abs === 1 ? 0.80 : 0.50;
    const blur    = abs === 0 ? 0  : abs === 1 ? 0 : 2;

    return {
      position:  'absolute',
      left:      '50%',
      top:       '50%',
      transform: `translate(-50%, -50%) translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      zIndex,
      opacity,
      filter:    blur ? `blur(${blur}px)` : undefined,
      transition: dragging ? 'none' : 'all 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
      cursor:    abs === 0 ? 'default' : 'pointer',
      willChange:'transform',
    };
  };

  return (
    <div style={{ position: 'relative', width: '100%', padding: '3rem 0 4rem' }}>

      {/* Particles layer */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <ParticleCanvas active={true} />
      </div>

      {/* Gold glow bar behind carousel */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%', height: '8px',
        background: 'linear-gradient(90deg, transparent, #FFB800, #FFD700, #FFB800, transparent)',
        borderRadius: '9999px',
        filter: 'blur(8px)',
        opacity: 0.6,
        zIndex: 0,
      }} />
      {/* Wide ambient glow */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%', height: '280px',
        background: 'radial-gradient(ellipse at center, rgba(255,184,0,0.12) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* 3D stage */}
      <div
        style={{
          position: 'relative',
          height: '640px',
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
          zIndex: 2,
        }}
        onMouseDown={e => onDragStart(e.clientX)}
        onMouseUp={e => onDragEnd(e.clientX)}
        onMouseLeave={() => setDragging(false)}
        onTouchStart={e => onDragStart(e.touches[0].clientX)}
        onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
      >
        {regions.map((reg, idx) => {
          const style = getCardStyle(idx);
          if (style.display === 'none') return null;

          const isActive = idx === active;
          const offset   = ((idx - active + total) % total + total) % total;
          const realOff  = offset > total / 2 ? offset - total : offset;

          return (
            <div key={reg.id} style={style} onClick={() => !isActive && goTo(idx)}>
              <div style={{
                width: '480px',
                height: '580px',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isActive
                  ? '0 24px 60px rgba(0,0,0,0.35), 0 0 0 2px #FFB800, 0 0 40px rgba(255,184,0,0.35)'
                  : '0 12px 32px rgba(0,0,0,0.22)',
                transition: 'box-shadow 0.55s ease',
              }}>
                <img
                  src={reg.image}
                  alt={reg.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  draggable={false}
                />
                {/* Dark gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 55%)',
                }} />

                {/* Active card gold top bar */}
                {isActive && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: 'linear-gradient(90deg, #FFB800, #FFD700, #FFB800)',
                  }} />
                )}

                {/* Card content */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '2rem',
                }}>
                  <div style={{
                    fontSize: '0.75rem', fontWeight: 800,
                    color: '#FFB800', letterSpacing: '0.14em',
                    textTransform: 'uppercase', marginBottom: '0.5rem',
                  }}>{reg.tagline}</div>
                  <h3 style={{
                    fontFamily: 'var(--fz-font-display)',
                    fontSize: '3rem', color: '#FFFFFF',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    lineHeight: 1, marginBottom: '0.5rem',
                  }}>{reg.name}</h3>
                  <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginBottom: isActive ? '1.5rem' : 0 }}>
                    {reg.dishCount} dishes
                  </div>
                  {isActive && (
                    <Link
                      to={`/regions/${reg.id}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.75rem 1.75rem',
                        background: '#FFB800', color: '#0D0D0D',
                        borderRadius: '9999px',
                        fontSize: '1rem', fontWeight: 800,
                        textDecoration: 'none',
                        transition: 'all 150ms',
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      Explore <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.5rem', position: 'relative', zIndex: 3 }}>
        {regions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to ${regions[idx].name}`}
            style={{
              width: idx === active ? '28px' : '8px',
              height: '8px',
              borderRadius: '9999px',
              background: idx === active ? '#FFB800' : '#D4C5A9',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 300ms ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
