import { useEffect, useState } from 'react';
import { useStore } from '../context/storeProvider';
import { getReminders, addReminder, updateReminder, deleteReminder } from '../services/reminder';
import { toast } from 'react-toastify';
import ReminderList from '../components/ReminderList';
import AddReminder from '../components/AddReminder';
import Button from '../components/Button';

export default function Reminders() {
  const { user } = useStore();
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedReminder, setSelectedReminder] = useState<any>(null);
  const [form, setForm] = useState({ title: '', description: '', dateTime: '' });
  const [timeTick, setTimeTick] = useState(Date.now());

  const token = localStorage.getItem('token');

  const fetchReminders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getReminders(token);
      setReminders(data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch reminders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
    const interval = setInterval(() => {
      setTimeTick(Date.now());
    }, 2 * 60 * 1000); // 2 minutes
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  // Split reminders into upcoming (within 30 min) and remaining, and filter out past reminders
  const now = new Date(timeTick);
  const halfHourLater = new Date(now.getTime() + 30 * 60000);
  const upcomingReminders = reminders.filter(r => {
    const dt = new Date(r.dateTime);
    return dt > now && dt <= halfHourLater;
  }).sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  const remainingReminders = reminders.filter(r => {
    const dt = new Date(r.dateTime);
    return dt > halfHourLater;
  }).sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  const openAddModal = () => {
    setModalMode('add');
    setForm({ title: '', description: '', dateTime: '' });
    setShowModal(true);
    setSelectedReminder(null);
  };

  const openEditModal = (reminder: any) => {
    setModalMode('edit');
    setForm({ title: reminder.title, description: reminder.description, dateTime: reminder.dateTime });
    setShowModal(true);
    setSelectedReminder(reminder);
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this reminder?')) return;
    try {
      await deleteReminder(token, id);
      toast.success('Reminder deleted');
      fetchReminders();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete reminder');
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    // Restrict past date/time
    const selectedDate = new Date(form.dateTime);
    const now = new Date();
    if (selectedDate < now) {
      toast.error('Cannot set a reminder in the past.');
      return;
    }
    try {
      if (modalMode === 'add') {
        await addReminder(token, { ...form, userId: user.id || 0 });
        toast.success('Reminder added');
      } else if (modalMode === 'edit' && selectedReminder) {
        await updateReminder(token, selectedReminder.id, form);
        toast.success('Reminder updated');
      }
      setShowModal(false);
      fetchReminders();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save reminder');
    }
  };

  return (
    <>
      <div className="poppins reminders-container">
        <div className="reminders-header-row">
          <h2 className="reminders-title">Reminders</h2>
          <Button className="reminders-add-btn" onClick={openAddModal}>
            + Add New Reminder
          </Button>
        </div>
        {loading ? (
          <div className="reminders-loading">Loading reminders...</div>
        ) : (
          <div className="reminders-sections">
            <div className="reminders-section-card">
              <h3 className="reminders-section-title reminders-upcoming-title">Upcoming Reminders</h3>
              <ReminderList reminders={upcomingReminders} now={now} onEdit={openEditModal} onDelete={handleDelete} />
            </div>
            <div className="reminders-section-card">
              <h3 className="reminders-section-title">List of Remaining Reminders</h3>
              <ReminderList reminders={remainingReminders} now={now} onEdit={openEditModal} onDelete={handleDelete} />
            </div>
          </div>
        )}
        {showModal && (
          <AddReminder
            show={showModal}
            modalMode={modalMode}
            form={form}
            setForm={setForm}
            onClose={() => setShowModal(false)}
            onSubmit={handleModalSubmit}
          />
        )}
      </div>
      <style>{`
        .reminders-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 32px 0;
        }
        .reminders-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }
        .reminders-title {
          margin: 0;
          font-weight: 700;
          color: #222;
          letter-spacing: 1px;
        }
        .reminders-add-btn {
          margin-bottom: 0;
          font-size: 16px;
          font-weight: 600;
          padding: 10px 28px;
          border-radius: 6px;
        }
        .reminders-loading {
          text-align: center;
          color: #888;
          font-size: 18px;
          margin-top: 60px;
        }
        .reminders-sections {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .reminders-section-card {
          flex: 1;
          min-width: 320px;
          background: #f6f8fa;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          padding: 24px;
          margin-bottom: 32px;
        }
        .reminders-section-title {
          margin-top: 0;
          color: #222;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .reminders-upcoming-title {
          color: #007bff;
        }
      `}</style>
    </>
  );
} 