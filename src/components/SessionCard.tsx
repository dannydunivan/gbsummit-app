import { Link } from 'react-router-dom';
import type { Session } from '@/content/2026';
import { formatTimeRange } from '@/lib/time';
import { TypeTag } from './TypeTag';
import { Icon } from './Icon';

/**
 * Schedule row. `live` badges an in-progress session.
 */
export function SessionCard({ session, live = false }: { session: Session; live?: boolean }) {
  return (
    <Link to={`/session/${session.id}`} className="session-card card">
      <div className="session-time">
        <span className="session-time-start">{formatTimeRange(session.startTime, session.endTime).split(' – ')[0]}</span>
        {live && <span className="live-dot" aria-label="Happening now" />}
      </div>
      <div className="session-body">
        <div className="session-tags">
          <TypeTag type={session.type} />
          {live && <span className="tag tag-live">Now</span>}
        </div>
        <h3 className="session-title">{session.title}</h3>
        <div className="session-meta faint">
          <span>{formatTimeRange(session.startTime, session.endTime)}</span>
          <span className="dot-sep">·</span>
          <span>{session.location}</span>
        </div>
      </div>
      <Icon name="chevron" size={18} className="session-chevron" />
    </Link>
  );
}
