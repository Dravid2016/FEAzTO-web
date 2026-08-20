import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, MapPin, Search, Check,
  Users, Store, Truck, Sprout, ChefHat,
  Calendar, ShieldCheck, Clock,
} from 'lucide-react';
import { SEED_REGIONS } from '../data/seedData';
import { Dish } from '../types';
import { CursorGlow } from '../components/ui/CursorGlow';
import RotatingText from '../components/ui/RotatingText';
import { RegionCarousel3D } from '../components/brand/RegionCarousel3D';
import GradientWaves from '../components/ui/GradientWaves';
import PixelSwap from '../components/ui/PixelSwap';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack/ScrollStack';
import InvertedMarquee from '../components/motion/InvertedMarquee';
import CurvedMarquee from '../components/motion/CurvedMarquee';

interface HomeProps {
  onAddToCart: (dish: Dish) => void;
  cartDishIds: string[];
}


const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="fz-tag">{children}</span>
);

// Catches WebGL / animation crashes silently
class SafeWrap extends Component<{ fallback?: React.ReactNode; children: React.ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? (this.props.fallback ?? null) : this.props.children; }
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  return (
    <div style={{ background: '#FFF8E8', overflowX: 'clip' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* Layer 0 — GradientWaves canvas, fills entire section */}
        <div style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0,
        }}>
          <GradientWaves
            horizonColor="#fff803"
            waveColor="#eae008"
            crestColor="#eadb08"
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1.0}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1.0}
            opacity={1.0}
            mouseInteraction={true}
            parallaxStrength={0.5}
            grain={true}
            grainIntensity={0.05}
          />
        </div>

        {/* Layer 1 — content, always on top */}
        <div style={{
          position: 'relative', zIndex: 10,
          maxWidth: '860px', margin: '0 auto',
          width: '100%', padding: '4rem 1.5rem 5rem',
        }}>

          <div style={{ marginBottom: '1.75rem' }}>
            <Tag>India's #1 Regional Home Kitchen Network</Tag>
          </div>

          <h1 style={{ marginBottom: '2rem' }}>
            <span className="font-display" style={{ display: 'block', fontSize: 'clamp(3.5rem, 9vw, 8rem)', color: '#0D0D0D', lineHeight: 0.9 }}>
              INDIA'S
            </span>
            <span className="font-display" style={{ display: 'block', fontSize: 'clamp(3.5rem, 9vw, 8rem)', color: '#0D0D0D', lineHeight: 0.9 }}>
              REGIONAL
            </span>

            {/* Rotating animated line — fixed height clip box prevents layout jump */}
            <span style={{
              display: 'block',
              height: 'clamp(3.5rem, 9vw, 8rem)',   /* exactly one line tall */
              overflow: 'hidden',                    /* clips the entering/exiting chars */
              lineHeight: 0.9,
            }}>
              <span style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'flex-start' }}>
                <RotatingText
                  texts={['HOME FOOD', 'HERITAGE RECIPES', 'AMMAS & PAATIS', 'HOME KITCHENS', 'AUTHENTIC TASTE']}
                  splitLevelClassName="fz-rt-word"
                  staggerFrom="last"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  staggerDuration={0.025}
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={2200}
                  style={{
                    fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                    color: '#FFB800',
                    lineHeight: 0.9,
                    fontFamily: 'var(--fz-font-display)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    flexWrap: 'wrap',
                  }}
                />
              </span>
            </span>

            <span className="font-display" style={{ display: 'block', fontSize: 'clamp(3.5rem, 9vw, 8rem)', color: '#0D0D0D', lineHeight: 0.9 }}>
              MARKETPLACE
            </span>
          </h1>

          <p style={{
            fontSize: '1.1rem', color: '#3D2800', lineHeight: 1.75,
            maxWidth: '500px', margin: '0 auto 2.5rem', fontWeight: 600,
          }}>
            Authentic home-cooked food from Ammas &amp; Paatis — made fresh with
            handed-down heritage recipes, delivered to your door.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {/* App Store */}
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.75rem 1.5rem',
                background: '#0D0D0D', color: '#FFFFFF',
                border: '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: '12px', textDecoration: 'none',
                transition: 'all 160ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = '#FFB800'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0D0D0D'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, opacity: 0.7, lineHeight: 1 }}>Download on the</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.2 }}>App Store</div>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.75rem 1.5rem',
                background: '#FFB800', color: '#0D0D0D',
                border: '1.5px solid #FFB800',
                borderRadius: '12px', textDecoration: 'none',
                transition: 'all 160ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E5A000'; e.currentTarget.style.borderColor = '#E5A000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFB800'; e.currentTarget.style.borderColor = '#FFB800'; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.75-2.75-10.84 9.82zm-1.1-20.3C2.03 3.67 2 3.9 2 4.15v15.7c0 .25.03.48.08.7l.1.09 8.8-8.8v-.2l-8.8-8.8-.1.1zm17.43 9.43-2.52 1.46-2.9-2.9 2.9-2.9 2.53 1.46c.72.42.72 1.46-.01 1.88zm-3.62 2.09L4.04 22.96c.36.38.94.43 1.36.12L18.04 15.4l-2.15-2.42z"/></svg>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, opacity: 0.7, lineHeight: 1 }}>Get it on</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.2 }}>Google Play</div>
              </div>
            </a>
          </div>

          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.92)',
            border: '2px solid rgba(255,255,255,0.9)',
            borderRadius: '9999px',
            padding: '0.45rem 0.45rem 0.45rem 1.25rem',
            maxWidth: '560px', margin: '0 auto 3.5rem',
            gap: '0.75rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderRight: '1px solid #E5E5E5', paddingRight: '0.9rem' }}>
              <MapPin size={14} color="#FFB800" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0D0D0D', whiteSpace: 'nowrap' }}>Bengaluru</span>
            </div>
            <Search size={14} color="#A8A29E" style={{ flexShrink: 0 }} />
            <input type="text" placeholder="Search dishes, kitchens, regions…"
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#0D0D0D', fontFamily: 'var(--fz-font-sans)' }}
            />
            <Link to="/search" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FFB800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowRight size={17} color="#0D0D0D" />
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.15)' }}>
            {[
              { val: '10K+',    label: 'Home Kitchens' },
              { val: '1 Lakh+', label: 'Happy Customers' },
              { val: '4.8 ★',   label: 'Avg Rating' },
              { val: '28+',     label: 'Regional Cuisines' },
            ].map(s => (
              <div key={s.val} style={{ textAlign: 'center' }}>
                <div className="font-display" style={{ fontSize: '2.4rem', color: '#0D0D0D', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(0,0,0,0.55)', marginTop: '0.35rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ── cream rounded card */}
      <section style={{ padding: '5rem 1.5rem 5rem', maxWidth: '1340px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          background: '#FFF8E8',
          borderRadius: '32px', padding: '4rem 5rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center',
        }}>
          <div>
            <Tag>Our Story</Tag>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', color: '#0D0D0D', margin: '1.25rem 0 1.5rem', lineHeight: 0.92 }}>
              REAL HOME<br />FOOD IS<br />
              <span style={{ color: '#FFB800' }}>DIFFERENT.</span>
            </h2>
            <div style={{ fontFamily: 'var(--fz-font-script)', fontSize: '1.8rem', color: '#FFB800', lineHeight: 1.3, fontWeight: 700 }}>
              "Ghar ka swaad, Dil se."
            </div>
          </div>
          <div>
            <p style={{ fontSize: '1.1rem', color: '#57534E', lineHeight: 1.8, marginBottom: '1.5rem', fontWeight: 500 }}>
              Every Amma has a signature dish no restaurant can replicate. Every Paati holds recipes
              that have survived centuries of Indian culinary memory.
            </p>
            <p style={{ fontSize: '1rem', color: '#78716C', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              No mass-produced food. No compromise on authenticity. Just real home kitchens,
              real cooks, and food the way it was always meant to be.
            </p>
            <Link to="/food" className="fz-btn fz-btn-gold" style={{ textDecoration: 'none' }}>
              Explore Food <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CURVED MARQUEE RAIL — floats over cream/dark boundary ── */}
      <div style={{
        position:      'relative',
        zIndex:        5,
        height:        '160px',
        marginTop:     '-80px',
        marginBottom:  '-80px',
        pointerEvents: 'none',
        overflow:      'visible',
        width:         '100%',
      }}>
        <CurvedMarquee
          items={['CULTURE', 'CONNECTION', 'FLAVOURS', 'FOOD', 'STORIES', 'HERITAGE', 'AMMAS & PAATIS']}
          separator="◆"
          speed={10}
          height={160}
        />
      </div>

      {/* ── REGIONS ── ScrollStack two-column — DARK */}
      <section style={{ background: '#0D0D0D', overflow: 'visible' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', display: 'flex', height: '100vh', maxHeight: '800px' }}>

          {/* LEFT — sticky story text */}
          <div style={{
            flex: '0 0 380px',
            padding: '4rem 2.5rem 4rem 1.5rem',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFB800', marginBottom: '1rem', display: 'block' }}>
              Cultural Flavors
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#FFFFFF', lineHeight: 0.92, marginBottom: '2rem' }}>
              THE STORY<br />BEHIND<br />EVERY<br /><span style={{ color: '#FFB800' }}>REGION</span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '1.25rem', fontWeight: 500 }}>
              Every region on Feazto carries its own food memory — passed down through kitchens, festivals, and family tables long before it became a dish on a menu.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              From coastal spice routes to mountain grain belts, Feazto traces each recipe back to where it began — so every order comes with context.
            </p>
            <Link to="/regions"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#FFB800', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Explore All Regions <ArrowRight size={15} /></Link>
          </div>

          {/* RIGHT — ScrollStack fixed-height container, no page scroll */}
          <div style={{ flex: 1, height: '100%', overflow: 'hidden', position: 'relative' }}>
            <ScrollStack
              itemDistance={60}
              itemScale={0.03}
              itemStackDistance={20}
              stackPosition="25%"
              scaleEndPosition="5%"
              baseScale={0.88}
            >
              {SEED_REGIONS.map(reg => (
                <ScrollStackItem key={reg.id}>
                  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                    <img src={reg.image} alt={reg.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.88) 100%)' }} />
                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.75rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#FFB800', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{reg.tagline}</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
                      <h3 className="font-display" style={{ fontSize: '2.2rem', color: '#FFFFFF', lineHeight: 1, marginBottom: '0.4rem' }}>{reg.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, marginBottom: '1rem' }}>{reg.description}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{reg.dishCount} Dishes</span>
                        <Link to={`/regions/${reg.id}`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.38rem 0.9rem', background: '#FFB800', color: '#0D0D0D', borderRadius: '9999px', fontSize: '0.76rem', fontWeight: 800, textDecoration: 'none' }}
                          onClick={e => e.stopPropagation()}
                        >Explore <ArrowRight size={11} /></Link>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── DARK bg, numbered cards */}
      <section style={{ background: '#0D0D0D', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFB800' }}>Simple Process</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#FFFFFF', marginTop: '0.75rem' }}>
              HOW FEAZTO WORKS
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
            {[
              { num: '01', title: 'DISCOVER', text: 'Browse authentic regional dishes & home kitchens near you.' },
              { num: '02', title: 'CONNECT',  text: 'Connect directly with verified local home cooks.' },
              { num: '03', title: 'ORDER',    text: 'Place your order with custom preferences.' },
              { num: '04', title: 'ENJOY',    text: 'Fresh, hygienic, authentic home-cooked food.' },
              { num: '05', title: 'GROW',     text: 'We grow together, empowering cooks nationwide.' },
            ].map(step => (
              <div key={step.num} style={{ padding: '2.5rem 1.75rem', background: '#141414', transition: 'background 200ms', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1C1C1C')}
                onMouseLeave={e => (e.currentTarget.style.background = '#141414')}
              >
                <div className="font-display" style={{ fontSize: '3.5rem', color: '#FFB800', lineHeight: 1, marginBottom: '1.25rem' }}>{step.num}</div>
                <h3 className="font-display" style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.65rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK A COOK ── mandala gold overlay */}
      <section className="fz-mandala-gold" style={{ margin: '5rem 1.5rem', borderRadius: '32px', padding: '4.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <Tag>Private Culinary Experiences</Tag>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: '#0D0D0D', margin: '1rem 0 1.25rem', lineHeight: 0.92 }}>
              BOOK A COOK<br />FOR YOUR<br />EVENT
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#57534E', lineHeight: 1.75, marginBottom: '1.75rem', fontWeight: 500 }}>
              Hire verified heritage home cooks for authentic regional feasts at your home —
              live cooking, handcrafted menus, memories worth keeping.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {['Birthdays', 'House Parties', 'Festivals', 'Corporate', 'Weddings'].map(ev => (
                <span key={ev} style={{ padding: '0.4rem 1rem', background: '#FFFFFF', border: '1px solid #FFB800', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 700, color: '#0D0D0D' }}>{ev}</span>
              ))}
            </div>
            <Link to="/book-a-cook" className="fz-btn fz-btn-dark" style={{ textDecoration: 'none' }}>
              Book a Cook <Calendar size={15} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {[
              { icon: <ChefHat size={20} color="#FFB800" />, title: 'Verified Heritage Cooks', desc: 'Background-checked, hygiene-certified, and vetted for authentic expertise.' },
              { icon: <ShieldCheck size={20} color="#FFB800" />, title: 'Custom Menus', desc: 'Your regional menu for 10–500 guests, any cuisine, any occasion.' },
              { icon: <Clock size={20} color="#FFB800" />, title: 'Fixed Transparent Pricing', desc: 'We show up prepared. No hidden charges, no surprises.' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E5E5', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '44px', height: '44px', flexShrink: 0, background: '#FFF8E8', border: '1px solid rgba(255,184,0,0.4)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{f.icon}</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0D0D0D', marginBottom: '0.25rem' }}>{f.title}</h4>
                  <p style={{ fontSize: '0.84rem', color: '#78716C', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BECOME A COOK ── DARK bg */}
      <section style={{ background: '#0D0D0D', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center',
        }}>
          {/* PixelSwap — click to reveal cook CTA */}
          <div style={{ width: '100%', minHeight: '420px', position: 'relative' }}>
            <PixelSwap
              pixelSize={64}
              gap={2}
              pixelRadius={8}
              pixelSpin={45}
              pixelScale={0.35}
              duration={1400}
              pixelDuration={450}
              pattern="random"
              randomness={0.4}
              trigger="click"
              style={{ width: '100%', minHeight: '420px', borderRadius: '24px', border: '1px solid rgba(255,184,0,0.15)' }}
              firstContent={
                <div style={{ textAlign: 'center', padding: '3rem 2rem', width: '100%' }}>
                  <div className="font-display" style={{
                    fontSize: 'clamp(5rem, 10vw, 8rem)',
                    color: 'transparent',
                    WebkitTextStroke: '2px rgba(255,184,0,0.35)',
                    lineHeight: 0.85,
                    userSelect: 'none',
                    marginBottom: '1.25rem',
                  }}>
                    10K+
                  </div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    Home kitchens earning on Feazto
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,184,0,0.55)', fontWeight: 600 }}>
                    ✦ Click to discover
                  </p>
                </div>
              }
              secondContent={
                <div style={{ textAlign: 'center', padding: '2.5rem 2rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                  {/* Feazto Logo */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--fz-font-display)', fontSize: '3rem', color: '#FFFFFF', WebkitTextStroke: '2px #0D0D0D', paintOrder: 'stroke fill', letterSpacing: '0.05em' }}>FEA</span>
                    <span style={{ fontFamily: 'var(--fz-font-display)', fontSize: '3.5rem', color: '#FFB800', letterSpacing: '0.02em' }}>Z</span>
                    <span style={{ fontFamily: 'var(--fz-font-display)', fontSize: '3rem', color: '#FFFFFF', WebkitTextStroke: '2px #0D0D0D', paintOrder: 'stroke fill', letterSpacing: '0.05em' }}>TO</span>
                  </div>
                  <p style={{ fontFamily: 'var(--fz-font-script)', fontSize: '1.3rem', color: '#FFB800', fontWeight: 700, lineHeight: 1.3 }}>
                    "Ghar ka swaad, Dil se!"
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '240px' }}>
                    {[
                      { val: '10K+', label: 'Home Kitchens' },
                      { val: '1L+',  label: 'Happy Customers' },
                      { val: '4.8★', label: 'Avg Rating' },
                    ].map(s => (
                      <div key={s.val} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.85rem', background: 'rgba(255,184,0,0.08)', borderRadius: '8px', border: '1px solid rgba(255,184,0,0.15)' }}>
                        <span className="font-display" style={{ color: '#FFB800', fontSize: '1.2rem' }}>{s.val}</span>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700 }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>✦ Click to go back</p>
                </div>
              }
            />
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFB800' }}>Empowering Home Cooks</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#FFFFFF', margin: '1rem 0 1.1rem', lineHeight: 0.92 }}>
              TURN YOUR<br />PASSION INTO<br />
              <span style={{ color: '#FFB800' }}>INCOME.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1.75rem', fontWeight: 500 }}>
              Cook from home. Set your hours. Build your brand. Feazto handles the platform — you handle the flavors.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
              {[
                'Earn ₹20,000–₹80,000/month from your kitchen',
                'Zero registration fees to join the platform',
                'We handle delivery, payments & support',
                "Be part of India's largest home kitchen network",
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#FFB800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} color="#0D0D0D" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/cook/apply" className="fz-btn fz-btn-gold" style={{ textDecoration: 'none' }}>
              Join as a Cook <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── DARK bg */}
      <section style={{ background: '#0D0D0D', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFB800' }}>The Feazto Ecosystem</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginTop: '0.75rem' }}>
              STRONGER TOGETHER
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem' }}>
            {[
              { icon: <ChefHat size={26} color="#FFB800" />,  title: 'Home Cooks',       desc: '10,000+ verified heritage cooks across India.' },
              { icon: <Users size={26} color="#FFB800" />,    title: 'Customers',         desc: '1 Lakh+ food lovers discovering authentic food.' },
              { icon: <Truck size={26} color="#FFB800" />,    title: 'Delivery Partners', desc: 'Fast, reliable last-mile delivery.' },
              { icon: <Store size={26} color="#FFB800" />,    title: 'Kitchens',          desc: 'Hygiene-certified home kitchens.' },
              { icon: <Sprout size={26} color="#FFB800" />,   title: 'Suppliers',         desc: 'Local farm-fresh ingredient sourcing.' },
            ].map((p, i) => (
              <div key={i} style={{
                padding: '2.25rem 1.5rem', textAlign: 'center',
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '22px',
                transition: 'border-color 200ms, transform 200ms',
                cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFB800'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = ''; }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>{p.icon}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── gold mandala */}
      <section style={{ margin: '0 0 5rem 0', overflow: 'hidden', position: 'relative', background: '#FFB800', padding: '6rem 3rem', textAlign: 'center', borderRadius: '0 0 40px 40px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/mandala_bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', color: '#0D0D0D', lineHeight: 0.88, marginBottom: '1.5rem' }}>
            ONE NATION.<br />COUNTLESS<br />FLAVORS.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(0,0,0,0.6)', fontWeight: 600, maxWidth: '460px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Discover, order, and celebrate regional home-cooked food every single day.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/food" className="fz-btn fz-btn-dark" style={{ textDecoration: 'none' }}>
              Order Food <ArrowRight size={15} />
            </Link>
            <Link to="/cook/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.85rem 2rem', background: 'rgba(0,0,0,0.1)', border: '2px solid rgba(0,0,0,0.2)', borderRadius: '9999px', fontSize: '0.9rem', fontWeight: 700, color: '#0D0D0D', textDecoration: 'none' }}>
              Become a Cook
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
