import { Link, useParams } from 'react-router-dom';
import { sessionsForSpeaker, speakerById } from '@/content/2026';
import { formatTimeRange } from '@/lib/time';
import { DetailHeader } from '@/components/DetailHeader';
import { SpeakerAvatar } from '@/components/SpeakerAvatar';
import { TypeTag } from '@/components/TypeTag';
import { Icon } from '@/components/Icon';
import { NotFound } from './NotFound';

export function SpeakerDetail() {
  const { id } = useParams();
  const speaker = id ? speakerById(id) : undefined;
  if (!speaker) return <NotFound />;

  const sessions = sessionsForSpeaker(speaker.id);

  return (
    <div>
      <DetailHeader />
      <div className="screen detail-screen">
        <div className="speaker-hero">
          <SpeakerAvatar speaker={speaker} size={96} />
          <h1 className="detail-title">{speaker.name}</h1>
          <p className="speaker-hero-role muted">{speaker.role}</p>
        </div>

        <p className="detail-desc">{speaker.bio}</p>

        {sessions.length > 0 && (
          <section>
            <div className="section-label">
              <h2>Sessions</h2>
            </div>
            <ul className="list-reset stack">
              {sessions.map((s) => (
                <li key={s.id}>
                  <Link to={`/session/${s.id}`} className="speaker-row card">
                    <div className="speaker-row-body">
                      <div className="speaker-session-tags">
                        <TypeTag type={s.type} />
                      </div>
                      <div className="speaker-row-name">{s.title}</div>
                      <div className="faint speaker-row-role">
                        {formatTimeRange(s.startTime, s.endTime)} · {s.location}
                      </div>
                    </div>
                    <Icon name="chevron" size={18} className="session-chevron" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
