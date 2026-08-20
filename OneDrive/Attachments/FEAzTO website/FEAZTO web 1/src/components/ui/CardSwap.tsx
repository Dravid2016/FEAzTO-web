import React, { useEffect, useRef, Children, isValidElement } from 'react';
import { gsap } from 'gsap';
import './CardSwap.css';

interface CardSwapProps {
  width?:           number;
  height?:          number;
  cardDistance?:    number;
  verticalDistance?:number;
  delay?:           number;
  pauseOnHover?:    boolean;
  skewAmount?:      number;
  easing?:          'elastic' | 'power';
  children:         React.ReactNode;
}

function makeSlot(i: number, distX: number, distY: number, total: number) {
  return { x: i * distX, y: -i * distY, z: -i * distX * 1.5, zIndex: total - i };
}

export const CardSwap: React.FC<CardSwapProps> = ({
  width           = 320,
  height          = 220,
  cardDistance    = 60,
  verticalDistance = 70,
  delay           = 5000,
  pauseOnHover    = false,
  skewAmount      = 6,
  easing          = 'elastic',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orderRef     = useRef<number[]>([]);
  const tlRef        = useRef<gsap.core.Timeline | null>(null);
  const intervalRef  = useRef<ReturnType<typeof setInterval>>();

  const config = easing === 'elastic'
    ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
    : { ease: 'power1.inOut',         durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(':scope > .card'));
    if (cards.length < 2) return;

    orderRef.current = cards.map((_, i) => i);

    // Initial placement
    cards.forEach((card, i) => {
      const slot = makeSlot(i, cardDistance, verticalDistance, cards.length);
      gsap.set(card, {
        x: slot.x, y: slot.y, z: slot.z,
        xPercent: -50, yPercent: -50,
        skewY: skewAmount,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true,
      });
    });

    const swap = () => {
      const order = orderRef.current;
      if (order.length < 2) return;
      const front    = order[0];
      const rest     = order.slice(1);
      const elFront  = cards[front];

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, { y: '+=500', duration: config.durDrop, ease: config.ease });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el   = cards[idx];
        const slot = makeSlot(i, cardDistance, verticalDistance, cards.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
      });

      const backSlot = makeSlot(cards.length - 1, cardDistance, verticalDistance, cards.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, 'return');
      tl.call(() => { orderRef.current = rest.concat([front]); });
    };

    swap();
    intervalRef.current = setInterval(swap, delay);

    const pause  = () => { tlRef.current?.pause(); clearInterval(intervalRef.current); };
    const resume = () => { tlRef.current?.play(); intervalRef.current = setInterval(swap, delay); };

    if (pauseOnHover) {
      container.addEventListener('mouseenter', pause);
      container.addEventListener('mouseleave', resume);
    }

    return () => {
      clearInterval(intervalRef.current);
      tlRef.current?.kill();
      if (pauseOnHover) {
        container.removeEventListener('mouseenter', pause);
        container.removeEventListener('mouseleave', resume);
      }
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const validCards = Children.toArray(children).filter(isValidElement);

  return (
    <div
      ref={containerRef}
      className="card-swap-container"
      style={{ width, height }}
    >
      {validCards.map((child, i) => (
        <div key={i} className="card" style={{ width, height }}>
          {child}
        </div>
      ))}
    </div>
  );
};
