import React, { useState } from 'react';
import { Calendar, Users, MapPin, CheckCircle, Clock, Utensils } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SEED_COOKS } from '../data/seedData';

export const BookACook: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState('Birthday Party');
  const [selectedCuisine, setSelectedCuisine] = useState('South Indian Thali');
  const [guestCount, setGuestCount] = useState(25);
  const [eventDate, setEventDate] = useState('2025-09-15');
  const [eventTime, setEventTime] = useState('19:00');
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [selectedCookId, setSelectedCookId] = useState(SEED_COOKS[0].id);
  const [isBooked, setIsBooked] = useState(false);

  const selectedCook = SEED_COOKS.find((c) => c.id === selectedCookId) || SEED_COOKS[0];
  const totalDeposit = selectedCook.hireRatePerEvent;

  const handleCompleteBooking = () => {
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="fz-section">
        <div className="fz-container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <div className="fz-card" style={{ padding: '3rem 2rem', border: '2px solid var(--fz-green)' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--fz-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <CheckCircle size={40} color="var(--fz-green)" />
            </div>
            <h1 className="font-display" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
              BOOKING CONFIRMED!
            </h1>
            <p style={{ color: 'var(--fz-ink-muted)', marginBottom: '1.75rem' }}>
              Your private cook booking request has been successfully assigned to <strong>{selectedCook.name}</strong>.
            </p>

            <div style={{ backgroundColor: 'var(--fz-canvas-alt)', padding: '1.25rem', borderRadius: 'var(--fz-radius-md)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '2rem' }}>
              <div><strong>Event:</strong> {selectedEvent}</div>
              <div><strong>Cuisine:</strong> {selectedCuisine}</div>
              <div><strong>Guests:</strong> {guestCount} People</div>
              <div><strong>Date &amp; Time:</strong> {eventDate} at {eventTime}</div>
              <div><strong>Location:</strong> {location}</div>
              <div><strong>Master Cook:</strong> {selectedCook.name}</div>
              <div><strong>Booking Deposit:</strong> ₹{totalDeposit}</div>
            </div>

            <Button variant="primary" onClick={() => setIsBooked(false)}>
              Book Another Event
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fz-section">
      <div className="fz-container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--fz-yellow)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            PRIVATE COOK FOR HIRE
          </span>
          <h1 className="font-display" style={{ fontSize: '2.8rem', marginTop: '0.2rem' }}>
            BOOK A COOK FOR YOUR EVENT
          </h1>
          <p style={{ color: 'var(--fz-ink-muted)' }}>
            Hire verified heritage cooks to prepare fresh, live regional feasts in your home kitchen.
          </p>
        </div>

        {/* Step Progression Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
          {['1. Event Details', '2. Cook Selection', '3. Summary & Confirm'].map((stTitle, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0.75rem',
                backgroundColor: step === idx + 1 ? 'var(--fz-yellow)' : 'var(--fz-card-bg)',
                border: '1px solid var(--fz-border)',
                borderRadius: 'var(--fz-radius-md)',
                fontWeight: '800',
                fontSize: '0.85rem',
                margin: '0 4px',
                color: 'var(--fz-ink)'
              }}
            >
              {stTitle}
            </div>
          ))}
        </div>

        <div className="fz-card" style={{ padding: '2.5rem' }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: '800', display: 'block', marginBottom: '0.5rem' }}>
                  Select Event Type
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {['Birthday Party', 'House Party', 'Festival Feast', 'Corporate Function', 'Family Gathering'].map((evt) => (
                    <button
                      key={evt}
                      type="button"
                      onClick={() => setSelectedEvent(evt)}
                      style={{
                        padding: '0.85rem',
                        borderRadius: 'var(--fz-radius-md)',
                        border: selectedEvent === evt ? '2px solid var(--fz-yellow)' : '1px solid var(--fz-border)',
                        backgroundColor: selectedEvent === evt ? 'var(--fz-yellow-light)' : 'var(--fz-card-bg)',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {evt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: '800', display: 'block', marginBottom: '0.5rem' }}>
                  Select Preferred Cuisine
                </label>
                <Input
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  placeholder="e.g. South Indian Thali, Chettinad Feast, Punjabi Dhaba"
                  leftIcon={<Utensils size={16} />}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                  label="Guest Count"
                  type="number"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  leftIcon={<Users size={16} />}
                />
                <Input
                  label="Event Date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  leftIcon={<Calendar size={16} />}
                />
              </div>

              <Input
                label="Event Address / Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Full address with kitchen setup details"
                leftIcon={<MapPin size={16} />}
              />

              <Button variant="primary" fullWidth size="lg" onClick={() => setStep(2)}>
                Continue to Select Cook &rarr;
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>
                Select Your Verified Master Cook
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {SEED_COOKS.map((cook) => (
                  <div
                    key={cook.id}
                    onClick={() => setSelectedCookId(cook.id)}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--fz-radius-md)',
                      border: selectedCookId === cook.id ? '2px solid var(--fz-yellow)' : '1px solid var(--fz-border)',
                      backgroundColor: selectedCookId === cook.id ? 'var(--fz-yellow-light)' : 'var(--fz-card-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={cook.avatar}
                      alt={cook.name}
                      style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{cook.name}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--fz-ink-muted)' }}>{cook.title} &bull; {cook.yearsExperience} yrs exp</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--fz-ink)', marginTop: '0.2rem' }}>
                        Rate: ₹{cook.hireRatePerEvent} / event
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button variant="secondary" onClick={() => setStep(1)}>
                  &larr; Back
                </Button>
                <Button variant="primary" fullWidth onClick={() => setStep(3)}>
                  Review Booking Summary &rarr;
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.25rem' }}>
                Review &amp; Confirm Booking
              </h3>
              <div style={{ backgroundColor: 'var(--fz-canvas-alt)', padding: '1.5rem', borderRadius: 'var(--fz-radius-md)', marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--fz-ink-muted)' }}>Event Type</span>
                  <span style={{ fontWeight: '800' }}>{selectedEvent}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--fz-ink-muted)' }}>Cuisine</span>
                  <span style={{ fontWeight: '800' }}>{selectedCuisine}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--fz-ink-muted)' }}>Guests</span>
                  <span style={{ fontWeight: '800' }}>{guestCount} People</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--fz-ink-muted)' }}>Date &amp; Time</span>
                  <span style={{ fontWeight: '800' }}>{eventDate} at {eventTime}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--fz-ink-muted)' }}>Selected Cook</span>
                  <span style={{ fontWeight: '800' }}>{selectedCook.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--fz-border)', paddingTop: '0.75rem', fontSize: '1.1rem', fontWeight: '900' }}>
                  <span>Total Deposit</span>
                  <span style={{ color: 'var(--fz-ink)' }}>₹{totalDeposit}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button variant="secondary" onClick={() => setStep(2)}>
                  &larr; Back
                </Button>
                <Button variant="primary" fullWidth size="lg" onClick={handleCompleteBooking}>
                  Confirm &amp; Pay Booking Deposit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
