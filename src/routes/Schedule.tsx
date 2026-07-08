import { useState } from 'react';
import { DAYS, sessionsForDay, type DayId } from '@/content/2026';
import { appNow, liveSessions } from '@/lib/time';
import { SessionCard } from '@/components/SessionCard';

/** Pick the day that matches "now" if the event is running, else Day 1. */
function defaultDay(): DayId {
  const iso = appNow().toISOString().slice(0, 10);
  const match = DAYS.find((d) => d.id === iso);
  return match?.id ?? DAYS[0].id;
}

export function Schedule() {
  const now = appNow();
  const liveIds = new Set(liveSessions(now).map((s) => s.id));
  const [day, setDay] = useState<DayId>(defaultDay);
  const daySessions = sessionsForDay(day);

  return (
    <div>
      <header className="screen-header">
        <p className="eyebrow">Agenda</p>
        <h1>Schedule</h1>
      </header>

      {/* Day switcher */}
      <div className="day-tabs" role="tablist" aria-label="Choose a day">
        {DAYS.map((d) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={d.id === day}
            className={'day-tab' + (d.id === day ? ' day-tab-active' : '')}
            onClick={() => setDay(d.id)}
          >
            <span className="day-tab-short">{d.short}</span>
            <span className="day-tab-date">{d.label.split(', ')[1]}</span>
          </button>
        ))}
      </div>

      <div className="screen" style={{ paddingTop: 'var(--sp-md)' }}>
        <ul className="list-reset stack">
          {daySessions.map((s) => (
            <li key={s.id}>
              <SessionCard session={s} live={liveIds.has(s.id)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
