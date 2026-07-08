import { NavLink } from 'react-router-dom';
import { Icon, type IconName } from './Icon';
import { useAnnouncements } from '@/state/announcements';

const tabs: { to: string; label: string; icon: IconName }[] = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/schedule', label: 'Schedule', icon: 'calendar' },
  { to: '/info', label: 'Info', icon: 'info' },
];

export function TabBar() {
  const { unreadCount } = useAnnouncements();

  return (
    <nav className="tabbar" aria-label="Primary">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.to === '/'}
          className={({ isActive }) => 'tab' + (isActive ? ' tab-active' : '')}
        >
          <span className="tab-icon">
            <Icon name={t.icon} size={24} />
            {t.to === '/' && unreadCount > 0 && (
              <span className="tab-badge" aria-label={`${unreadCount} new`}>
                {unreadCount}
              </span>
            )}
          </span>
          <span className="tab-label">{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
