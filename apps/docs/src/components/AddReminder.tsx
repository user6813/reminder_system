import React from 'react';
import Button from './Button';

interface AddReminderProps {
  show: boolean;
  modalMode: 'add' | 'edit';
  form: { title: string; description: string; dateTime: string };
  setForm: React.Dispatch<React.SetStateAction<{ title: string; description: string; dateTime: string }>>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const formatDateTimeLocal = (isoString: string) => {
  const date = new Date(isoString);
  // Get the local ISO string without timezone and seconds
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
};

export default function AddReminder({ show, modalMode, form, setForm, onClose, onSubmit }: AddReminderProps) {
  if (!show) return null;
  return (
    <>
      <div className="add-reminder-modal-bg">
        <form className="add-reminder-form" onSubmit={onSubmit}>
          <h3 className="add-reminder-title">
            {modalMode === 'add' ? 'Add New Reminder' : 'Edit Reminder'}
          </h3>
          <label className="add-reminder-label">
            Title
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
              className="add-reminder-input"
            />
          </label>
          <label className="add-reminder-label">
            Description
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              required
              className="add-reminder-textarea"
            />
          </label>
          <label className="add-reminder-label">
            Date & Time
            <input
              type="datetime-local"
              value={form.dateTime ? formatDateTimeLocal(form.dateTime) : form.dateTime}
              onChange={e => setForm(f => ({ ...f, dateTime: e.target.value }))}
              required
              className="add-reminder-input"
            />
          </label>
          <div className="add-reminder-actions">
            <Button type="button" style={{ background: '#888', fontWeight: 500 }} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" style={{ fontWeight: 600 }}>
              {modalMode === 'add' ? 'Add' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
      <style>{`
        .add-reminder-modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .add-reminder-form {
          background: #f6f8fa;
          padding: 36px;
          border-radius: 16px;
          min-width: 340px;
          max-width: 400px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
        }
        .add-reminder-title {
          margin-bottom: 20px;
          font-weight: 700;
          color: #222;
          font-size: 22px;
          letter-spacing: 0.5px;
        }
        .add-reminder-label {
          display: block;
          margin-bottom: 14px;
          font-weight: 500;
          color: #333;
        }
        .add-reminder-input {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          margin-top: 4px;
          font-size: 15px;
        }
        .add-reminder-textarea {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          margin-top: 4px;
          font-size: 15px;
          min-height: 60px;
          resize: vertical;
        }
        .add-reminder-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
      `}</style>
    </>
  );
}
