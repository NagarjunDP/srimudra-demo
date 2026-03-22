import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// ─── Budget Calculation Logic ─────────────────────────────────────────────────
const BASE = {
  Wedding: 200000,
  Birthday: 45000,
  'Corporate Event': 100000,
  Engagement: 80000,
  'Baby Shower': 35000,
  Anniversary: 60000,
};

const GUEST_MULT = (guests) => {
  if (guests <= 75) return 1;
  if (guests <= 150) return 1.5;
  if (guests <= 250) return 2.2;
  if (guests <= 400) return 3.0;
  return 4.2;
};

const DECO_MULT = { Simple: 1, Premium: 1.6, Luxury: 2.4, Royal: 3.5 };
const VENUE_MULT = { 'Indoor Hall': 1, 'Outdoor Garden': 1.2, Farmhouse: 1.4, Destination: 2.0 };

function calcBudget(eventType, guests, deco, venue) {
  if (!eventType || !deco || !venue) return null;
  const base = BASE[eventType] * GUEST_MULT(guests) * DECO_MULT[deco] * VENUE_MULT[venue];
  const low = Math.round(base / 10000) * 10000;
  const high = Math.round((base * 1.4) / 10000) * 10000;
  return { low, high };
}

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
const CONFETTI_COLORS = ['#D4AF37', '#FFD700', '#fff', '#f5c842', '#E8B86D', '#c9a227'];
function Confetti() {
  const pieces = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.8,
    size: Math.random() * 9 + 4,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    spin: Math.random() > 0.5,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: p.spin ? 720 : -360 }}
          transition={{ duration: 3 + Math.random() * 1.5, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: p.size,
            height: p.size,
            borderRadius: p.spin ? '50%' : '2px',
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

// ─── Injected CSS ─────────────────────────────────────────────────────────────
const INJECTED_CSS = `
  @keyframes shimmer-border {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes float-up {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @keyframes particle {
    0% { transform: translateY(0) scale(1); opacity: 0.7; }
    100% { transform: translateY(-90px) scale(0); opacity: 0; }
  }
  @keyframes pulse-ring {
    0% { box-shadow: 0 0 0 0 rgba(212,175,55,0.35); }
    70% { box-shadow: 0 0 0 14px rgba(212,175,55,0); }
    100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  input[type=range].gold-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 999px;
    outline: none;
  }
  input[type=range].gold-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #F5E27B, #c9a227);
    border: 2px solid #0A0F2C;
    box-shadow: 0 0 12px rgba(212,175,55,0.6);
    cursor: pointer;
    transition: transform 0.15s;
  }
  input[type=range].gold-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
  input[type=range].gold-slider::-moz-range-thumb {
    width: 28px; height: 28px; border-radius: 50%;
    background: linear-gradient(135deg, #F5E27B, #c9a227);
    border: 2px solid #0A0F2C;
    box-shadow: 0 0 12px rgba(212,175,55,0.6);
    cursor: pointer;
  }
  .form-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1.5px solid rgba(212,175,55,0.2);
    border-radius: 12px;
    padding: 14px 18px;
    color: #fff;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .form-input:focus { border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212,175,55,0.12); }
  .form-input::placeholder { color: rgba(255,255,255,0.22); }
  .form-input::-webkit-calendar-picker-indicator { filter: invert(0.7) sepia(1) hue-rotate(10deg); cursor: pointer; }
  .form-label {
    color: rgba(212,175,55,0.75);
    font-size: 11px;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 7px;
    display: block;
  }
`;

// ─── Step Variants ────────────────────────────────────────────────────────────
const stepVariants = {
  enter: { opacity: 0, y: 44 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

// ─── Option Card ──────────────────────────────────────────────────────────────
function OptionCard({ label, icon, description, selected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.045, y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      style={{
        background: selected
          ? 'linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 100%)'
          : 'rgba(255,255,255,0.04)',
        border: selected ? '1.5px solid #D4AF37' : '1.5px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '20px 14px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 9,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border 0.2s, background 0.2s',
        boxShadow: selected
          ? '0 0 28px rgba(212,175,55,0.22), inset 0 0 18px rgba(212,175,55,0.06)'
          : '0 2px 12px rgba(0,0,0,0.2)',
        animation: selected ? 'pulse-ring 2s ease-out infinite' : 'none',
      }}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 18, height: 18, borderRadius: '50%',
            background: '#D4AF37',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, color: '#0A0F2C', fontWeight: 900,
          }}
        >✓</motion.div>
      )}
      <span style={{ fontSize: 34 }}>{icon}</span>
      <span style={{
        color: selected ? '#D4AF37' : '#d8cba8',
        fontWeight: 700, fontSize: 13.5,
        letterSpacing: '0.04em',
        fontFamily: "'Cormorant', serif",
      }}>
        {label}
      </span>
      {description && (
        <span style={{ color: '#6b5e3e', fontSize: 11, lineHeight: 1.4, fontFamily: "'Inter', sans-serif" }}>
          {description}
        </span>
      )}
    </motion.button>
  );
}

