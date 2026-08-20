import React, { useRef, useState, useCallback, useEffect } from 'react';
import './AccordionGallery.css';

interface Panel {
  id:      string;
  image:   string;
  label:   string;
  href?:   string;
}

interface AccordionGalleryProps {
  panels:         Panel[];
  height?:        number;
  expandedFlex?:  number;
  collapsedFlex?: number;
  vertical?:      boolean;
  transition?:    string;
}

export const AccordionGallery: React.FC<AccordionGalleryProps> = ({
  panels,
  height        = 480,
  expandedFlex  = 4,
  collapsedFlex = 1,
  vertical      = false,
  transition    = 'flex-grow 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)',
}) => {
  const [active, setActive] = useState<string | null>(null);
  const containerRef        = useRef<HTMLDivElement>(null);

  const activate   = useCallback((id: string) => setActive(id), []);
  const deactivate = useCallback(() => setActive(null), []);

  // Keyboard navigation
  const onKeyDown = useCallback((e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(id); }
  }, [activate]);

  useEffect(() => {
    // Reset when clicking outside
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        deactivate();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [deactivate]);

  return (
    <div
      ref={containerRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}`}
      style={{ height: vertical ? 'auto' : height }}
      onMouseLeave={deactivate}
    >
      {panels.map(panel => {
        const isActive = active === panel.id;
        const Tag      = panel.href ? 'a' : 'div';
        return (
          <Tag
            key={panel.id}
            className="ag-panel"
            href={panel.href}
            tabIndex={0}
            role="button"
            aria-label={panel.label}
            aria-expanded={isActive}
            style={{
              flexGrow: isActive ? expandedFlex : collapsedFlex,
              transition,
            }}
            onMouseEnter={() => activate(panel.id)}
            onFocus={() => activate(panel.id)}
            onBlur={deactivate}
            onKeyDown={e => onKeyDown(e, panel.id)}
          >
            {/* Frame */}
            <div className="ag-panel__frame">

              {/* Media — slides and un-grayscales on activate */}
              <div
                className="ag-panel__media"
                style={{
                  transform: isActive
                    ? 'translate(-50%, -50%)'
                    : `translate(calc(-50% + ${vertical ? '0px' : '24px'}), calc(-50% + ${vertical ? '24px' : '0px'}))`,
                  filter: `grayscale(${isActive ? 0 : 1}) brightness(${isActive ? 1 : 0.7})`,
                  transition: `transform 0.55s cubic-bezier(0.4,0,0.2,1), filter 0.55s ease`,
                  width:  vertical ? '100%' : undefined,
                  height: vertical ? undefined : '100%',
                }}
              >
                <img src={panel.image} alt={panel.label} draggable={false} />
              </div>

              {/* Overlay */}
              <div className="ag-panel__overlay" />

              {/* Label */}
              <div className="ag-panel__label">
                <div
                  className="ag-panel__bar"
                  style={{
                    opacity:    isActive ? 1 : 0,
                    transition: 'opacity 0.3s ease 0.1s',
                  }}
                />
                <span
                  className="ag-panel__text"
                  style={{
                    opacity:    isActive ? 1 : 0,
                    transition: 'opacity 0.3s ease 0.15s',
                  }}
                >
                  {panel.label}
                </span>
              </div>

            </div>
          </Tag>
        );
      })}
    </div>
  );
};
