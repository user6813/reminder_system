import { useEffect, useState } from 'react';
import { useStore } from '../context/storeProvider';
import { getReminders, addReminder, updateReminder, deleteReminder } from '../services/reminder';
import { toast } from 'react-toastify';

export default function Reminders() {
  const { user } = useStore();
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedReminder, setSelectedReminder] = useState<any>(null);
  const [form, setForm] = useState({ title: '', description: '', dateTime: '' });

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
    // eslint-disable-next-line
  }, []);

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
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <h2>Reminders</h2>
        <div style={{ fontSize: 16, color: '#555' }}>
          {user.username} ({user.email})
        </div>
      </header>
      <button style={{ marginBottom: 16 }} onClick={openAddModal}>Add New Reminder</button>
      {loading ? (
        <div>Loading reminders...</div>
      ) : reminders.length === 0 ? (
        <div>No reminders found.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {reminders.map(reminder => (
            <li key={reminder.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{reminder.title}</div>
                <div style={{ color: '#666' }}>{reminder.description}</div>
                <div style={{ fontSize: 13, color: '#888' }}>{new Date(reminder.dateTime).toLocaleString()}</div>
              </div>
              <div>
                <button onClick={() => openEditModal(reminder)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDelete(reminder.id)} style={{ color: 'red' }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleModalSubmit} style={{ background: '#fff', padding: 32, borderRadius: 10, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
            <h3 style={{ marginBottom: 16 }}>{modalMode === 'add' ? 'Add New Reminder' : 'Edit Reminder'}</h3>
            <label style={{ display: 'block', marginBottom: 10 }}>
              Title
              <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', marginBottom: 10 }}>
              Description
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', marginBottom: 16 }}>
              Date & Time
              <input type="datetime-local" value={form.dateTime} onChange={e => setForm(f => ({ ...f, dateTime: e.target.value }))} required style={{ width: '100%' }} />
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ marginRight: 12 }}>Cancel</button>
              <button type="submit">{modalMode === 'add' ? 'Add' : 'Update'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 