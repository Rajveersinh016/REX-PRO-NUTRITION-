import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { getInquiries, updateInquiryStatus } from '../../services/DataService';
import type { Inquiry } from '../../types';
import { useApp } from '../../context/AppContext';

export default function Messages() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const { showToast } = useApp();

  useEffect(() => {
    setInquiries(getInquiries());
  }, []);

  function handleMarkStatus(id: string, status: Inquiry['status']) {
    updateInquiryStatus(id, status);
    setInquiries(getInquiries());
    showToast('info', `Message status updated to ${status}`);
  }

  return (
    <div>
      <div className="flex-between mb-xl">
        <div>
          <div className="section-label">Customer Contact</div>
          <h1 className="heading-lg">CUSTOMER INQUIRIES ({inquiries.length})</h1>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Contact Details</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(inq => (
              <tr key={inq.id}>
                <td style={{ fontSize: 12, color: 'var(--gray-text)' }}>
                  {new Date(inq.createdAt).toLocaleDateString('en-IN')}
                </td>
                <td style={{ fontWeight: 600, color: 'var(--white)' }}>{inq.name}</td>
                <td>
                  <a href={`tel:${inq.phone}`} style={{ fontSize: 13, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Phone size={12} /> {inq.phone}
                  </a>
                  {inq.email && <div style={{ fontSize: 11, color: 'var(--gray-text)' }}>{inq.email}</div>}
                </td>
                <td style={{ fontSize: 13, maxWidth: 320 }}>{inq.message}</td>
                <td>
                  <span className={`status-badge status-${inq.status === 'replied' ? 'delivered' : inq.status === 'read' ? 'confirmed' : 'pending'}`}>
                    {inq.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(inq.name)}%2C%20thank%20you%20for%20contacting%20Rex-Pro%20Nutrition.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ padding: '4px 10px', fontSize: 11 }}
                    >
                      WhatsApp Reply
                    </a>
                    {inq.status === 'unread' && (
                      <button onClick={() => handleMarkStatus(inq.id, 'read')} className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }}>
                        Mark Read
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
