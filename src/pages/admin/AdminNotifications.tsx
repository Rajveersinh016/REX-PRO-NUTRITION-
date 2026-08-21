import { useState, useEffect } from 'react';
import { Bell, Check, ShoppingBag, AlertTriangle, CreditCard, Star } from 'lucide-react';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../../services/DataService';
import type { Notification } from '../../types';
import { useApp } from '../../context/AppContext';

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { showToast } = useApp();

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  function handleMarkAllRead() {
    markAllNotificationsRead();
    setNotifications(getNotifications());
    showToast('info', 'All notifications marked as read');
  }

  function handleReadSingle(id: string) {
    markNotificationRead(id);
    setNotifications(getNotifications());
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order': return <ShoppingBag size={18} color="#5dade2" />;
      case 'stock': return <AlertTriangle size={18} color="var(--orange)" />;
      case 'payment': return <CreditCard size={18} color="var(--green)" />;
      case 'review': return <Star size={18} color="var(--gold)" />;
      default: return <Bell size={18} color="var(--white)" />;
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <div className="flex-between mb-xl">
        <div>
          <div className="section-label">Alert Center</div>
          <h1 className="heading-lg">NOTIFICATIONS ({notifications.filter(n => !n.read).length} UNREAD)</h1>
        </div>
        <button onClick={handleMarkAllRead} className="btn btn-ghost btn-sm">
          <Check size={16} /> Mark All as Read
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {notifications.map(n => (
          <div
            key={n.id}
            onClick={() => handleReadSingle(n.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              padding: 'var(--space-lg)',
              background: n.read ? 'var(--black-card)' : 'rgba(212, 175, 55, 0.06)',
              border: `1px solid ${n.read ? 'var(--gray-border)' : 'rgba(212, 175, 55, 0.3)'}`,
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
            }}
          >
            <div style={{ padding: 12, borderRadius: '50%', background: 'var(--charcoal)' }}>
              {getIcon(n.type)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontWeight: 600, color: n.read ? 'var(--white-muted)' : 'var(--gold)', fontSize: 15 }}>{n.title}</span>
                <span style={{ fontSize: 11, color: 'var(--gray-text)' }}>{new Date(n.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div style={{ fontSize: 14, color: 'var(--white)' }}>{n.message}</div>
            </div>
            {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