// ─── Gold Button ──────────────────────────────────────────────────────────────
function GoldButton({ children, onClick, type = 'button', disabled = false, fullWidth = true, variant = 'solid' }) {
  const solid = {
    background: disabled ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg, #D4AF37, #c9a227)',
    color: disabled ? 'rgba(255,255,255,0.25)' : '#0A0F2C',
    border: 'none',
  };
  const ghost = {
    background: 'transparent',
    color: 'rgba(212,175,55,0.65)',
    border: '1px solid rgba(212,175,55,0.2)',
  };
  const styles = variant === 'ghost' ? ghost : solid;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.025, boxShadow: variant === 'solid' ? '0 8px 32px rgba(212,175,55,0.4)' : 'none' } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      style={{
        ...styles,
        width: fullWidth ? '100%' : 'auto',
        borderRadius: 999,
        padding: '16px 32px',
        fontSize: 14,
        fontWeight: 800,
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontFamily: "'Inter', sans-serif",
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      {children}
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
// Steps: 1=EventType, 2=Guests, 3=Deco, 4=Venue, 5=HiddenLead, 6=Result
export default function BudgetEstimator() {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState('');
  const [guests, setGuests] = useState(150);
  const [deco, setDeco] = useState('');
  const [venue, setVenue] = useState('');
  // Lead data
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadDate, setLeadDate] = useState('');
  // UI state
  const [showThankYou, setShowThankYou] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement('style');
    tag.textContent = INJECTED_CSS;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const budget = calcBudget(eventType, guests, deco, venue);

  const TOTAL_STEPS = 5;

  const canAdvance = () => {
    if (step === 1) return !!eventType;
    if (step === 2) return true;
    if (step === 3) return !!deco;
    if (step === 4) return !!venue;
    return false;
  };

  const handleNext = () => {
    if (!canAdvance()) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1 && step <= 5) setStep((s) => s - 1);
    else if (step === 6) setStep(4);
  };

  // ── Web3Forms access key — get yours FREE at https://web3forms.com
  // Enter nagarjundp256@gmail.com → confirm email → paste key below
  const WEB3FORMS_KEY = 'cc2e7d6b-7b3c-4eeb-9ecf-1f8943fe5b6b';

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const budgetRange = budget ? `${formatINR(budget.low)} – ${formatINR(budget.high)}` : 'N/A';

    // Silent email to nagarjundp256@gmail.com via Web3Forms
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `🎉 New Lead — ${eventType} | Srimudra Events Budget Estimator`,
          from_name: 'Srimudra Events Budget Tool',
          // Lead details
          'Full Name': leadName,
          'Phone Number': leadPhone,
          'Preferred Date': leadDate || 'Not specified',
          // Event details
          'Event Type': eventType,
          'No. of Guests': guests,
          'Decoration Style': deco,
          'Venue Type': venue,
          'Budget Estimate': budgetRange,
          'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      });
    } catch (err) {
      // Fail silently — user should never see any error
      console.warn('[Srimudra Events] Email send failed silently', err);
    }

    // Always move to result regardless of email success
    setSubmitting(false);
    setStep(6);
  };

  const handleBookConsultation = () => {
    setShowThankYou(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const resetAll = () => {
    setStep(1);
    setEventType(''); setGuests(150); setDeco(''); setVenue('');
    setLeadName(''); setLeadPhone(''); setLeadDate('');
    setShowThankYou(false); setShowConfetti(false);
  };

  const guestLabel = (g) => {
    if (g <= 75) return 'Intimate';
    if (g <= 150) return 'Celebration';
    if (g <= 300) return 'Grand';
    return 'Royal';
  };

  // Slider background style
  const sliderBg = `linear-gradient(90deg, #D4AF37 ${((guests - 50) / 450) * 100}%, rgba(255,255,255,0.1) ${((guests - 50) / 450) * 100}%)`;

  const navItems = [
    { name: 'Wedding', icon: '💍' },
    { name: 'Birthday', icon: '🎂' },
    { name: 'Corporate Event', icon: '💼' },
    { name: 'Engagement', icon: '💎' },
    { name: 'Baby Shower', icon: '🍼' },
    { name: 'Anniversary', icon: '🥂' },
  ];

  const decoItems = [
    { name: 'Simple', icon: '🌸', desc: 'Clean and elegant' },
    { name: 'Premium', icon: '✨', desc: 'Stylish and modern' },
    { name: 'Luxury', icon: '👑', desc: 'Rich and opulent' },
    { name: 'Royal', icon: '🏰', desc: 'Grand and majestic' },
  ];

  const venueItems = [
    { name: 'Indoor Hall', icon: '🏛️', desc: 'Classic and controlled' },
    { name: 'Outdoor Garden', icon: '🌿', desc: 'Open and natural' },
    { name: 'Farmhouse', icon: '🌾', desc: 'Rustic and scenic' },
    { name: 'Destination', icon: '✈️', desc: 'Extraordinary locations' },
  ];

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${4 + (i * 5) % 92}%`,
    delay: (i * 0.28) % 2.8,
    size: 3 + (i % 4),
  }));

  return (
    <div
      ref={topRef}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0A0F2C 0%, #0d1538 45%, #080c20 100%)',
        fontFamily: "'Cormorant', serif",
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Subtle grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      {showConfetti && <Confetti />}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 16px 80px' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 8 }}
        >
          <Link to="/">
            {/* Logo in circular white container */}
            <div style={{
              width: 88, height: 88,
              background: '#ffffff',
              borderRadius: '50%',
              margin: '0 auto 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 3px rgba(212,175,55,0.35), 0 0 28px rgba(212,175,55,0.25)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s',
            }}>
              <img
                src="/logo.png"
                alt="Srimudra Events"
                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<span style="font-family:Cormorant,serif;font-weight:900;font-size:28px;color:#0A0F2C;letter-spacing:-1px">SE</span>';
                }}
              />
            </div>
          </Link>

          <h1 style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(20px, 4.5vw, 34px)',
            fontWeight: 700,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #c9a227, #F5E27B, #D4AF37, #c9a227)',
            backgroundSize: '220%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer-border 4s ease infinite',
            margin: 0,
          }}>
            Srimudra Events &amp; Management
          </h1>
          <p style={{
            color: 'rgba(212,175,55,0.5)',
            fontSize: 11,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            marginTop: 7,
            fontFamily: "'Inter', sans-serif",
          }}>
            Crafting Unforgettable Celebrations · Hyderabad
          </p>
          <div style={{ margin: '18px auto 0', height: 1, width: 220, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
        </motion.div>

        {/* ── Progress Bar (only for steps 1-5) ── */}
        {step >= 1 && step <= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ margin: '28px 0 34px', fontFamily: "'Inter', sans-serif" }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ color: '#D4AF37', fontSize: 13, fontWeight: 700 }}>
                Step {step} of {TOTAL_STEPS}
              </span>
              <span style={{ color: 'rgba(212,175,55,0.45)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {['Event Type', 'Guest Count', 'Decoration', 'Venue', 'Details'][step - 1]}
              </span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 999, overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #c9a227, #F5E27B, #D4AF37)',
                  borderRadius: 999,
                  boxShadow: '0 0 10px rgba(212,175,55,0.55)',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9, padding: '0 2px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: s <= step ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                  boxShadow: s <= step ? '0 0 7px rgba(212,175,55,0.7)' : 'none',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Step Content ── */}
        <AnimatePresence mode="wait">

          {/* STEP 1 — Event Type */}
          {step === 1 && (
            <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <div style={{ textAlign: 'center', marginBottom: 30 }}>
                <h2 style={{ color: '#fff', fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: 700, margin: 0 }}>
                  What are you <span style={{ color: '#D4AF37' }}>celebrating?</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 8, fontFamily: "'Inter', sans-serif" }}>
                  Choose the type of event you're planning
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(136px, 1fr))', gap: 14 }}>
                {navItems.map((item) => (
                  <OptionCard key={item.name} label={item.name} icon={item.icon}
                    selected={eventType === item.name} onClick={() => setEventType(item.name)} />
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Guest Count */}
          {step === 2 && (
            <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <h2 style={{ color: '#fff', fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: 700, margin: 0 }}>
                  How many <span style={{ color: '#D4AF37' }}>guests</span> are you expecting?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 8, fontFamily: "'Inter', sans-serif" }}>
                  Drag the slider to set your guest count
                </p>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.14)',
                borderRadius: 22, padding: 'clamp(28px, 5vw, 44px) clamp(20px, 5vw, 40px)', textAlign: 'center',
              }}>
                <motion.div
                  key={guests}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  style={{
                    fontSize: 'clamp(56px, 14vw, 88px)', fontWeight: 900, lineHeight: 1,
                    background: 'linear-gradient(135deg, #c9a227, #F5E27B)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    fontFamily: "'Cormorant', serif",
                  }}
                >
                  {guests}
                </motion.div>
                <div style={{ color: 'rgba(212,175,55,0.65)', fontSize: 12, marginTop: 5, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
                  Guests · <span style={{ color: '#D4AF37', fontWeight: 700 }}>{guestLabel(guests)}</span>
                </div>
                <div style={{ margin: '30px 0 22px' }}>
                  <input
                    type="range"
                    className="gold-slider"
                    min={50} max={500} step={10}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    style={{ width: '100%', background: sliderBg }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif" }}>
                  {['Intimate', 'Celebration', 'Grand', 'Royal'].map((l) => (
                    <span key={l} style={{
                      fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em',
                      color: guestLabel(guests) === l ? '#D4AF37' : 'rgba(255,255,255,0.22)',
                      fontWeight: guestLabel(guests) === l ? 700 : 400,
                      transition: 'color 0.3s',
                    }}>{l}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Decoration */}
          {step === 3 && (
            <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <div style={{ textAlign: 'center', marginBottom: 30 }}>
                <h2 style={{ color: '#fff', fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: 700, margin: 0 }}>
                  Choose your <span style={{ color: '#D4AF37' }}>decoration style</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 8, fontFamily: "'Inter', sans-serif" }}>
                  From elegant simplicity to opulent grandeur
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 14 }}>
                {decoItems.map((item) => (
                  <OptionCard key={item.name} label={item.name} icon={item.icon} description={item.desc}
                    selected={deco === item.name} onClick={() => setDeco(item.name)} />
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4 — Venue */}
          {step === 4 && (
            <motion.div key="s4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <div style={{ textAlign: 'center', marginBottom: 30 }}>
                <h2 style={{ color: '#fff', fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: 700, margin: 0 }}>
                  Where is your <span style={{ color: '#D4AF37' }}>event?</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 8, fontFamily: "'Inter', sans-serif" }}>
                  The venue shapes the entire experience
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 14 }}>
                {venueItems.map((item) => (
                  <OptionCard key={item.name} label={item.name} icon={item.icon} description={item.desc}
                    selected={venue === item.name} onClick={() => setVenue(item.name)} />
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5 — Hidden Lead Capture (framed as part of calculator) */}
          {step === 5 && (
            <motion.div key="s5" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.18)',
                borderRadius: 24, padding: 'clamp(28px, 6vw, 48px) clamp(20px, 5vw, 44px)',
              }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <div style={{ fontSize: 40, marginBottom: 14 }}>🔮</div>
                  <h2 style={{ color: '#fff', fontSize: 'clamp(18px, 4vw, 27px)', fontWeight: 700, margin: '0 0 10px' }}>
                    Almost there! Just a few <span style={{ color: '#D4AF37' }}>details</span>
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, maxWidth: 400, margin: '0 auto' }}>
                    We need these details to generate your accurate, personalised budget estimate
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label className="form-label">Full Name</label>
                    <input className="form-input" type="text" placeholder="Your full name"
                      value={leadName} onChange={(e) => setLeadName(e.target.value)} required />
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" type="tel" placeholder="Your phone number"
                      value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} required />
                  </div>
                  <div>
                    <label className="form-label">Preferred Event Date</label>
                    <input className="form-input" type="date"
                      value={leadDate} onChange={(e) => setLeadDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]} />
                  </div>

                  {/* Selection summary — reinforces they're completing a calculator */}
                  <div style={{
                    background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.12)',
                    borderRadius: 12, padding: '12px 16px',
                  }}>
                    <div style={{ color: 'rgba(212,175,55,0.45)', fontSize: 10, fontFamily: "'Inter', sans-serif", letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                      Calculating estimate for
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {[
                        `${navItems.find(n => n.name === eventType)?.icon} ${eventType}`,
                        `👥 ${guests} Guests`,
                        `${decoItems.find(d => d.name === deco)?.icon} ${deco}`,
                        `${venueItems.find(v => v.name === venue)?.icon} ${venue}`,
                      ].map((b) => (
                        <span key={b} style={{
                          background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)',
                          borderRadius: 999, padding: '4px 12px', fontSize: 11.5, color: '#D4AF37',
                          fontFamily: "'Inter', sans-serif", fontWeight: 600,
                        }}>{b}</span>
                      ))}
                    </div>
                  </div>

                  {submitting ? (
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                      padding: '18px 0',
                    }}>
                      <div style={{
                        width: 44, height: 44,
                        border: '3px solid rgba(212,175,55,0.2)',
                        borderTopColor: '#D4AF37',
                        borderRadius: '50%',
                        animation: 'spin 0.75s linear infinite',
                      }} />
                      <span style={{
                        color: '#D4AF37', fontSize: 13, fontFamily: "'Inter', sans-serif",
                        letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
                      }}>Calculating your budget…</span>
                    </div>
                  ) : (
                    <GoldButton type="submit">
                      Calculate My Budget ✨
                    </GoldButton>
                  )}
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 6 — Result Card */}
          {step === 6 && budget && (
            <motion.div key="s6" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5 }}>

              {/* Thank You overlay (shown after Book Consultation) */}
              <AnimatePresence>
                {showThankYou && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    style={{
                      position: 'fixed', inset: 0, zIndex: 40,
                      background: 'rgba(8,12,32,0.96)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 24,
                    }}
                  >
                    <div style={{ textAlign: 'center', maxWidth: 480 }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ duration: 0.6, type: 'spring' }}
                        style={{ fontSize: 72, marginBottom: 24 }}
                      >🎉</motion.div>
                      <h2 style={{ color: '#fff', fontFamily: "'Cormorant', serif", fontSize: 'clamp(24px, 6vw, 40px)', fontWeight: 700, margin: '0 0 14px' }}>
                        Thank you, <span style={{ color: '#D4AF37' }}>{leadName || 'there'}!</span>
                      </h2>
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Cormorant', serif", fontSize: 18, lineHeight: 1.7, margin: '0 auto 28px', maxWidth: 380 }}>
                        Our Srimudra Events team will call you within <strong style={{ color: '#D4AF37' }}>24 hours</strong> to plan your perfect celebration.
                      </p>
                      <div style={{
                        background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
                        borderRadius: 16, padding: '14px 24px', display: 'inline-block', marginBottom: 32,
                      }}>
                        <div style={{ color: 'rgba(212,175,55,0.55)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", marginBottom: 6 }}>
                          Your Event Estimate
                        </div>
                        <div style={{ color: '#D4AF37', fontWeight: 700, fontSize: 20, fontFamily: "'Cormorant', serif" }}>
                          {formatINR(budget.low)} – {formatINR(budget.high)}
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, fontFamily: "'Inter', sans-serif", marginTop: 4 }}>
                          {eventType} · {guests} Guests · {deco} · {venue}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300, margin: '0 auto' }}>
                        <GoldButton onClick={resetAll}>Plan Another Event</GoldButton>
                        <GoldButton variant="ghost" onClick={() => setShowThankYou(false)}>← Back to Estimate</GoldButton>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result Card */}
              <div style={{
                position: 'relative',
                borderRadius: 24,
                padding: '2px',
                background: 'linear-gradient(135deg, #D4AF37, #f5e27b, #c9a227, #D4AF37)',
                backgroundSize: '300%',
                animation: 'shimmer-border 3s linear infinite',
                overflow: 'hidden',
              }}>
                {/* Gold particles */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 24, pointerEvents: 'none', zIndex: 0 }}>
                  {particles.map((p) => (
                    <div key={p.id} style={{
                      position: 'absolute', bottom: 0, left: p.left,
                      width: p.size, height: p.size, borderRadius: '50%',
                      background: '#D4AF37', opacity: 0.35,
                      animation: `particle ${2.2 + p.delay}s ease-out ${p.delay}s infinite`,
                    }} />
                  ))}
                </div>

                <div style={{
                  background: 'linear-gradient(160deg, #0d1440 0%, #080c20 100%)',
                  borderRadius: 22,
                  padding: 'clamp(28px, 6vw, 56px) clamp(20px, 5vw, 48px)',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <div style={{ color: 'rgba(212,175,55,0.55)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", marginBottom: 14 }}>
                    Your Estimated Budget
                  </div>

                  <motion.div
                    initial={{ scale: 0.65, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
                    style={{
                      fontSize: 'clamp(26px, 7.5vw, 50px)',
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #c9a227, #F5E27B, #D4AF37)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      lineHeight: 1.15,
                      fontFamily: "'Cormorant', serif",
                      animation: 'float-up 3s ease-in-out infinite',
                    }}
                  >
                    {formatINR(budget.low)} — {formatINR(budget.high)}
                  </motion.div>

                  {/* Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', margin: '24px 0' }}>
                    {[
                      { label: eventType, icon: navItems.find(n => n.name === eventType)?.icon },
                      { label: `${guests} Guests`, icon: '👥' },
                      { label: deco, icon: decoItems.find(d => d.name === deco)?.icon },
                      { label: venue, icon: venueItems.find(v => v.name === venue)?.icon },
                    ].map((b) => (
                      <span key={b.label} style={{
                        background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)',
                        borderRadius: 999, padding: '5px 14px', fontSize: 12, color: '#D4AF37',
                        fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: '0.05em',
                      }}>
                        {b.icon} {b.label}
                      </span>
                    ))}
                  </div>

                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontStyle: 'italic', marginBottom: 32, fontFamily: "'Cormorant', serif" }}>
                    "Let Srimudra Events make your celebration truly unforgettable"
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360, margin: '0 auto' }}>
                    <GoldButton onClick={handleBookConsultation}>
                      Book a Free Consultation 🌟
                    </GoldButton>
                    <GoldButton variant="ghost" onClick={resetAll}>
                      ↺ Start Over
                    </GoldButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── Nav Buttons (Steps 1–4) ── */}
        {step >= 1 && step <= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', gap: 12, marginTop: 32, justifyContent: 'space-between', alignItems: 'center' }}
          >
            {step > 1 ? (
              <GoldButton variant="ghost" onClick={handleBack} fullWidth={false}>
                ← Back
              </GoldButton>
            ) : <div />}

            <GoldButton onClick={handleNext} disabled={!canAdvance()} fullWidth={false}>
              {step === 4 ? 'Next →' : 'Continue →'}
            </GoldButton>
          </motion.div>
        )}

        {/* ── Footer ── */}
        <div style={{ textAlign: 'center', marginTop: 56, fontFamily: "'Inter', sans-serif" }}>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.18), transparent)', marginBottom: 18 }} />
          <Link to="/" style={{ color: 'rgba(212,175,55,0.35)', fontSize: 12, textDecoration: 'none', letterSpacing: '0.1em' }}>
            ← Back to Srimudra Events Home
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.12)', fontSize: 11, marginTop: 10 }}>
            © 2025 Srimudra Events &amp; Management, Hyderabad. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}
