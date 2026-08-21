import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getNotifications } from '../../services/DataService';

export default function AdminHeader() {
  const unreadCount = getNotifications().filter(n => !n.read).length;

  return (
    <header className="admin-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className="badge badge-gold">DEMO MODE</span>
        <span style={{ fontSize: 13, color: 'var(--gray-text)' }}>Rex-Pro Nutrition Kosamba</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link to="/admin/notifications" style={{ position: 'relative', color: 'var(--white-muted)' }} title="Notifications">
          <Bell size={20} />
          {unreadCount > 0 && <span className="nav-badge" style={{ top: -6, right: -6 }}>{unreadCount}</span>}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--white-muted)', paddingLeft: 12, borderLeft: '1px solid var(--gray-border)' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gold)', color: 'var(--black-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
            A
          </div>
          <span>admin@rexpro.demo</span>
        </div>
      </div>
    </header>
  );
}
