import React from 'react';
import Button from './Button';

interface ReminderListProps {
  reminders: any[];
  now: Date;
  onEdit: (reminder: any) => void;
  onDelete: (id: number) => void;
}

export default function ReminderList({ reminders, now, onEdit, onDelete }: ReminderListProps) {
  if (reminders.length === 0) {
    return <div>No reminders found.</div>;
  }
  return (
    <>
      <ul className="reminder-list-ul">
        {reminders.map(reminder => (
          <li key={reminder.id} className="reminder-list-item">
            <div>
              <div className="reminder-list-title">{reminder.title}</div>
              <div className="reminder-list-desc">{reminder.description}</div>
              <div className="reminder-list-date">{new Date(reminder.dateTime).toLocaleString()}</div>
              <div className="reminder-list-timeleft">
                {Math.max(0, Math.round((new Date(reminder.dateTime).getTime() - now.getTime()) / 60000))} min left
              </div>
            </div>
            <div>
              <Button className="reminder-list-edit-btn" style={{ marginRight: 8 }} onClick={() => onEdit(reminder)}>Edit</Button>
              <Button className="reminder-list-delete-btn" style={{ background: '#dc3545' }} onClick={() => onDelete(reminder.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        .reminder-list-ul {
          list-style: none;
          padding: 0;
        }
        .reminder-list-item {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .reminder-list-title {
          font-weight: 600;
        }
        .reminder-list-desc {
          color: #666;
        }
        .reminder-list-date {
          font-size: 13px;
          color: #888;
        }
        .reminder-list-timeleft {
          font-size: 13px;
          color: #007bff;
        }
        .reminder-list-edit-btn {
          margin-right: 8px;
        }
        .reminder-list-delete-btn {
          background: #dc3545;
        }
      `}</style>
    </>
  );
}
