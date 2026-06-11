import React, { useEffect, useMemo, useState } from 'react';

// Целевая дата: 12 июня 2026, 20:00 МСК (UTC+3)
const TARGET_DATE_MS = new Date('2026-06-12T20:00:00+03:00').getTime();

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(TARGET_DATE_MS - Date.now());

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      const remaining = TARGET_DATE_MS - Date.now();
      setTimeLeft(remaining <= 0 ? 0 : remaining);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return useMemo(() => {
    if (timeLeft <= 0) {
      return { days: 0, hours: '00', minutes: '00', seconds: '00', expired: true };
    }

    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

    const pad = (num) => String(num).padStart(2, '0');

    return {
      days,
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
      expired: false
    };
  }, [timeLeft]);
}

export default function App() {
  const countdown = useCountdown();

  return (
    <div className="obs-screen-wrapper">
      {/* Фоновые слои из твоей дизайн-системы */}
      <div className="hero-bg hero-bg--back" />
      <div className="hero-bg hero-bg--figure" />
      <div className="hero-vignette" />
      <div className="hero-grain" />

      {/* Контент, зафиксированный строго по центру */}
      <div className="obs-center-container">
        <h1 className="obs-title-garamond">
          <div className="line-1">NOT FOR ALL</div>
          <div className="line-2">LEAGUE</div>
        </h1>

        <div className="obs-meta-garamond">
          <div className="obs-date">12.06.26 20:00 МСК</div>
          <div className="obs-timer">
            {countdown.days > 0 && (
              <>
                <span>{countdown.days}день</span>
                <span className="space"> </span>
              </>
            )}
            <span>{countdown.hours}</span>
            <span className="colon">:</span>
            <span>{countdown.minutes}</span>
            <span className="colon">:</span>
            <span>{countdown.seconds}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
