import React, { useEffect, useMemo, useState } from 'react';

// Целевая дата: 12 июня 2026, 20:00 МСК (UTC+3)
const TARGET_DATE_MS = new Date('2026-06-12T20:00:00+03:00').getTime();

function useCountdown() {
  // Храним чистую разницу (может быть отрицательной, если дата прошла)
  const [diff, setDiff] = useState(TARGET_DATE_MS - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDiff(TARGET_DATE_MS - Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return useMemo(() => {
    const expired = diff <= 0;
    // Используем Math.abs, чтобы считать время "после" так же, как и "до"
    const absTime = Math.abs(diff);

    const seconds = Math.floor((absTime / 1000) % 60);
    const minutes = Math.floor((absTime / (1000 * 60)) % 60);
    const hours = Math.floor((absTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(absTime / (1000 * 60 * 60 * 24));

    const pad = (num) => String(num).padStart(2, '0');

    return {
      days,
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
      expired // пригодится, если захочешь поменять текст или цвет
    };
  }, [diff]);
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
          <div className="obs-date">
            {countdown.expired ? 'Прошло с запуска:' : '12.06.26 20:00 МСК'}
          </div>
          <div className={`obs-timer ${countdown.expired ? 'timer-expired' : ''}`}>
            {countdown.days > 0 && (
              <>
                {/* Склонение слова "день" для красоты (опционально) */}
                <span>{countdown.days}д</span>
                <span className="space"> </span>
              </>
            )}
            <span>{countdown.hours}</span>
            <span className="colon">:</span>
            <span>{countdown.minutes}</span>
            <span className="colon">:</span>
            <span>{countdown.seconds}</span>
          </div>
          <div className="line-1">ССЫЛКА В ОПИСАНИИ</div>
        </div>
      </div>
    </div>
  );
}