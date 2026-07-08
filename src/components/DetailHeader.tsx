import { useNavigate } from 'react-router-dom';
import { Icon } from './Icon';

/** Sticky back bar for detail screens. */
export function DetailHeader({ title }: { title?: string }) {
  const navigate = useNavigate();
  return (
    <header className="detail-header">
      <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
        <Icon name="back" size={22} />
      </button>
      {title && <span className="detail-header-title">{title}</span>}
    </header>
  );
}
