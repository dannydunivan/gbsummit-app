import { Link, useParams } from 'react-router-dom';
import { DAYS, sessionById, speakerById } from '@/content/2026';
import { formatTimeRange } from '@/lib/time';
import { DetailHeader } from '@/components/DetailHeader';
import { TypeTag } from '@/components/TypeTag';
import { SpeakerAvatar } from '@/components/SpeakerAvatar';
import { Icon } from '@/components/Icon';
import { NotFound } from './NotFound';

export function SessionDetail() {
  const { id } = useParams();
  const session = id ? sessionById(id) : undefined;
  if (!session) return <NotFound />;

  const day = DAYS.find((d) => d.id === session.day);
  const speakers = session.speakerIds.map(speakerById).filter(Boolean);

  return (
    <div>
      <DetailHeader />
      <div className="screen detail-screen">
        <TypeTag type={session.type} />
        <h1 className="detail-title">{session.title}</h1>

        <div className="detail-meta card card-pad stack">
          <div className="row">
            <Icon name="clock" size={18} className="detail-meta-icon" />
            <div>
              <div className="detail-meta-label faint">{day?.label}</div>
              <div>{formatTimeRange(session.startTime, session.endTime)}</div>
            </div>
          </div>
          <div className="row">
            <Icon name="location" size={18} className="detail-meta-icon" />
            <div>
              <div className="detail-meta-label faint">Location</div>
              <div>{session.location}</div>
            </div>
          </div>
        </div>

        <p className="detail-desc">{session.description}</p>

        {/* Business session → live packet */}
        {session.packetUrl && (
          <a className="btn btn-dark" href={session.packetUrl} target="_blank" rel="noreferrer">
            Open the business packet <Icon name="external" size={16} />
          </a>
        )}

        {/* Breakout block → full catalog */}
        {session.breakouts && (
          <Link className="btn btn-outline" to="/breakouts">
            Browse all breakouts <Icon name="chevron" size={16} />
          </Link>
        )}

        {/* Speakers */}
        {speakers.length > 0 && (
          <section>
            <div className="section-label">
              <h2>{speakers.length > 1 ? 'Speakers' : 'Speaker'}</h2>
            </div>
            <ul className="list-reset stack">
              {speakers.map(
                (sp) =>
                  sp && (
                    <li key={sp.id}>
                      <Link to={`/speaker/${sp.id}`} className="speaker-row card">
                        <SpeakerAvatar speaker={sp} size={52} />
                        <div className="speaker-row-body">
                          <div className="speaker-row-name">{sp.name}</div>
                          <div className="faint speaker-row-role">{sp.role}</div>
                        </div>
                        <Icon name="chevron" size={18} className="session-chevron" />
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
